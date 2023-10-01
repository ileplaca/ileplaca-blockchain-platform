import { PayloadAction } from '@reduxjs/toolkit';
import { Salary } from '../types';
import { CompaniesSalariesSliceInitialState } from './initial-state';

export const companiesSalariesReducers = {
  setManipulatedSecretInfos: (
    state: CompaniesSalariesSliceInitialState,
    action: PayloadAction<Salary[]>
  ) => {
    state.companiesSalaries = action.payload;
  },
};
