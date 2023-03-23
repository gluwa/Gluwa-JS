export enum ENV_TYPES {
  PROD = 'PROD',
  TEST = 'TEST',
}

export enum NET_TYPES {
  PROD = 'Mainnet',
  TEST = 'Testnet',
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
  TEST: {
    APIHost: 'https://api-test.gluwa.com/',
  },
};

export { CONFIG as default };
