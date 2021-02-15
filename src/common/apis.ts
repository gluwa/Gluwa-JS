import { AxiosRequestConfig } from 'axios';
import { Maybe } from './types';

interface IParamForReq {
  APIHost?: string;
  Currency?: string;
  AuthForHeader?: string;
  Signature?: string;
  TxnHash?: string;
  MasterEthereumAddress?: string;
  data?: unknown;
  params?: unknown;
}

// type TReqConfigHeaders = {
//   Accept: 'application/json';
//   'Content-Type': 'application/json;charset=UTF-8';
// };

interface IReqConfig extends AxiosRequestConfig {
  // method: string; // HTTP method of request
  // url: string; // Url of request
  // headers?: TReqConfigHeaders;
  // data?: unknown; // POST parameters of request
  // params?: unknown; // GET parameters of request (irrelevant to HTTP method)
  mode?: string; // checks cors
}

/**
 * Returns the config for calling api with axios.
 * @param reqName Name of request
 * @param paramForReq Parameter for request
 * @returns {IReqConfig} Configuration object for request
 */
export function getReqConfig(reqName: string, paramForReq: Maybe<IParamForReq>): IReqConfig {
  switch (reqName) {
    case 'getFee':
      return {
        method: 'GET',
        mode: 'CORS',
        url: `${paramForReq.APIHost}/v1/${paramForReq.Currency}/Fee`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
      };
    case 'getPaymentQRCode':
      return {
        method: 'POST',
        url: `${paramForReq.APIHost}/v1/QRCode`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Basic ${paramForReq.AuthForHeader}`,
        },
        data: JSON.stringify(paramForReq.data),
      };
    case 'postTransactions':
      return {
        method: 'POST',
        url: `${paramForReq.APIHost}/v1/Transactions`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        data:  JSON.stringify(paramForReq.data),
      };
    case 'getTransactionHistory':
      return {
        method: 'GET',
        url: `${paramForReq.APIHost}/v1/${paramForReq.Currency}/Addresses/${paramForReq.MasterEthereumAddress}/Transactions`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'X-REQUEST-SIGNATURE': paramForReq.Signature,
        },
        params: paramForReq.params,
      };
    case 'getTransactionDetail':
      return {
        method: 'GET',
        url: `${paramForReq.APIHost}/v1/${paramForReq.Currency}/Transactions/${paramForReq.TxnHash}`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'X-REQUEST-SIGNATURE': paramForReq.Signature,
        },
      };
    case 'getAddresses':
      return {
        method: 'GET',
        url: `${paramForReq.APIHost}/v1/${paramForReq.Currency}/Addresses/${paramForReq.MasterEthereumAddress}`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
      };
    default:
      return null;
  }
}

export { getReqConfig as default };
