const assert = require('chai').assert;
const Gluwa = require('../shared');
const assertion = require('../assertionHelpers');

describe("Tests for getting transaction history by hash", function() {

    // expected error code
    const invalidUrlParametersErrorCode = "InvalidUrlParameters";
    const badRequestErrorCode = "BadRequest";
    const notFoundErrorCode = "NotFound";

    const optionals = {
        Limit: '',
        Offset: '',
        Status: 'Confirmed'
    }

    var testname;
    var currency;

    beforeEach(function () {
        testname = this.currentTest.title;
        currency = Gluwa.getCurrencyFromTestName(testname);
    });


    describe("Positive Test cases.", function() {

        it("Get_TransactionsHash_sUSDCG_Pos", function() {
            return Gluwa.getTransactionHistory(currency,optionals)
            .then((result) => {
                const transcation = result.data[0];
                const hash = transcation.TxnHash;
                assertion.handleAssertionStatusCode(result, testname, 200);
                return Gluwa.getTransactionDetail(currency, hash);
            }).then((result) => {
                assertion.handleAssertionStatusCode(result, testname, 200);
            }).catch((error) => {
                assertion.handleUnexpectedErrorMsg(error, testname);
                assert.fail(error);
            });
    });

        // Todo: undo the comment after sKRWCG is supported
        // it("Get_TransactionsHash_sKRWCG_Pos", function() {
        //     return Gluwa.getTransactionHistory(currency,optionals)
        //         .then((result) => {
        //             const transcation = result.data[0];
        //             const hash = transcation.TxnHash;
        //             assertion.handleAssertionStatusCode(result, testname, 200);
        //             return Gluwa.getTransactionDetail(currency, hash);
        //         }).then((result) => {
        //             assertion.handleAssertionStatusCode(result, testname, 200);
        //         }).catch((error) => {
        //             assertion.handleUnexpectedErrorMsg(error, testname);
        //             assert.fail(error);
        //         });
        // });

        it("Get_TransactionsHash_NGNG_Pos", function() {
            return Gluwa.getTransactionHistory(currency,optionals)
                .then((result) => {
                    const transcation = result.data[0];
                    const hash = transcation.TxnHash;
                    assertion.handleAssertionStatusCode(result, testname, 200);
                    return Gluwa.getTransactionDetail(currency, hash);
                }).then((result) => {
                    assertion.handleAssertionStatusCode(result, testname, 200);
                }).catch((error) => {
                    assertion.handleUnexpectedErrorMsg(error, testname);
                    assert.fail(error);
                });
        });

        it("Get_TransactionsHash_sNGNG_Pos", function() {
            return Gluwa.getTransactionHistory(currency,optionals)
                .then((result) => {
                    const transcation = result.data[0];
                    const hash = transcation.TxnHash;
                    assertion.handleAssertionStatusCode(result, testname, 200);
                    return Gluwa.getTransactionDetail(currency, hash);
                }).then((result) => {
                    assertion.handleAssertionStatusCode(result, testname, 200);
                }).catch((error) => {
                    assertion.handleUnexpectedErrorMsg(error, testname);
                    assert.fail(error);
                });
        });
    });

    describe("Negative Test cases.", function() {

        it("Get_TransactionHash_InvalidCurrency_Neg", function() {
            return Gluwa.getTransactionHistory("sUSDCG",optionals)
                .then((result) => {
                    const transcation = result.data[0];
                    const hash = transcation.TxnHash;
                    assertion.handleAssertionStatusCode(result, testname, 200);
                    return Gluwa.getTransactionDetail("foobar", hash);
                }).then((result) => {
                    assert.fail("Shouldn't return result.");
                }).catch((error) => {
                    assertion.handleAssertionStatusCode(error.response, testname, 400);
                    assertion.handleNegativeTestError(error, testname, invalidUrlParametersErrorCode);
                });
        });

        it("Get_TransactionHash_InvalidHash_Neg", function() {
            return Gluwa.getTransactionDetail("sUSDCG", "111")
                .then((result) => {
                    assert.fail("Shouldn't return result.");
                }).catch((error) => {
                    assertion.handleAssertionStatusCode(error.response, testname, 400);
                    assertion.handleNegativeTestError(error, testname, badRequestErrorCode);
                });
        });

        // TODO: Re-enable after https://gluwa.atlassian.net/browse/GLA-555 is fixed

        // it("Get_TransactionHash_BTC_NotFound_Neg", function() {
        //     return Gluwa.getTransactionHistory("USDG",optionals)
        //         .then((result) => {
        //             const transcation = result.data[0];
        //             const hash = transcation.TxnHash;
        //             assertion.handleAssertionStatusCode(result, testname, 200);
        //             return Gluwa.getTransactionDetail(currency, hash);
        //         }).then((result) => {
        //             assert.fail("Shouldn't return result.");
        //         }).catch((error) => {
        //             assertion.handleAssertionStatusCode(error.response, testname, 404);
        //             assertion.handleNegativeTestError(error, testname, notFoundErrorCode);
        //         });
        // });
    });

});