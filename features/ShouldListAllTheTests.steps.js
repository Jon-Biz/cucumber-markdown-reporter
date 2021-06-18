const generator = require('../src/generator.js')
const fs = require('fs')

const { defineFeature, loadFeature } = require('jest-cucumber');
const feature = loadFeature('./features/ShouldListAllTheTests.feature');


defineFeature(feature, test => {
    test('Running the reporter', ({ given, when, then }) => {
        let testFileLocation
        given('A set of features and step files', () => {
            testFileLocation = './features'
        });

        let data
        when('The reporter is run', () => {
            try {
                const data = fs.readFileSync('README.md')
            }
            catch(err) {
                expect(err).toBeDefined
            }

            generator(testFileLocation)
            data = fs.readFileSync('README.md')
        });

        then('it should produce a text file', () => {
            expect(data).toBeDefined()
        });
    });
})