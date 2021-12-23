import axios, { AxiosPromise } from 'axios';
import { ethers } from 'ethers';
import { Base64 } from 'js-base64';
import CryptoJS from 'crypto-js';

import { getReqConfig } from './common/apis';
import { getStringOfRandomNumbers } from './common/utils';
import { ENV_TYPES, CURRENCY_TYPES } from './common/constants';
import { IContractAddressData } from './common/types';

/**
 * Gluwa SDK Class for Node.js
 *
 * @param {object} args param object
 * @param {string} args.APIKey
 * @param {string} args.APISecret
 * @param {string} args.WebhookSecret
 * @param {string} args.MasterEthereumAddress
 * @param {string} args.MasterEthereumPrivateKey
 * @param {boolean} args.isDev
 */
export default class Gluwa {
  APIKey: string;
  APISecret: string;
  WebhookSecret: string;
  MasterEthereumAddress: string;
  MasterEthereumPrivateKey: string;
  isDev: boolean;
  env: string;
  APIHost: string;

  constructor(
    {
      APIKey,
      APISecret,
      WebhookSecret,
      MasterEthereumAddress,
      MasterEthereumPrivateKey,
      isDev = false,
    }: {
      APIKey: string;
      APISecret: string;
      WebhookSecret: string;
      MasterEthereumAddress: string;
      MasterEthereumPrivateKey: string;
      isDev?: boolean;
    }
  ) {
    if (!APIKey) {
      throw Error('Required "APIKey" key not supplied in config.');
    } else {
      this.APIKey = APIKey;
    }

    if (!APISecret) {
      throw Error('Required "APISecret" key not supplied in config.');
    } else {
      this.APISecret = APISecret;
    }

    if (!WebhookSecret) {
      throw Error('Required "WebhookSecret" key not supplied in config.');
    } else {
      this.WebhookSecret = WebhookSecret;
    }

    if (!MasterEthereumAddress) {
      throw Error('Required "MasterEthereumAddress" key not supplied in config.');
    } else {
      this.MasterEthereumAddress = MasterEthereumAddress;
    }

    if (!MasterEthereumPrivateKey) {
      throw Error('Required "MasterEthereumPrivateKey" key not supplied in config.');
    } else {
      this.MasterEthereumPrivateKey = MasterEthereumPrivateKey;
    }

    this.isDev = isDev;
    this.env = isDev ? ENV_TYPES.SANDBOX : ENV_TYPES.PROD;
  }

  /**
   * Returns base64 encoded auth string
   */
  getAuthorization(): string {
    return Base64.btoa(`${this.APIKey}:${this.APISecret}`);
  }

  /**
   * Returns contract address by currency
   *
   * @param {CURRENCY_TYPES} Currency
   */
  async getContractAddressData(Currency: CURRENCY_TYPES): Promise<IContractAddressData | Error> {
    try {
      const fetchConfig = getReqConfig('getContractAddress', {
        env: this.env,
        Currency,
      });
      const response = await axios(fetchConfig);

      if (response && response.status === 200 && response.data && response.data.Address) {
        return response.data;
      }

      return Error(`Failed to contract address :: \n${fetchConfig}\n${response}\n\n`);
    } catch (e) {
      return Error(`Failed to contract address :: \n${e}\n\n`);
    }
  }

  /**
   * Returns base64 encoded signature using timestamp
   */
  async getTimestampSignature(): Promise<string | Error> {
    try {
      const timestamp = String(Math.floor(new Date().getTime() / 1000));
      const wallet = new ethers.Wallet(this.MasterEthereumPrivateKey);
      const signedMessage = await wallet.signMessage(timestamp);

      return Base64.btoa(`${timestamp}.${signedMessage}`);
    } catch (e) {
      return Error(`Failed to get timestamp signature :: \n${e}\n\n`);
    }
  }

  /**
   * Returns fee
   *
   * @param Currency
   */
  async getFee(Currency: CURRENCY_TYPES, Amount: string): Promise<string | Error> {
    try {
      const fetchConfig = getReqConfig('getFee', {
        env: this.env,
        Currency,
        Amount,
      });
      const response = await axios(fetchConfig);

      if (response && response.status === 200 && response.data && response.data.MinimumFee) {
        return response.data.MinimumFee;
      }

      return Error(`Failed to get fee :: \n${response}\n\n`);
    } catch (e) {
      return Error(`Failed to get fee :: \n${e}\n\n`);
    }
  }

