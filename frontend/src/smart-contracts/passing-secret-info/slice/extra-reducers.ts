import { fetchSecretInfos, fetchSecretInfosAccessed } from './thunks';
import { SecretInfo } from '../types';
import { ResponseStatus } from 'utils/types/api';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { PassingSecretInfoSliceInitialState } from './initial-state';

export const passingSecretInfoExtraReducers = (
  builder: ActionReducerMapBuilder<PassingSecretInfoSliceInitialState>
) => {
  builder.addCase(fetchSecretInfos.pending, (state, action) => {
    state.status = ResponseStatus.PENDING;
  });

  builder.addCase(fetchSecretInfos.fulfilled, (state, action) => {
    state.manipulatedSecretInfos = [...action.payload].sort((a, b) => Number(b[0]) - Number(a[0]));
    state.secretInfos = [...action.payload].sort((a, b) => Number(b[0]) - Number(a[0]));
    state.status = ResponseStatus.SUCCEEDED;
  });

  builder.addCase(fetchSecretInfos.rejected, (state, action) => {
    state.status = ResponseStatus.FAILED;
    state.error = 'Data fetch failed. Check if you have a connected wallet';
  });

  builder.addCase(fetchSecretInfosAccessed.pending, (state, action) => {
    state.status = ResponseStatus.PENDING;
  });

  builder.addCase(fetchSecretInfosAccessed.fulfilled, (state, action) => {
    state.manipulatedSecretInfosAccessed = [...action.payload].sort(
      ([AsecretInfo], [BsecretInfo]) => Number(BsecretInfo[0]) - Number(AsecretInfo[0])
    );
    state.secretInfosAccessed = [...action.payload].sort(
      ([AsecretInfo], [BsecretInfo]) => Number(BsecretInfo[0]) - Number(AsecretInfo[0])
    );
    state.status = ResponseStatus.SUCCEEDED;
  });

  builder.addCase(fetchSecretInfosAccessed.rejected, (state, action) => {
    state.status = ResponseStatus.FAILED;
    state.error = 'Data fetch failed. Check if you have a connected wallet';
  });
};
