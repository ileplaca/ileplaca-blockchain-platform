import {
  PASSING_SECRET_INFO_TYPES,
  PassingSecretInfoTypes,
  SecretInfo,
  SecretInfoAccessedResponse,
} from 'smart-contracts/passing-secret-info/types';
import { convertEthGweiWei } from './convert';

export const searchBySingleWord = (a: string, b: string) => {
  return a
    .toLocaleLowerCase()
    .split(' ')
    .some((word) =>
      b
        .toLocaleLowerCase()
        .split(' ')
        .some((secondWord) => word.includes(secondWord))
    );
};

export const searchAndPushSecretInfos = (
  secretInfos: SecretInfo[] | SecretInfoAccessedResponse[],
  searchedSecretInfos: SecretInfo[] | SecretInfoAccessedResponse[],
  secretInfo: SecretInfo,
  value: string,
  type: PassingSecretInfoTypes,
  index: number
) => {
  const [secret_info_id, owner_address, amount, title, description] = secretInfo;

  if (
    owner_address.toLocaleLowerCase().includes(value) ||
    searchBySingleWord(convertEthGweiWei(amount), value) ||
    searchBySingleWord(title, value) ||
    searchBySingleWord(description, value)
  ) {
    if (type === PASSING_SECRET_INFO_TYPES.SECRET_INFO) {
      searchedSecretInfos.push(secretInfos[index] as any);
    }
    if (type === PASSING_SECRET_INFO_TYPES.SECRET_INFO_ACCESSED) {
      searchedSecretInfos.push(secretInfos[index] as any);
    }
  }
};
