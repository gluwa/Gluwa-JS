const assert = require('chai').assert;
const Gluwa = require('../shared');
const assertion = require('../assertionHelpers');

describe("Tests for creating a payment QR Code.", function () {

    // expected error code
    const validationErrorCode = "ValidationError";
    const invalidBodyErrorCode = "InvalidBody";
    const invalidValueErrorCode = "InvalidValue";

    // expected error msg
    const longOrderIDErrorMsg = "The field MerchantOrderID must be a string with a maximum length of 60.";
    
    const amountLessThanFee = "0.0000001";

    const optionals = {
        Note: '',
        MerchantOrderID: '012345678901234567890123456789012345678901234567890123456789',
        Expiry: '86400'
    }

    var testname;
    var currency;
    var amount;

    beforeEach(function () {
        testname = this.currentTest.title;
        currency = Gluwa.getCurrencyFromTestName(testname);
        amount = Gluwa.getAmount(currency, "QRCodeTests");
    });

    describe("Positive Test Cases Without Note.", function() {

        it("Post_QRCode_sUSDCG_NoNote_Pos", function () {
            return Gluwa.createQRCode(currency, amount, optionals)
                .then((result) => {
                    assertion.handleAssertionStatusCode(result, testname, 200);
                }).catch((error) => {
                    assertion.handleUnexpectedErrorMsg(error, testname);
                    assert.fail(error);
                });
        });

        it("Post_QRCode_with_Payload_sUSDCG_Pos", function () {
            return Gluwa.getQRCodeWithPayload(currency, amount, optionals)
                .then((result) => {
                    assertion.handleAssertionStatusCode(result, testname, 200);
                }).catch((error) => {
                    assertion.handleUnexpectedErrorMsg(error, testname);
                    assert.fail(error);
                });
        });


        // Todo: undo the comment after sKRWCG is supported
        // it("Post_QRCode_sKRWCG_NoNote_Pos", function () {
        //     return Gluwa.createQRCode(currency, amount, optionals)
        //         .then((result) => {
        //             assertion.handleAssertionStatusCode(result, testname, 200);
        //         }).catch((error) => {
        //             assertion.handleUnexpectedErrorMsg(error, testname);
        //             assert.fail(error);
        //         });
        // });

        it("Post_QRCode_NGNG_NoNote_Pos", function () {
            return Gluwa.createQRCode(currency, amount, optionals)
                .then((result) => {
                    assertion.handleAssertionStatusCode(result, testname, 200);
                }).catch((error) => {
                    assertion.handleUnexpectedErrorMsg(error, testname);
                    assert.fail(error);
                });
        });

        it("Post_QRCode_sNGNG_NoNote_Pos", function () {
            return Gluwa.createQRCode(currency, amount, optionals)
                .then((result) => {
                    assertion.handleAssertionStatusCode(result, testname, 200);
                }).catch((error) => {
                    assertion.handleUnexpectedErrorMsg(error, testname);
                    assert.fail(error);
                });
        });
    });

    describe("Positive Test Cases With Note.", function() {
        optionals.Note = "Test QR Code";

        it("Post_QRCode_sUSDCG_Pos", function () {
            return Gluwa.createQRCode(currency, amount, optionals)
                .then((result) => {
                    assertion.handleAssertionStatusCode(result, testname, 200);
                }).catch((error) => {
                    assertion.handleUnexpectedErrorMsg(error, testname);
                    assert.fail(error);
                });
        });

        // Todo: undo the comment after sKRWCG is supported
        // it("Post_QRCode_sKRWCG_Pos", function () {
        //     return Gluwa.createQRCode(currency, amount, optionals)
        //         .then((result) => {
        //             assertion.handleAssertionStatusCode(result, testname, 200);
        //         }).catch((error) => {
        //             assertion.handleUnexpectedErrorMsg(error, testname);
        //             assert.fail(error);
        //         });
        // });

        it("Post_QRCode_NGNG_Pos", function () {
            return Gluwa.createQRCode(currency, amount, optionals)
                .then((result) => {
                    assertion.handleAssertionStatusCode(result, testname, 200);
                }).catch((error) => {
                    assertion.handleUnexpectedErrorMsg(error, testname);
                    assert.fail(error);
                });
        });

        it("Post_QRCode_sNGNG_Pos", function () {
            return Gluwa.createQRCode(currency, amount, optionals)
                .then((result) => {
                    assertion.handleAssertionStatusCode(result, testname, 200);
                }).catch((error) => {
                    assertion.handleUnexpectedErrorMsg(error, testname);
                    assert.fail(error);
                });
        });
    });

    describe("Negative Test Cases (Less Than Fee).", function() {

        it("Post_QRCode_sUSDCG_AmountTooSmall_Neg", function () {
            return Gluwa.createQRCode(currency, amountLessThanFee, optionals)
                .then((result) => {
                    assert.fail("Shouldn't return result.");
                }).catch((error) => {
                    assertion.handleAssertionStatusCode(error.response, testname, 400);
                    assertion.handleNegativeTestError(error, testname, validationErrorCode);
                });
        });

        // Todo: undo the comment after sKRWCG is supported
        // it("Post_QRCode_sKRWCG_AmountTooSmall_Neg", function () {
        //     return Gluwa.createQRCode(currency, amountLessThanFee, optionals)
        //         .then((result) => {
        //             assert.fail("Shouldn't return result.");
        //         }).catch((error) => {
        //             assertion.handleAssertionStatusCode(error.response, testname, 400);
        //             assertion.handleNegativeTestError(error, testname, validationErrorCode);
        //         });
        // });

        it("Post_QRCode_NGNG_AmountTooSmall_Neg", function () {
            return Gluwa.createQRCode(currency, amountLessThanFee, optionals)
                .then((result) => {
                    assert.fail("Shouldn't return result.");
                }).catch((error) => {
                    assertion.handleAssertionStatusCode(error.response, testname, 400);
                    assertion.handleNegativeTestError(error, testname, validationErrorCode);
                });
        });

        // Todo: to be update, since fee for sNGNG is 0 for now
        it("Post_QRCode_sNGNG_AmountTooSmall_Neg", function () {
            return Gluwa.createQRCode(currency, "0", optionals)
                .then((result) => {
                    assert.fail("Shouldn't return result.");
                }).catch((error) => {
                    assertion.handleAssertionStatusCode(error.response, testname, 400);
                    assertion.handleNegativeTestError(error, testname, validationErrorCode);
                });
        });

    });

    describe("Negative Test Cases (Others).", function() {
        
        it("Post_QRCode_BTC_Neg", function () {
            return Gluwa.createQRCode(currency, amount, optionals)
                .then((result) => {
                    assert.fail("Shouldn't return result.");
                }).catch((error) => {
                    assertion.handleAssertionStatusCode(error.response, testname, 400);
                    assertion.handleNegativeTestError(error, testname, invalidBodyErrorCode);
                });
        });

        it("Post_QRCode_InvalidBody_Neg", function () {
            return Gluwa.createQRCode(currency, amount, optionals)
                .then((result) => {
                    assert.fail("Shouldn't return result.");
                }).catch((error) => {
                    assertion.handleAssertionStatusCode(error.response, testname, 400);
                    assertion.handleNegativeTestError(error, testname, invalidBodyErrorCode);
                });
        });

        it("Post_QRCode_sUSDCG_LongOrderID_Neg", function () {
            optionals.MerchantOrderID = "1012345678901234567890123456789012345678901234567890123456789";
            return Gluwa.createQRCode(currency, amount, optionals)
                .then((result) => {
                    assert.fail("Shouldn't return result.");
                }).catch((error) => {
                    assertion.handleAssertionStatusCode(error.response, testname, 400);
                    assertion.handleNegativeTestError(error, testname, invalidBodyErrorCode, invalidValueErrorCode, longOrderIDErrorMsg);
                });
        });
    });
});