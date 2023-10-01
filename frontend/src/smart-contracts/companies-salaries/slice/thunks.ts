import { createAsyncThunk } from '@reduxjs/toolkit';
import { companiesSalariesContract } from '../actions';

export const fetchCompaniesSalaries = createAsyncThunk('companies-salaries', async () => {
  return await companiesSalariesContract.getSalaries();
});