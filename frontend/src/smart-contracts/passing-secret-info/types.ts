import { BigNumberish } from 'ethers';
import { Rate, Reply } from 'smart-contracts/types';

export type SecretInfo = [
  id: number,
  owner_address: string,
  amount: number | BigNumberish,
  title: string,
  description: string,
  zero_knowledge_proof: string,
  max_uses: number,
  current_uses: number,
  created_at: number,
  replies: Reply[],
  rates: Rate[]
];

export type SecretInfoAccessedResponse = [secret_info: SecretInfo, content: string];

export type AccountOpinion = [
  owner_address: string,
  account_address: string,
  content: string,
  created_at: number,
  rate: boolean
];

export interface PassingSecretInfo {
  getSecretInfos: () => Promise<SecretInfo[]>;
  getSecretInfoAccessedById: (
    secret_info_id: number | bigint
  ) => Promise<SecretInfoAccessedResponse>;
  getAccessedIds: () => Promise<number[]>;

  addSecretInfo: (
    amount: number | BigNumberish,
    title: string,
    description: string,
    zero_knowledge_proof: string,
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

  addAccountOpinion: (account_address: string, content: string, rate: boolean) => Promise<void>;
  getAccountOpinionsByAddress: (account_address: string) => Promise<AccountOpinion[]>;
}