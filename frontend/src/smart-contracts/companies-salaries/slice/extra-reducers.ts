import { ResponseStatus } from 'utils/types/api';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CompaniesSalariesSliceInitialState } from './initial-state';
import { fetchCompaniesSalaries } from './thunks';

export const companiesSalariesExtraReducers = (
  builder: ActionReducerMapBuilder<CompaniesSalariesSliceInitialState>
) => {
  builder.addCase(fetchCompaniesSalaries.pending, (state, action) => {
    state.status = ResponseStatus.PENDING;
  });

  builder.addCase(fetchCompaniesSalaries.fulfilled, (state, action) => {
    state.manipulatedCompaniesSalaries = [...action.payload].sort(
      (a, b) => Number(b[0]) - Number(a[0])
    );
    state.companiesSalaries = [...state.manipulatedCompaniesSalaries];
    state.status = ResponseStatus.SUCCEEDED;
  });

  builder.addCase(fetchCompaniesSalaries.rejected, (state, action) => {
    state.status = ResponseStatus.FAILED;
    state.error = 'Data fetch failed. Check if you have a connected wallet';
  });
};
