How to run tests

Under Gluwa-JS.Mocha folder
- To run all tests, simply use 'npm test' command
- To run all tests inside a specific test file, use 'npm test <path>' command 
    - Ex. npm test test/BalanceTests.js
- To run single test/testsuite, simple add "only" after it/describe
    - Ex. it.only("Testname", function () {...});
    - Ex. describe.only("Testsuite name", function () {...});