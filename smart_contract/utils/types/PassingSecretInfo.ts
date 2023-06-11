import { BigNumber } from "ethers";
import { Address } from "hardhat-deploy/dist/types";

export interface SecretInfo {
  secret_info_id: number;
  owner_address: Address;
  amount: number | BigNumber;
  company_name: string
  title: string
  description: string;
}

export interface SecretInfoAccessed {
  secret_info: SecretInfo
  info: string
  accessed_addresses: Address[];
}

export interface PassingSecretInfo {
  getSecretInfos: () => Promise<SecretInfo[]>,
  getSecretInfoById: (id: number | string) => Promise<SecretInfo>,
  getSecretInfosByCompanyName: (company_name: string) => Promise<SecretInfo[]>,
  getSecretInfoAccessed: (id: number | string) => Promise<SecretInfoAccessed>,
  getPaidSecretInfosAccessed: () => Promise<SecretInfoAccessed[]>,
  addSecretInfo: (amount: number | BigNumber, title: string, description: string, company_name: string, info: string) => Promise<void>;
  payForSecretInfoAccess: (id: number | string, ...args: any) => Promise<void>


  deployed: () => Promise<void>
  connect: (address: any) => Promise<PassingSecretInfo>
  receive: ({ value }: { value: number | BigNumber }) => Promise<PassingSecretInfo>
}