  /**
   * Returns signature by using args object
   *
   * @param {object} args param object
   * @param {CURRENCY_TYPES} args.Currency
   * @param {string} args.Amount
   * @param {string} args.Fee
   * @param {string} args.SendersAddress
   * @param {string} args.ReceiversAddress
   * @param {string} args.Nonce
   * @param {string} args.PrivateForSigning
   */
  async getSignature(args: {
    Currency: CURRENCY_TYPES;
    Amount: string;
    Fee: string;
    Nonce: string;
    SendersAddress: string;
    ReceiversAddress: string;
    PrivateForSigning: string;
  }): Promise<string | Error> {
    try {
      let amount: string = ethers.utils.parseEther(args.Amount).toString();
      let fee: string = ethers.utils.parseEther(args.Fee).toString();
      const {
        Address,
        Currency,
        Decimals,
      } = await this.getContractAddressData(args.Currency) as unknown as IContractAddressData;

      if (Decimals && Decimals === 6 || Decimals === '6') {
        if (amount.length > 12) {
          amount = amount.substr(0, amount.length - 12);
        }
        if (fee.length > 12) {
          fee = fee.substr(0, fee.length - 12);
        }
      }

      let messageHash: string;
      if (Currency === 'USDCG') {
        // domain value, chain id, contract address, sender, recipient, amount, fee, nonce
        messageHash = ethers.utils.solidityKeccak256(
          ['uint8', 'uint256', 'address', 'address', 'address', 'uint256', 'uint256', 'uint256'],
          [
            3,
            this.isDev? 4 : 1,
            String(Address),
            args.SendersAddress,
            args.ReceiversAddress,
            amount,
            fee,
            String(args.Nonce),
          ],
        );
      } else {
        // contract address, sender, recipient, amount, fee, nonce
        messageHash = ethers.utils.solidityKeccak256(
          ['address', 'address', 'address', 'uint256', 'uint256', 'uint256'],
          [
            String(Address),
            args.SendersAddress,
            args.ReceiversAddress,
            amount,
            fee,
            String(args.Nonce),
          ],
        );

      }

      const messageHashBinary = ethers.utils.arrayify(messageHash);

      const wallet = new ethers.Wallet(args.PrivateForSigning);

      return wallet.signMessage(messageHashBinary);
    } catch (e) {
      return Error(`Failed to get signature :: \n${e}\n\n`);
    }
  }

  /**
   * Returns Payment QR Code, base 64 encoded string.
   *
   * @param {CURRENCY_TYPES} Currency USDCG or sUSDCG or KRWG
   * @param {string} Amount Sending Amount
   * @param {string} Note (optional)
   * @param {string} Expiry (optional)
   * @param {string} MerchantOrderID (optional)
   */
  async getPaymentQRCode(
    Currency: CURRENCY_TYPES,
    Amount: string,
    paramObj: {
      Note: string;
      Expiry: string;
      MerchantOrderID: string;
    },
  ): Promise<AxiosPromise<string> | Error> {
    try {
      const Signature = await this.getTimestampSignature();

      if (Signature instanceof Error) {
        return Error(`getPaymentQRCode :: ${Signature.message}`);
      }

      const getPaymentQRCodeData: {
        Signature: string
        Currency: string
        Amount: string,
        Target: string,
        MerchantOrderID?: string,
        Note?: string,
        Expiry?: string,
      } = {
        Signature,
        Currency,
        Amount,
        Target: this.MasterEthereumAddress,
      };

      try {
        if (paramObj && paramObj.MerchantOrderID) {
          getPaymentQRCodeData.MerchantOrderID = String(paramObj.MerchantOrderID);
        }
        if (paramObj && paramObj.Note) {
          getPaymentQRCodeData.Note = String(paramObj.Note);
        }
        if (paramObj && paramObj.Expiry) {
          getPaymentQRCodeData.Expiry = String(paramObj.Expiry);
        }
      } catch (e) {
        console.log('getPaymentQRCode :: ', e, '\n\n\n\n');
      }

      const fetchConfig = getReqConfig('getPaymentQRCode', {
        env: this.env,
        AuthForHeader: this.getAuthorization(),
        data: getPaymentQRCodeData,
      });

      return axios(fetchConfig);
    } catch (e) {
      return Error(`getPaymentQRCode :: \n${e}\n\n`);
    }
  }

