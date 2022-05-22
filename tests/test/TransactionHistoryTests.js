const assert = require('chai').assert;
const Gluwa = require('../shared');
const assertion = require('../assertionHelpers');

describe("Tests for listing transaction history for an address.", function () {

    // expected error code
    const invalidSignatureErrorCode = "InvalidSignature";
    const invalidUrlParametersErrorCode = "InvalidUrlParameters";

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

    describe("Positive Test cases without limit.", function () {

        it("Get_AddressTransactions_sUSDCG_Pos", function() {
            return Gluwa.getTransactionHistory(currency,optionals)
                .then((result) => {
                    assertion.handleAssertionStatusCode(result, testname, 200);
                }).catch((error) => {
                    assertion.handleUnexpectedErrorMsg(error, testname);
                    assert.fail(error);
                });
        });

        // Todo: undo the comment after sKRWCG is supported
        // it("Get_AddressTransactions_sKRWCG_Pos", function() {
        //     return Gluwa.getTransactionHistory(currency,optionals)
        //         .then((result) => {
        //             assertion.handleAssertionStatusCode(result, testname, 200);
        //         }).catch((error) => {
        //             assertion.handleUnexpectedErrorMsg(error, testname);
        //             assert.fail(error);
        //         });
        // });

        it("Get_AddressTransactions_NGNG_Pos", function() {
            return Gluwa.getTransactionHistory(currency,optionals)
                .then((result) => {
                    assertion.handleAssertionStatusCode(result, testname, 200);
                }).catch((error) => {
                    assertion.handleUnexpectedErrorMsg(error, testname);
                    assert.fail(error);
                });
        });

        it("Get_AddressTransactions_sNGNG_Pos", function() {
            return Gluwa.getTransactionHistory(currency,optionals)
                .then((result) => {
                    assertion.handleAssertionStatusCode(result, testname, 200);
                }).catch((error) => {
                    assertion.handleUnexpectedErrorMsg(error, testname);
                    assert.fail(error);
                });
        });
    });

    describe("Positive Test cases with limit.", function () {

        it("Get_AddressTransactions_sUSDCG_Limit1_Pos", function() {
            optionals.Limit = "1";
            return Gluwa.getTransactionHistory(currency,optionals)
                .then((result) => {
                    assertion.handleAssertionStatusCode(result, testname, 200);
                }).catch((error) => {
                    assertion.handleUnexpectedErrorMsg(error, testname);
                    assert.fail(error);
                });
        });

        it("Get_AddressTransactions_sUSDCG_Limit99_Pos", function() {
            optionals.Limit = "99";
            return Gluwa.getTransactionHistory(currency,optionals)
                .then((result) => {
                    assertion.handleAssertionStatusCode(result, testname, 200);
                }).catch((error) => {
                    assertion.handleUnexpectedErrorMsg(error, testname);
                    assert.fail(error);
                });
        });

        it("Get_AddressTransactions_sUSDCG_Limit101_Pos", function() {
            optionals.Limit = "101";
            return Gluwa.getTransactionHistory(currency,optionals)
                .then((result) => {
                    assert.equal(result.data.length, 100);
                    assertion.handleAssertionStatusCode(result, testname, 200);
                }).catch((error) => {
                    assertion.handleUnexpectedErrorMsg(error, testname);
                    assert.fail(error);
                });
        });

        it("Get_AddressTransactions_sUSDCG_DecimalLimit_Pos", function() {
            optionals.Limit = "1.1";
            return Gluwa.getTransactionHistory(currency,optionals)
                .then((result) => {
                    assert.equal(result.data.length, 1);
                    assertion.handleAssertionStatusCode(result, testname, 200);
                }).catch((error) => {
                    assertion.handleUnexpectedErrorMsg(error, testname);
                    assert.fail(error);
                });
        });
    });

    describe("Negative Test cases.", function() {

        it("Get_AddressTransactions_BTC_AddressMismatch_Neg", function() {
            return Gluwa.getTransactionHistory(currency, optionals)
                .then((result) => {
                    assert.fail("Shouldn't return result.");
                }).catch((error) => {
                    assertion.handleAssertionStatusCode(error.response, testname, 403);
                    assertion.handleNegativeTestError(error, testname, invalidSignatureErrorCode);
                });
        });

        it("Get_AddressTransactions_InvalidCurrency_Neg", function() {
            return Gluwa.getTransactionHistory(currency, optionals)
            .then((result) => {
                assert.fail("Shouldn't return result.");
            }).catch((error) => {
                assertion.handleAssertionStatusCode(error.response, testname, 400);
                assertion.handleNegativeTestError(error, testname, invalidUrlParametersErrorCode);
            });
        });

        it("Get_AddressTransactions_USDG_NegativeLimit_Neg", function() {
            optionals.Limit = "-1";
            return Gluwa.getTransactionHistory(currency, optionals)
                .then((result) => {
                    assert.fail("Shouldn't return result.");
                }).catch((error) => {
                    assertion.handleAssertionStatusCode(error.response, testname, 400);
                    assertion.handleNegativeTestError(error, testname, invalidUrlParametersErrorCode);
                });
        });

        it("Get_AddressTransactions_USDG_CharacterLimit_Neg", function() {
            optionals.Limit = "a";
            return Gluwa.getTransactionHistory(currency, optionals)
                .then((result) => {
                    assert.fail("Shouldn't return result.");
                }).catch((error) => {
                    assertion.handleAssertionStatusCode(error.response, testname, 400);
                    assertion.handleNegativeTestError(error, testname, invalidUrlParametersErrorCode);
                });
        });
    });

});