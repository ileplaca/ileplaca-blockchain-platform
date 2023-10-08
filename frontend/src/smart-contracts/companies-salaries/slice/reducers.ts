import { PayloadAction } from '@reduxjs/toolkit';
import { Salary } from '../types';
import { CompaniesSalariesSliceInitialState } from './initial-state';

export const companiesSalariesReducers = {
  setManipulatedCompaniesSalaries: (
    state: CompaniesSalariesSliceInitialState,
    action: PayloadAction<Salary[]>
  ) => {
    state.manipulatedCompaniesSalaries = action.payload;
  },
};
