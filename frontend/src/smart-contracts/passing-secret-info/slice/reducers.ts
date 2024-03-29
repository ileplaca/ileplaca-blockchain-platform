import { PayloadAction } from '@reduxjs/toolkit';
import { PassingSecretInfoSliceInitialState } from './initial-state';
import { SecretInfo } from '../types';

export const passingSecretInfoReducers = {
  setManipulatedSecretInfos: (
    state: PassingSecretInfoSliceInitialState,
    action: PayloadAction<SecretInfo[]>
  ) => {
    state.manipulatedSecretInfos = action.payload;
  },
};
