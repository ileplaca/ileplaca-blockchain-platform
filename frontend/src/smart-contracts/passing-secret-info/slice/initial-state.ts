import { ResponseStatusType } from 'utils/types/api';
import { SecretInfo, SecretInfoAccessedResponse } from '../types';

export interface PassingSecretInfoSliceInitialState {
  manipulatedSecretInfos: SecretInfo[];
  secretInfos: SecretInfo[];
  manipulatedSecretInfosAccessed: SecretInfoAccessedResponse[];
  secretInfosAccessed: SecretInfoAccessedResponse[];
  status: ResponseStatusType;
  error: string | null;
}

export const passingSecretInfoSliceInitialState: PassingSecretInfoSliceInitialState = {
  manipulatedSecretInfos: [],
  secretInfos: [],
  manipulatedSecretInfosAccessed: [],
  secretInfosAccessed: [],
  status: 'pending',
  error: null,
};
