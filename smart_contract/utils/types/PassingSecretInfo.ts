import { BigNumber } from "ethers";

export interface SecretInfo {
  secret_info_id: number;
  owner_address: string;
  amount: number | BigNumber;
  title: string
  description: string;
}

export interface SecretInfoAccessed {
  secret_info: SecretInfo
  info: string
  accessed_addresses: string;
}

export interface PassingSecretInfo {
  getSecretInfos: () => Promise<SecretInfo[]>,
  getSecretInfoById: (id: number | string) => Promise<SecretInfo>,
  getSecretInfoAccessed: (id: number | string) => Promise<SecretInfoAccessed>,
  addSecretInfo: (amount: number | BigNumber, title: string, description: string, info: string) => Promise<void>;
  payForSecretInfoAccess: (id: number | string, ...args: any) => Promise<void>
  deployed: () => Promise<void>
  connect: (address: any) => Promise<PassingSecretInfo>
  receive: ({ value }: { value: number | BigNumber }) => Promise<PassingSecretInfo>
}