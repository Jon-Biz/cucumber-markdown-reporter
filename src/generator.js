const fs = require('fs')
const { program } = require('commander');


function generator(fileName) {
    fs.readFileSync(fileName+ '/ShouldListAllTheTests.feature')

    fs.writeFileSync('README.md', '')
}
module.exports = generator