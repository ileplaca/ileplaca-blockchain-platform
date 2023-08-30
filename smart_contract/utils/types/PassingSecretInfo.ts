import { BigNumber } from 'ethers';
import { Address } from 'hardhat-deploy/dist/types';

export interface Reply {
  id: number;
  owner_address: string;
  content: string;
  created_at: number;
}

export interface Rate {
  id: number;
  owner_address: string;
  rate: boolean;
}

export interface SecretInfo {
  id: number;
  owner_address: Address;
  amount: number | BigNumber;
  title: string;
  description: string;
  created_at: number;
  max_uses: number;
  current_uses: number;
  replies: Reply[];
  rates: Rate[];
  zero_knowledge_proof: string;
}


export interface SecretInfoAccessedResponse {
  secret_info: SecretInfo;
  content: string;
}

export interface AccountOpinion {
  owner_address: string;
  account_address: string;
  created_at: number;
  content: string;
  rate: boolean;
}

export interface PassingSecretInfo {
  getSecretInfos: () => Promise<SecretInfo[]>;
  getSecretInfoAccessedById: (secret_info_id: number) => Promise<SecretInfoAccessedResponse>;

  addSecretInfo: (
    amount: number | BigNumber,
    title: string,
    description: string,
    zero_knowledge_proof: string,
    max_uses: number,
    info: string
  ) => Promise<void>;
  payForSecretInfoAccess: (secret_info_id: number | string, ...args: any) => Promise<void>;

  addSecretInfoReply: (secret_info_id: number, content: string) => Promise<void>;
  addSecretInfoRate: (secret_info_id: number, rate: boolean) => Promise<void>;
  removeSecretInfoRate: (secret_info_id: number) => Promise<void>;
  changeSecretInfoRate: (secret_info_id: number) => Promise<void>;

  addAccountOpinion: (account_address: string, content: string, rate: boolean) => Promise<void>;
  getAccountOpinionsByAddress: (account_address: string) => Promise<AccountOpinion[]>;

  deployed: () => Promise<void>;
  connect: (address: any) => Promise<PassingSecretInfo>;
  receive: ({ value }: { value: number | BigNumber }) => Promise<PassingSecretInfo>;
}
