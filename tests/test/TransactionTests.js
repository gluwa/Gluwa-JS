const assert = require('chai').assert;
const Gluwa = require('../shared');
const assertion = require('../assertionHelpers');
require ('dotenv').config();

describe("Tests for creating a new transaction.", function () {

    // expected error code
    const validationErrorCode = "ValidationError";
    const invalidAmountErrorCode = "InvalidAmount";

    var targetAddress;
    var testname;
    var currency;
    var amount;

    before(function() {
        if(Gluwa.isSandbox) {
            targetAddress = process.env.TARGETADDRESS_SANDBOX;
        } else {
            targetAddress = process.env.TARGETADDRESS_PRODUCTION;
        }
    })

    beforeEach(function () {
        testname = this.currentTest.title;
        currency = Gluwa.getCurrencyFromTestName(testname);
        amount = Gluwa.getAmount(currency, "TransactionTests");

    });

    describe("Positive Test cases.", function() {

        it("Post_Transactions_sUSDCG_Pos", function () {
            return Gluwa.createTransaction(currency, amount, targetAddress)
                .then((result) => {
                    assertion.handleAssertionStatusCode(result, testname, 202);
                }).catch((error) => {
                    assertion.handleUnexpectedErrorMsg(error, testname);
                    assert.fail(error);
                });
        });

        // Todo: undo the comment after sKRWCG is supported
        // it("Post_Transactions_sKRWCG_Pos", function () {
        //     return Gluwa.createTransaction(currency, amount, targetAddress)
        //         .then((result) => {
        //             assertion.handleAssertionStatusCode(result, testname, 202);
        //         }).catch((error) => {
        //             assertion.handleUnexpectedErrorMsg(error, testname);
        //             assert.fail(error);
        //         });
        // });

        // Todo: undo the comment after NGNG is supported
        // it.only("Post_Transactions_NGNG_Pos", function () {
        //     return Gluwa.createTransaction(currency, amount, targetAddress)
        //         .then((result) => {
        //             console.log(result);
        //             assertion.handleAssertionStatusCode(result, testname, 202);
        //         }).catch((error) => {
        //             assertion.handleUnexpectedErrorMsg(error, testname);
        //             assert.fail(error);
        //         });
        // });

        it("Post_Transactions_sNGNG_Pos", function () {
            return Gluwa.createTransaction(currency, amount, targetAddress)
                .then((result) => {
                    assertion.handleAssertionStatusCode(result, testname, 202);
                }).catch((error) => {
                    assertion.handleUnexpectedErrorMsg(error, testname);
                    assert.fail(error);
                });
        });
    });


    describe("Negative Test cases (Invalid Amount).", function() {

        it("Post_Transactions_sUSDCG_InvalidAmount_Neg", function() {
            return Gluwa.createTransaction(currency, "0", targetAddress)
                .then((result) => {
                    console.log(result);
                    assert.fail("Shouldn't return result.");
                }).catch((error) => {
                    assertion.handleAssertionStatusCode(error.response, testname, 400);
                    assertion.handleNegativeTestError(error, testname, validationErrorCode, invalidAmountErrorCode);
                });
        });

        // Todo: undo the comment after NGNG and sKRWCG is supported
        // it("Post_Transactions_sKRWCG_InvalidAmount_Neg", function() {
        //     return Gluwa.createTransaction(currency, "0", targetAddress)
        //         .then((result) => {
        //             assert.fail("Shouldn't return result.");
        //         }).catch((error) => {
        //             assertion.handleAssertionStatusCode(error.response, testname, 400);
        //             assertion.handleNegativeTestError(error, testname, validationErrorCode, invalidAmountErrorCode);
        //         });
        // });

        // it("Post_Transactions_NGNG_InvalidAmount_Neg", function() {
        //     return Gluwa.createTransaction(currency, "0", targetAddress)
        //         .then((result) => {
        //             console.log(result);
        //             assert.fail("Shouldn't return result.");
        //         }).catch((error) => {
        //             assertion.handleAssertionStatusCode(error.response, testname, 400);
        //             assertion.handleNegativeTestError(error, testname, validationErrorCode, invalidAmountErrorCode);
        //         });
        // });

        it("Post_Transactions_sNGNG_InvalidAmount_Neg", function() {
            return Gluwa.createTransaction(currency, "0", targetAddress)
                .then((result) => {
                    assert.fail("Shouldn't return result.");
                }).catch((error) => {
                    assertion.handleAssertionStatusCode(error.response, testname, 400);
                    assertion.handleNegativeTestError(error, testname, validationErrorCode, invalidAmountErrorCode);
                });
        });

    });


    describe("Negative Test cases (Others).", function() {

        it("Post_Transactions_InvalidCurrency_Neg", function() {
            return Gluwa.createTransaction(currency, "1", targetAddress)
                .then((result) => {
                    const errorMsg = result.message;
                    assert.isTrue(result instanceof Error);
                    assert.isTrue(errorMsg.includes("Failed to get fee"));
                    assert.isTrue(errorMsg.includes("400"));
                }).catch((error) => {
                    assertion.handleUnexpectedErrorMsg(error, testname);
                    assert.fail(error);
                });
        })

        it("Post_Transactions_MissingCurrency_Neg", function() {
            return Gluwa.createTransaction("", "1", targetAddress)
                .then((result) => {
                    const errorMsg = result.message;
                    assert.isTrue(result instanceof Error);
                    assert.isTrue(errorMsg.includes("Failed to get fee"));
                    assert.isTrue(errorMsg.includes("404"));
                }).catch((error) => {
                    assertion.handleUnexpectedErrorMsg(error, testname);
                    assert.fail(error);
                });
        })
    });
});