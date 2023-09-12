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

export const { setManipulatedSecretInfos } = PassingSecretInfoSlice.actions;

export const getSecretInfos = (state: RootState) => state.secretInfos.secretInfos;
export const getManipulatedSecretInfos = (state: RootState) =>
  state.secretInfos.manipulatedSecretInfos;
export const getAccessedIds = (state: RootState) => state.secretInfos.accessedIds;
export const getSecretInfosStatus = (state: RootState) => state.secretInfos.status;
export const getSecretInfosError = (state: RootState) => state.secretInfos.error;

export default PassingSecretInfoSlice.reducer;
