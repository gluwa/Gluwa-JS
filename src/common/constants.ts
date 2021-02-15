export enum ENV_TYPES {
  PROD = 'prod',
  SANDBOX = 'sandbox',
}

export enum CURRENCY_TYPES {
  USDG = 'USDG',
  sUSDCG = 'sUSDCG',
  KRWG = 'KRWG',
}

export const CONFIG = {
  prod: {
    APIHost: 'https://api.gluwa.com',
  },
  sandbox: {
    APIHost: 'https://sandbox.api.gluwa.com',
  },
};

export const CONTRACT_ADDRESS = {
  USDG: {
    prod: '0xfb0aaa0432112779d9ac483d9d5e3961ece18eec',
    sandbox: '0x8e9611f8ebc9323EdDA39eA2d8F31bbb2436adEE',
  },
  sUSDCG: {
    prod: '0x39589FD5A1D4C7633142A178F2F2b30314FB2BaF',
    sandbox: '0x5f71cbAebb9c1e8F1664a8eF2e1cFF2ED8044eE0',
  },
  KRWG: {
    prod: '0x4cc8486f2f3dce2d3b5e27057cf565e16906d12d',
    sandbox: '0x408b7959b3e15b8b1e8495fa9cb123c0180d44db',
  },
};

export { ENV_TYPES as default };
