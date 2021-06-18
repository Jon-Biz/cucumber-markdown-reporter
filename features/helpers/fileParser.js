const fs = require('fs')
const readline = require('readline');

async function processLineByLine(filePath) {
    const fileStream = fs.createReadStream(filePath + '/README.md');
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let output = []
    for await (const line of rl) {
        output.push(line)
    }

    return output
}

module.exports = processLineByLine