import { fetchAccessedIds, fetchSecretInfos } from './thunks';
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
    state.secretInfos = [...state.manipulatedSecretInfos];
    state.status = ResponseStatus.SUCCEEDED;
  });

  builder.addCase(fetchSecretInfos.rejected, (state, action) => {
    state.status = ResponseStatus.FAILED;
    state.error = 'Data fetch failed. Check if you have a connected wallet';
  });

  builder.addCase(fetchAccessedIds.pending, (state, action) => {
    state.status = ResponseStatus.PENDING;
  });

  builder.addCase(fetchAccessedIds.fulfilled, (state, action) => {
    state.accessedIds = action.payload;
    state.status = ResponseStatus.SUCCEEDED;
  });

  builder.addCase(fetchAccessedIds.rejected, (state, action) => {
    state.status = ResponseStatus.FAILED;
    state.error = 'Data fetch failed. Check if you have a connected wallet';
  });
};
