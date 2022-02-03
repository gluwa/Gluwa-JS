export enum ENV_TYPES {
  PROD = 'PROD',
  SANDBOX = 'SANDBOX',
}

export enum NET_TYPES {
  PROD = 'Mainnet',
  SANDBOX = 'Testnet',
}

export enum CURRENCY_TYPES {
  BTC = 'BTC',
  GCRE = 'GCRE',
  USDCG = 'USDCG',
  sUSDCG = 'sUSDCG',
  NGNG = 'NGNG',
  sNGNG = 'sNGNG',
}

export const CONFIG = {
  PROD: {
    APIHost: 'https://api.gluwa.com',
  },
  SANDBOX: {
    APIHost: 'https://sandbox.api.gluwa.com',
  },
};

export { CONFIG as default };
