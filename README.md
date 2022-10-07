# Gluwa SDK for Javascript \(Node.js\)

If your service is developed in Node.js, the features we provide are available through the SDK. The Gluwa SDK for Node.js is a library with powerful features that enable Node.js developers to easily make requests to the Gluwa APIs.

## Getting started

Install the npm package on your Node.js server.

```bash
$ npm install @gluwa/gluwa-js
```

Never use Gluwa SDK on the client side or make your private key public.

Create and initialize a `Gluwa` object. Then, enter the `APIKey`, `APISecret` and `WebookSecret` generated from the [Gluwa Dashboard](https://dashboard.gluwa.com), and an Ethereum wallet to manage your funds. You can use credentials from sandbox dashboard and a Goerli wallet if you want to test in the sandbox environment.

```javascript
const GluwaJS = require('@gluwa/gluwa-js');

const GluwaConfig = {
    production: {
        APIKey: '{Your production API Key}',
        APISecret: '{Your production API Secret}',
        WebhookSecret: '{Your production Webhook Secret}',
        MasterEthereumAddress: '{Your Ethereum Address for production}',
        MasterEthereumPrivateKey: '{Your Ethereum Private Key for production}',
        isDev: false,
    },
    sandbox: {
        APIKey: '{Your sandbox API Key}',
        APISecret: '{Your sandbox API Secret}',
        WebhookSecret: '{Your sandbox Webhook Secret}',
        MasterEthereumAddress: '{Your Ethereum Address for sandbox}',
        MasterEthereumPrivateKey: '{Your Ethereum Private Key for sandbox}',
        isDev: true,
    },
}

const Gluwa = new GluwaJS(GluwaConfig.production);
```

Now you are ready to use the Gluwa API.

## Method Examples

#### [Create a New Transaction](https://docs.gluwa.com/api/api.md#create-a-new-transaction)

```javascript
const Currency = '{USDG or sUSDCG or KRWG}'; // e.g USDG
const Amount = '{Send Amount}'; // e.g 1.581
const Target = '{Receiver`s Address}'; // e.g 0xf04349B4A760F5Aed02131e0dAA9bB99a1d1d1e5

const resultPromise = await Gluwa.postTransaction(Currency, Amount, Target);
```

#### [Create a Payment QR Code](https://docs.gluwa.com/api/api.md#create-a-payment-qr-code)

```php
const Currency = '{USDG or sUSDCG or KRWG}'; // e.g USDG
const Amount = '{Send Amount}'; // e.g 1.581
const Optionals = {
    Note: '', // optional
    MerchantOrderID: '', // optional
    Expiry: '1800', // optional, it must be a string
};

const resultPromise = await Gluwa.getPaymentQRCode(Currency, Amount, Optionals);
```

`getPaymentQRCode` API returns a QR code png image as a Base64 string. You can display the image on your website as below:

```markup
<img src="data:image/png;base64,{BASE64_STRING_YOU_RECEIVED}" alt="Gluwa Payment QR Code">
```

#### [List Transaction History for an Address](https://docs.gluwa.com/api/api.md#list-transaction-history-for-an-address)

```javascript
const Currency = '{USDG or sUSDCG or KRWG}'; // e.g USDG
const Optionals = {
    Limit: '100', // optional, it must be a string
    Offset: '0', // optional, it must be a string
    Status: 'Confirmed', // optional
};

const resultPromise = await Gluwa.getTransactionHistory(Currency, Optionals);
```

#### [Retrieve Transaction Details by Hash](https://docs.gluwa.com/api/api.md#retrieve-transaction-details-by-hash)

```php
const Currency = '{USDG or sUSDCG or KRWG}'; // e.g USDG
const Hash = '{Transaction hash}';

const resultPromise = await Gluwa.getTransactionDetail(Currency, Hash);
```

#### [Retrieve a Balance for an Address](https://docs.gluwa.com/api/api.md#retrieve-a-balance-for-an-address)

```php
const Currency = '{USDG or sUSDCG or KRWG}'; // e.g USDG

const resultPromise = await Gluwa.getAddresses(Currency);
```

#### [Webhook Validation](https://docs.gluwa.com/development/webhooks#step-3-verify-your-wallet-address)

When user completes transfer via the QR code, the Gluwa API sends a webhook to your webhook endpoint. Verify that the values ​​actually sent by the Gluwa server are correct.

Verify the requested Signature and Payload as follows:

```php
// Payload example
// {"ID":"9d238b83-e5c7-4a1e-a6b4-5bf7ec1d0218","CreatedDateTime":"2021-01-06T07:46:50.2779406Z","ResourceType":"Transaction","EventName":"TRANSACTION.CREATED","Summary":"A transaction was created.","Resource":{"ID":"62e667cf-1a80-41bf-b064-925999ed5b76","TxHash":"0x89a5d4cb0f1d6b919a4ada42b661ed7b2574ec4dd2d640f5c92642bad532dbe0","Source":"0xf04349B4A760F5Aed02131e0dAA9bB99a1d1d1e5","Target":"0x084Af3876A220F4732e21F7617dc212BB2A1f32E","Amount":"10","Fee":"0.5","Currency":"sUSDCG","Status":"Confirmed"}}

// Signature example
// 7iPzvTRVR81cuZQetKbF1GaGPIk1UkzyvFc6hhgA+VI=

const resultBoolean = Gluwa.validateWebhook(Payload, Signature);
```

## How to resolve promise

All functions except Webhook Validation return `promise`. This can be used by resolving it like this:

```javascript
resultPromise.then((result) => {
    console.log(result);
}).catch((error) => {
    console.warn(error);
});
```
