const GluwaJS = require('@gluwa/gluwa-js');
require ('dotenv').config();

const GluwaConfig = {
    production: {
        APIKey: process.env.APIKEY_PRODUCTION,
        APISecret: process.env.APISECRET_PRODUCTION,
        WebhookSecret: process.env.WEBHOOKSECRET_PRODUCTION,
        MasterEthereumAddress: process.env.MASTERETHEREUMADDRESS_PRODUCTION,
        MasterEthereumPrivateKey: process.env.MASTERETHEREUMPRIVATEKEY_PRODUCTION,
        isDev: false,
    },
    sandbox: {
        APIKey: process.env.APIKEY_SANDBOX,
        APISecret: process.env.APISECRET_SANDBOX,
        WebhookSecret: process.env.WEBHOOKSECRET_SANDBOX,
        MasterEthereumAddress: process.env.MASTERETHEREUMADDRESS_SANDBOX,
        MasterEthereumPrivateKey: process.env.MASTERETHEREUMPRIVATEKEY_SANDBOX,
        isDev: true,
    }
}

var Gluwa = new GluwaJS(GluwaConfig.sandbox);

function setEnvironment(isSandbox) {
    if (!isSandbox) {
        Gluwa = new GluwaJS(GluwaConfig.production);
    }
}

module.exports = { Gluwa, setEnvironment }