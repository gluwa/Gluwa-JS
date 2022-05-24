const assert = require('chai').assert;
const Gluwa = require('../shared');
require ('dotenv').config();

describe("Tests for getting webhook validation.", function() {

    var payload;
    var signature;

    before(function() {
        if(Gluwa.isSandbox) {
            payload = process.env.PAYLOAD_SANDBOX;
            signature = process.env.SIGNATURE_SANDBOX;
        } else {
            payload = process.env.PAYLOAD_PRODUCTION;
            signature = process.env.SIGNATURE_PRODUCTION;
        }
    })

    describe("Positive Test cases.", function() {

        it("WebhookValidation_Pos", function() {
            const resultBoolean = Gluwa.getWebhookValidation(payload, signature);
            assert.equal(resultBoolean, true);
        });
    });

    describe("Negative Test cases.", function() {

        it("WebhookValidation_InvalidSignature_Neg", function() {
            const resultBoolean = Gluwa.getWebhookValidation(payload, "invalidSignature");
            assert.equal(resultBoolean, false);
        });

        it("WebhookValidation_InvalidPayload_Neg", function() {
            const resultBoolean = Gluwa.getWebhookValidation("invalidPayload", signature);
            assert.equal(resultBoolean, false);
        })
    })
});