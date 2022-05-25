const assert = require('chai').assert;
const Gluwa = require('../shared');
const assertion = require('../assertionHelpers');

describe("Tests for retrieving balance for an address.", function () {

    var testname;
    var currency;

    beforeEach(function () {
        testname = this.currentTest.title;
        currency = Gluwa.getCurrencyFromTestName(testname);
    });

    describe("Positive Test cases.", function() {

        it("Get_AddressBalance_sUSDCG_Pos",function () {
            return Gluwa.getBalance(currency)
                .then((result) => {
                    assertion.handleAssertionStatusCode(result, testname, 200);
                }).catch((error) => {
                    assertion.handleUnexpectedErrorMsg(error, testname);
                    assert.fail(error);
                });
        });

        // Todo: undo the comment after sKRWCG is supported
        // it("Get_AddressBalance_sKRWCG_Pos",function () {
        //     return Gluwa.getBalance(currency)
        //         .then((result) => {
        //             assertion.handleAssertionStatusCode(result, testname, 200);
        //         }).catch((error) => {
        //             assertion.handleUnexpectedErrorMsg(error, testname);
        //             assert.fail(error);
        //         });
        // });
    
        it("Get_AddressBalance_NGNG_Pos",function () {
            return Gluwa.getBalance(currency)
                .then((result) => {
                    assertion.handleAssertionStatusCode(result, testname, 200);
                }).catch((error) => {
                    assertion.handleUnexpectedErrorMsg(error, testname);
                    assert.fail(error);
                });
        });
    
        it("Get_AddressBalance_sNGNG_Pos",function () {
            return Gluwa.getBalance(currency)
                .then((result) => {
                    assertion.handleAssertionStatusCode(result, testname, 200);
                }).catch((error) => {
                    assertion.handleUnexpectedErrorMsg(error, testname);
                    assert.fail(error);
                });
        });
    });

    describe("Negative Test cases.", function() {

        it("Get_AddressBalance_InvalidCurrency_Neg", function() {
            return Gluwa.getBalance(currency)
                .then((result) => {
                    assert.fail("Shouldn't return result.");
                }).catch((error) => {
                    assertion.handleAssertionStatusCode(error.response, testname, 400);
                });
        });

        it("Get_AddressBalance_BTC_AddressMismatch_Neg", function() {
            return Gluwa.getBalance(currency)
                .then((result) => {
                    assert.fail("Shouldn't return result.");
                }).catch((error) => {
                    assertion.handleAssertionStatusCode(error.response, testname, 400);
                });
        });
    });
});