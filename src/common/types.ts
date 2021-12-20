export type Nullable<T> = T | null;
export type Maybe<T> = T | null | undefined;

export interface IContractAddressData {
  Address: string,
  Decimals: number | string,
  Currency: string,
  Environment?: string,
}