  /**
   * Create a New Transaction
   *
   * @param {CURRENCY_TYPES} Currency USDCG or sUSDCG or KRWG
   * @param {string} Amount Sending Amount
   * @param {string} Target Receiver's Address
   */
  async postTransaction(
    Currency: CURRENCY_TYPES,
    Amount: string,
    Target: string,
  ): Promise<AxiosPromise<string> | Error> {
    try {
      const Fee = await this.getFee(Currency, Amount);
      const Nonce = `${getStringOfRandomNumbers(75)}`;

      if (Fee instanceof Error) {
        return Error(`postTransaction Fee:: ${Fee.message}`);
      }

      const getSignatureArgs = {
        Currency,
        Amount: String(Amount),
        Fee: String(Fee),
        Nonce: String(Nonce),
        ReceiversAddress: String(Target),
        SendersAddress: String(this.MasterEthereumAddress),
        PrivateForSigning: String(this.MasterEthereumPrivateKey),
      };

      const Signature = await this.getSignature(getSignatureArgs);

      if (Signature instanceof Error) {
        return Error(`postTransaction Signature :: ${Signature.message}`);
      }

      const fetchConfig = getReqConfig('postTransactions', {
        env: this.env,
        data: {
          Signature,
          Source: this.MasterEthereumAddress,
          Currency,
          Target,
          Amount,
          Fee,
          Nonce,
        },
      });

      return axios(fetchConfig);
    } catch (e) {
      return Error(`postTransaction :: \n${e}\n\n`);
    }
  }

  /**
   * Returns Transaction History List for an Address
   *
   * @param {CURRENCY_TYPES} Currency USDCG or sUSDCG or KRWG
   * @param {number} Limit (optional)
   * @param {string} Status (optional)
   * @param {number} Offset (optional)
   */
  async getTransactionHistory(
    Currency: CURRENCY_TYPES,
    {
      Limit,
      Status,
      Offset,
    }: {
      Limit: string;
      Status: string;
      Offset: string;
    },
  ): Promise<AxiosPromise<string> | Error> {
    try {
      const Signature = await this.getTimestampSignature();

      if (Signature instanceof Error) {
        return Error(`getTransactionHistory :: ${Signature.message}`);
      }

      const fetchConfig = getReqConfig(
        'getTransactionHistory', //
        {
          env: this.env,
          Currency,
          MasterEthereumAddress: this.MasterEthereumAddress,
          Signature,
          params: {
            Limit: Limit ? parseInt(Limit, 10) : 100,
            Status: Status ? String(Status) : 'Confirmed',
            Offset: Offset ? parseInt(Offset, 10) : 0,
          },
        },
      );

      return axios(fetchConfig);
    } catch (e) {
      return Error(`getTransactionHistory :: \n${e}\n\n`);
    }
  }

  /**
   * Retrieve Transaction Details by Hash
   *
   * @param {CURRENCY_TYPES} Currency USDCG or sUSDCG or KRWG
   * @param {string} TxnHash
   */
  async getTransactionDetail(Currency: CURRENCY_TYPES, TxnHash: string): Promise<AxiosPromise<string> | Error> {
    try {
      const Signature = await this.getTimestampSignature();

      if (Signature instanceof Error) {
        return Error(`getTransactionDetail :: ${Signature.message}`);
      }

      const fetchConfig = getReqConfig(
        'getTransactionDetail', //
        {
          env: this.env,
          Currency,
          TxnHash,
          Signature,
        },
      );

      return axios(fetchConfig);
    } catch (e) {
      return Error(`getTransactionDetail :: \n${e}\n\n`);
    }
  }

  /**
   * Retrieve a Balance for an Address
   *
   * @param {CURRENCY_TYPES} Currency USDCG or sUSDCG or KRWG
   */
  async getAddresses(Currency: CURRENCY_TYPES): Promise<AxiosPromise<string> | Error> {
    try {
      const fetchConfig = getReqConfig(
        'getAddresses', //
        {
          env: this.env,
          Currency,
          MasterEthereumAddress: this.MasterEthereumAddress,
        },
      );

      return axios(fetchConfig);
    } catch (e) {
      return Error(`getAddresses :: \n${e}\n\n`);
    }
  }

  /**
   * Webhook Validation
   *
   * @param {unknown} Payload
   * @param {string} Signature
   */
  validateWebhook(Payload: unknown, Signature: string): boolean {
    const payloadHash = CryptoJS.HmacSHA256(Payload, this.WebhookSecret);
    const payloadHashBase64Encoded = payloadHash.toString(CryptoJS.enc.Base64);
    // console.log('\n\n\n\n', payloadHashBase64Encoded, '\n\n\n\n');

    return payloadHashBase64Encoded === Signature;
  }
}
