import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { passingSecretInfoSliceInitialState } from './initial-state';
import { fetchSecretInfos, fetchSecretInfosAccessed } from './thunks';
import { SecretInfo } from '../types';
import { ResponseStatus } from 'utils/types/api';

const PassingSecretInfoSlice = createSlice({
  name: 'smart-contracts',
  initialState: passingSecretInfoSliceInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSecretInfos.pending, (state, action) => {
      state.status = ResponseStatus.PENDING;
    });

    builder.addCase(fetchSecretInfos.fulfilled, (state, action) => {
      state.secretInfos = action.payload;
      state.status = ResponseStatus.SUCCEEDED;
    });

    builder.addCase(fetchSecretInfos.rejected, (state, action) => {
      state.status = ResponseStatus.FAILED;
      state.error = 'Failed with fetching data';
    });

    builder.addCase(fetchSecretInfosAccessed.pending, (state, action) => {});

    builder.addCase(fetchSecretInfosAccessed.fulfilled, (state, action) => {});

    builder.addCase(fetchSecretInfosAccessed.rejected, (state, action) => {});
  },
});

// export const { setAccount } = PassingSecretInfoSlice.actions;
export const getSecretInfos = (state: RootState) => state.secretInfos.secretInfos;
export const getSecretInfosStatus = (state: RootState) => state.secretInfos.status;
export const getSecretInfosError = (state: RootState) => state.secretInfos.status;

export default PassingSecretInfoSlice.reducer;
