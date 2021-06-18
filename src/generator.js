const fs = require('fs')
const readline = require('readline');
const path = require('path')
const { program } = require('commander');

function formatOutput(output) {
    const text = output.map(scenarioArr => scenarioArr.join('')).join('')
    return text
}

async function generator(folderPath) {

    function processScenario(featureLine) {
        const output = featureLine.split('Scenario:')[1].trimStart()

        return (
            `*[ ] ${output}
`
        )
    }

    function processCommentedScenario(featureLine) {
        const output = featureLine.split('# Scenario:')[1].trimStart()

        return (
            `*[X] ${output}
`
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

        return false
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

        return output.filter(item => typeof item === 'string')
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
    
    let formattedOutput
    try {
        fileList = fs.readdirSync(folderPath)
        const output = await processFolder(fileList)
        formattedOutput = formatOutput(output)

    }
    catch (err) {
        console.error(err)
    }

    fs.writeFileSync( folderPath + '/README.md', formattedOutput)
}

module.exports = generator