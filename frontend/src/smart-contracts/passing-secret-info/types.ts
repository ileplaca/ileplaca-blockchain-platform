import { BigNumberish } from "ethers";

export type SecretInfo = [
  secret_info_id: number,
  owner_address: string,
  amount: number | BigNumberish,
  company_name: string,
  title: string,
  description: string,
]


export type SecretInfoAccessed = [
  secret_info: SecretInfo,
  info: string,
  accessed_addresses: string[]
]



export interface PassingSecretInfoContract {
  getSecretInfos: () => Promise<SecretInfo[]>,
  getSecretInfoById: (id: number | string) => Promise<SecretInfo>,
  getSecretInfosByCompanyName: (company_name: string) => Promise<SecretInfo[]>,
  getSecretInfoAccessed: (id: number | string) => Promise<SecretInfoAccessed>,
  addSecretInfo: (amount: number | BigNumberish, title: string, description: string, company_name: string, info: string) => Promise<void>;
  payForSecretInfoAccess: (id: number | string, ...args: any) => Promise<void>
}