const generator = require('../src/generator.js')
const fs = require('fs')

const fileParser = require('./helpers/fileParser')
const { defineFeature, loadFeature } = require('jest-cucumber')
const feature = loadFeature('./features/ShouldListAllTheTests.feature')

defineFeature(feature, test => {
    test('Running the reporter', ({ given, when, then }) => {
        let testFileLocation
        given('A set of features and step files', () => {
            testFileLocation = './features'
        })

        let data
        when('The reporter is run', async () => {
            await generator(testFileLocation)
        })

        then('it should save a file as the README.md of the test suite', () => {
            let resultFile
            try {
                resultFile = fs.readFileSync(testFileLocation + 'README.md')
            }
            catch (err) {
                expect(err).not.toBeDefined()
            }

            const fileArray = fileParser(testFileLocation)
        })
    })

    test('Getting information from the reporter', ({ given, when, then }) => {
        let testFileLocation
        given('A set of features and steps', () => {
            testFileLocation = './features'
        })

        let data
        when('The reporter is run', async () => {
            await generator(testFileLocation)
        })

        then('The output should list all the features in the test suites', async () => {
            const fileArray = await fileParser(testFileLocation)
            console.log(fileArray)
            expect(fileArray[0]).toEqual('# Generating a report')
        });
    });
})