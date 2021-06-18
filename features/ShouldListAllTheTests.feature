Feature: Generating a report

# Scenario: Running the reporter but the test suite location cannot be location or is not provided
# Given A reporter is run and can't find the test suite or it is not provided
# Then it should return an apropriate error

Scenario: Running the reporter
Given A set of features and step files
When The reporter is run
Then it should produce a text file

# Scenario: Getting information from the reporter
# Given A set of features and steps
# When The reporter is run
# Then The output should list all the features in the test suites
# Then the output should list the features as markdown headings
# Then the output should list all commented out features with empty checkboxes
# Then the output should list all commented out features with empty checkboxes
# Then the output should list all the scenarios in the test suites
# Then the output should list the features as markdown bullet points
# Then the output should list all commented out scenarious with empty checkboxes
