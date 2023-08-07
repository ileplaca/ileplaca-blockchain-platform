import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { passingSecretInfoSliceInitialState } from './initial-state';
import { passingSecretInfoExtraReducers } from './extra-reducers';
import { passingSecretInfoReducers } from './reducers';

const PassingSecretInfoSlice = createSlice({
  name: 'smart-contracts',
  initialState: passingSecretInfoSliceInitialState,
  reducers: passingSecretInfoReducers,
  extraReducers: passingSecretInfoExtraReducers,
});

export const { setManipulatedSecretInfos, setManipulatedSecretInfosAccessed } =
  PassingSecretInfoSlice.actions;

export const getSecretInfos = (state: RootState) => state.secretInfos.secretInfos;
export const getManipulatedSecretInfos = (state: RootState) =>
  state.secretInfos.manipulatedSecretInfos;
export const getSecretInfosAccessed = (state: RootState) => state.secretInfos.secretInfosAccessed;
export const getManipulatedSecretInfosAccessed = (state: RootState) =>
  state.secretInfos.manipulatedSecretInfosAccessed;
export const getSecretInfosStatus = (state: RootState) => state.secretInfos.status;
export const getSecretInfosError = (state: RootState) => state.secretInfos.status;

export default PassingSecretInfoSlice.reducer;
