import { PayloadAction } from '@reduxjs/toolkit';
import { PassingSecretInfoSliceInitialState } from './initial-state';
import { SecretInfo, SecretInfoAccessedResponse } from '../types';

export const passingSecretInfoReducers = {
  setManipulatedSecretInfos: (
    state: PassingSecretInfoSliceInitialState,
    action: PayloadAction<SecretInfo[]>
  ) => {
    state.manipulatedSecretInfos = action.payload;
  },
  setManipulatedSecretInfosAccessed: (
    state: PassingSecretInfoSliceInitialState,
    action: PayloadAction<SecretInfoAccessedResponse[]>
  ) => {
    state.manipulatedSecretInfosAccessed = action.payload;
  },
};
