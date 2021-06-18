const fs = require('fs')
const readline = require('readline');
const path = require('path')
const { program } = require('commander');

function formatOutput(output) {
    return output
}

async function generator(folderPath) {

    function processCommentedStep(featureLine) {
        const output = featureLine.split('# ')[1].trimStart()

        return (
            `*[ ] ${output}`
        )
    }

    function processStep(featureLine) {

        return (
            `*[x] ${featureLine}`
        )
    }

    function processScenario(featureLine) {
        const output = featureLine.split('Scenario:')[1].trimStart()

        return (
            `# ${output}

            `
        )
    }

    function processCommentedScenario(featureLine) {
        const output = featureLine.split('# Scenario:')[1].trimStart()

        return (
            `## TO DO: ${output}`
        )
    }


    function processFeature(featureLine) {
        const output = featureLine.split('Feature:')[1].trimStart()

        return (
            `# ${output}

            `
        )
    }

    function processCommentedFeature(featureLine) {
        const output = featureLine.split('Feature:')[1].trimStart()

        return (
            `# TO DO: ${output}

            `
        )
    }

    function processLine(line) {
        if (line.startsWith('Feature:')) return processFeature(line)
        if (line.startsWith('# Feature:')) return processCommentedFeature(line)

        if (line.startsWith('Scenario:')) return processScenario(line)
        if (line.startsWith('# Scenario:')) return processCommentedScenario(line)

        if (line.startsWith('Given ')) return processStep(line)
        if (line.startsWith('When ')) return processStep(line)
        if (line.startsWith('Then ')) return processStep(line)
        if (line.startsWith('#')) return processCommentedStep(line)

        return line
    }
    
    async function processLineByLine(filePath) {
        const fileStream = fs.createReadStream(filePath);
      
        const rl = readline.createInterface({
          input: fileStream,
          crlfDelay: Infinity
        });

        let output = []
        for await (const line of rl) {
            const processedLine = processLine(line)
            output.push(processedLine)
        }

        return output
    }
          
    async function processFile(fileName) {
        if (!fileName.endsWith('.feature')) return []

        const filePath = path.join(folderPath, fileName)
        return await processLineByLine(filePath);
    }
    
    async function processFolder(fileList) {
        return await Promise.all(fileList.map(
            async filePath => await processFile(filePath)
        ))
    }
    
    try {
        fileList = fs.readdirSync(folderPath)
        const output = await processFolder(fileList)
        const formattedOutput = formatOutput(output)
        console.log(formattedOutput)

    }
    catch (err) {
        console.error(err)
    }

    fs.writeFileSync('README.md', '')
}

module.exports = generator