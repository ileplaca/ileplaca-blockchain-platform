import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { companiesSalariesSliceInitialState } from './initial-state';
import { companiesSalariesReducers } from './reducers';
import { companiesSalariesExtraReducers } from './extra-reducers';

const CompaniesSalariesSlice = createSlice({
  name: 'companies-salaries',
  initialState: companiesSalariesSliceInitialState,
  reducers: companiesSalariesReducers,
  extraReducers: companiesSalariesExtraReducers,
});

export const { setManipulatedSecretInfos } = CompaniesSalariesSlice.actions;

export const getCompaniesSalaries = (state: RootState) => state.companiesSalaries.companiesSalaries;
export const getManipulatedCompaniesSalaries = (state: RootState) =>
  state.companiesSalaries.manipulatedCompaniesSalaries;
export const getCompaniesSalariesStatus = (state: RootState) => state.companiesSalaries.status;
export const getCompaniesSalariesError = (state: RootState) => state.companiesSalaries.error;

export default CompaniesSalariesSlice.reducer;
