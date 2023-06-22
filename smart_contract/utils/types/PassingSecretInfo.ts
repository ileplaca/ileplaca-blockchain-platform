import { BigNumber } from "ethers";
import { Address } from "hardhat-deploy/dist/types";


export interface Reply {
  id: number,
  owner_address: string,
  created_at: number,
  content: string
}

export interface Rate {
  id: number,
  owner_address: string,
  rate: boolean
}

export interface SecretInfo {
  id: number;
  owner_address: Address;
  amount: number | BigNumber;
  title: string,
  description: string,
  company_name: string,
  company_id: number,
  created_at: number,
  max_uses: number,
  replies: Reply[],
  rates: Rate[]
}

export interface SecretInfoAccessed {
  info: string
  accessed_addresses: Address[];
}

export interface SecretInfoAccessedResponse {
  secret_info: SecretInfo,
  secret_info_accessed: SecretInfoAccessed
}



export interface PassingSecretInfo {
  getSecretInfos: () => Promise<SecretInfo[]>,
  getSecretInfoById: (secret_info_id: number | string) => Promise<SecretInfo>,
  getSecretInfosByCompanyName: (company_name: string) => Promise<SecretInfo[]>,
  getSecretInfosByCompanyId: (company_id: number) => Promise<SecretInfo[]>,

  getSecretInfoAccessedById: (secret_info_id: number | string) => Promise<SecretInfoAccessedResponse>,
  getPaidSecretInfosAccessed: () => Promise<SecretInfoAccessedResponse[]>,

  addSecretInfo: (amount: number | BigNumber, title: string, description: string, company_name: string, company_id: number, max_uses: number, info: string) => Promise<void>;
  payForSecretInfoAccess: (secret_info_id: number | string, ...args: any) => Promise<void>

  addSecretInfoReply: (secret_info_id: number, content: string) => Promise<void>,
  addSecretInfoRate: (secret_info_id: number, rate: boolean) => Promise<void>,
  removeSecretInfoRate: (secret_info_id: number) => Promise<void>,
  changeSecretInfoRate: (secret_info_id: number) => Promise<void>,

  deployed: () => Promise<void>
  connect: (address: any) => Promise<PassingSecretInfo>
  receive: ({ value }: { value: number | BigNumber }) => Promise<PassingSecretInfo>
}