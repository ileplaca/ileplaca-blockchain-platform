import { BigNumberish } from "ethers";



export type SecretInfoReply = [
  id: number,
  owner_address: string,
  created_at: number,
  content: string
]

export type SecretInfoRate = [
  id: number,
  owner_address: string,
  rate: boolean
]

export type SecretInfo = [
  id: number,
  owner_address: string,
  amount: number | BigNumberish,
  title: string,
  description: string,
  company_name: string,
  company_id: number,
  created_at: number,
  max_uses: number,
  replies: SecretInfoReply[],
  rates: SecretInfoRate[]
]

export type SecretInfoAccessed = [
  info: string,
  accessed_addresses: string[]
]

export type SecretInfoAccessedResponse = [
  secret_info: SecretInfo,
  secret_info_accessed: SecretInfoAccessed
]



export interface PassingSecretInfo {
  getSecretInfos: () => Promise<SecretInfo[]>,
  getSecretInfoById: (secret_info_id: number | string) => Promise<SecretInfo>,
  getSecretInfosByCompanyName: (company_name: string) => Promise<SecretInfo[]>,
  getSecretInfosByCompanyId: (company_id: number) => Promise<SecretInfo[]>,

  getSecretInfoAccessedById: (secret_info_id: number | string) => Promise<SecretInfoAccessedResponse>,
  getPaidSecretInfosAccessed: () => Promise<SecretInfoAccessedResponse[]>,

  addSecretInfo: (amount: number | BigNumberish, title: string, description: string, company_name: string, company_id: number, max_uses: number, info: string) => Promise<void>;
  payForSecretInfoAccess: (secret_info_id: number | string, ...args: any) => Promise<void>

  addReplySecretInfo: (secret_info_id: number, content: string) => Promise<void>,
  addRateSecretInfo: (secret_info_id: number, rate: boolean) => Promise<void>,
  removeRateSecretInfo: (secret_info_id: number) => Promise<void>,
  changeRateSecretInfo: (secret_info_id: number) => Promise<void>,
}