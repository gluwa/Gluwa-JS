# How to run tests locally

## Setup

1. Create an .env file with the required environment variables (This is done automatically in CI). Use the same file structure as `.env-sample`.
2. Install the NPM package built from source into the tests by doing the following steps:
- From Gluwa-JS, run the following commands
  1. `yarn install`
  2. `npm run build`
  3. `npm pack`
- From Gluwa-JS/tests, run the following command
  1. `npm install ../gluwa-gluwa-js-$(node -p "require('../package.json').version").tgz`

---

## Running Tests

From `Gluwa-JS/tests`
- To run all tests, simply use `npm test` command
- To run all tests inside a specific test file, use `npm test <path>` command 
    - Ex. `npm test test/BalanceTests.js`
- To run single test/testsuite, simple add "only" after it/describe
    - Ex. `it.only("Testname", function () {...});`
    - Ex. `describe.only("Testsuite name", function () {...});`