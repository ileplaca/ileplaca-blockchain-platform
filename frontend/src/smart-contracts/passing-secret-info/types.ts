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
  rates: Rate[],
  zero_knowledge_proof: string
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
  getSecretInfosAccessed: () => Promise<SecretInfoAccessedResponse[]>;

  addSecretInfo: (
    amount: number | BigNumberish,
    title: string,
    description: string,
    max_uses: number,
    info: string,
    zero_knowledge_proof: string
  ) => Promise<void>;
  payForSecretInfoAccess: (
    secret_info_id: number | string,
    { value }: { value: BigNumberish }
  ) => Promise<void>;

  addSecretInfoReply: (secret_info_id: number | string, content: string) => Promise<void>;
  addSecretInfoRate: (secret_info_id: number | string, rate: boolean) => Promise<void>;
  removeSecretInfoRate: (secret_info_id: number | string) => Promise<void>;
  changeSecretInfoRate: (secret_info_id: number | string) => Promise<void>;

  addAccountOpinion: (account_address: string, content: string, rate: boolean) => Promise<void>
  getAccountOpinionsByAddress: (account_address: string) => Promise<AccountOpinion[]>
}

export enum PASSING_SECRET_INFO_TYPES {
  SECRET_INFO = 'SecretInfo',
  SECRET_INFO_ACCESSED = 'SecretInfoAccessed',
}
export type PassingSecretInfoTypes = `${PASSING_SECRET_INFO_TYPES}`;
