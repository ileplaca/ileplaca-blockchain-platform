import { BigNumberish } from 'ethers';
import { Rate, Reply } from 'smart-contracts/types';

export type SecretInfo = [
  id: number,
  owner_address: string,
  amount: number | BigNumberish,
  title: string,
  description: string,
  created_at: number,
  max_uses: number,
  current_uses: number,
  replies: Reply[],
  rates: Rate[]
];

export type SecretInfoAccessed = [info: string, accessed_addresses: string[]];

export type SecretInfoAccessedResponse = [
  secret_info: SecretInfo,
  secret_info_accessed: SecretInfoAccessed
];

export type AccountOpinion = [
  owner_address: string,
  account_address: string,
  created_at: number,
  content: string,
  rate: boolean
];

export interface PassingSecretInfo {
  getSecretInfos: () => Promise<SecretInfo[]>;
  getSecretInfoById: (secret_info_id: number | string) => Promise<SecretInfo>;
  getSecretInfosByCompanyName: (company_name: string) => Promise<SecretInfo[]>;
  getSecretInfosByCompanyId: (company_id: number | string) => Promise<SecretInfo[]>;

  getSecretInfoAccessedById: (
    secret_info_id: number | string
  ) => Promise<SecretInfoAccessedResponse>;
  getSecretInfosAccessed: () => Promise<SecretInfoAccessedResponse[]>;

  addSecretInfo: (
    amount: number | BigNumberish,
    title: string,
    description: string,
    max_uses: number,
    info: string
  ) => Promise<void>;
  payForSecretInfoAccess: (
    secret_info_id: number | string,
    { value }: { value: BigNumberish }
  ) => Promise<void>;

  addSecretInfoReply: (secret_info_id: number | string, content: string) => Promise<void>;
  addSecretInfoRate: (secret_info_id: number | string, rate: boolean) => Promise<void>;
  removeSecretInfoRate: (secret_info_id: number | string) => Promise<void>;
  changeSecretInfoRate: (secret_info_id: number | string) => Promise<void>;
}
