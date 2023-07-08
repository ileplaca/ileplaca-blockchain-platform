import { ResponseStatusType } from 'utils/types/api';
import { SecretInfo, SecretInfoAccessed } from '../types';

export interface PassingSecretInfoSliceInitialState {
  secretInfos: SecretInfo[];
  secretInfosAccessed: SecretInfoAccessed[];
  status: ResponseStatusType;
  error: string | null;
}

export const passingSecretInfoSliceInitialState: PassingSecretInfoSliceInitialState = {
  secretInfos: [],
  secretInfosAccessed: [],
  status: 'pending',
  error: null,
};
