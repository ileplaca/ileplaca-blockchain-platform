import { ResponseStatusType } from 'utils/types/api';
import { SecretInfo } from '../types';

export interface PassingSecretInfoSliceInitialState {
  manipulatedSecretInfos: SecretInfo[];
  secretInfos: SecretInfo[];
  accessedIds: number[];
  status: ResponseStatusType;
  error: string | null;
}

export const passingSecretInfoSliceInitialState: PassingSecretInfoSliceInitialState = {
  manipulatedSecretInfos: [],
  secretInfos: [],
  accessedIds: [],
  status: 'pending',
  error: null,
};
