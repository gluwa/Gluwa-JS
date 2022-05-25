const setEnvironment = require('./setup').setEnvironment;
const Gluwa = require('./setup').Gluwa;

// modify this boolean to false if need to test in production environment
const isSandbox = true;
const currencyList = ["sUSDCG", "sKRWCG", "NGNG", "sNGNG", "BTC", "GCRE", "USDCG"];

async function getBalance(currency) {
    setEnvironment(isSandbox);
    const resultPromise = await Gluwa.getAddresses(currency);
    return resultPromise;
}

async function createTransaction(currency, amount, target) {
    setEnvironment(isSandbox);
    const resultPromise = await Gluwa.postTransaction(currency, amount, target);
    return resultPromise;
}

async function createQRCode(currency, amount, optionals) {
    setEnvironment(isSandbox);
    const resultPromise = await Gluwa.getPaymentQRCode(currency, amount, optionals);
    return resultPromise;
}

async function createQRCodeWithPayload(currency, amount, optionals) {
    setEnvironment(isSandbox);
    const resultPromise = await Gluwa.getQRCodeWithPayload(currency, amount, optionals);
    return resultPromise;
}

async function getTransactionHistory(currency, optionals) {
    setEnvironment(isSandbox);
    const resultPromise = await Gluwa.getTransactionHistory(currency, optionals);
    return resultPromise;
}

async function getTransactionDetail(currency, hash) {
    setEnvironment(isSandbox);
    const resultPromise = await Gluwa.getTransactionDetail(currency, hash);
    return resultPromise; 
}

function getWebhookValidation(payload, signature) {
    setEnvironment(isSandbox);
    const resultBoolean = Gluwa.validateWebhook(payload, signature);
    return resultBoolean;
}

function getCurrencyFromTestName(testname) {
    const currency = testname.split("_")[2];
    if (currencyList.indexOf(currency) > -1) {
        return currency;
    } else {
        return "invalidCurrency";
    }
}

function getAmount(currency, testcase) {
    var amount;
    switch(testcase) {
        case "QRCodeTests":
            switch(currency) {
                case "sUSDCG":
                    amount = "200";
                    break;
                case "sKRWCG":
                    amount = "50000";
                    break;
                case "NGNG":
                    amount = "600";
                    break;
                case "sNGNG":
                    amount = "1"; // to be update, since fee for sNGNG is 0 for now
                    break;
                default:
                    amount = "50";
                    break;
            }
            break;
        case "TransactionTests":
            switch(currency) {
                case "sKRWCG":
                    amount = "1500";
                    break;
                default:
                    amount = "1";
                    break;
            }
            break;
        default:
            amount = "1";
    }
    return amount;
}

module.exports = { isSandbox, getBalance, createTransaction, createQRCode, createQRCodeWithPayload, 
    getTransactionHistory, getTransactionDetail, getWebhookValidation, getCurrencyFromTestName, getAmount }