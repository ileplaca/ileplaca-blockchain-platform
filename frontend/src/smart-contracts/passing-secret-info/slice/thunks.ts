import { createAsyncThunk } from '@reduxjs/toolkit';
import { passingSecretInfoContract } from '../actions';

export const fetchSecretInfos = createAsyncThunk('secret-infos', async () => {
  return await passingSecretInfoContract.getSecretInfos();
});

export const fetchAccessedIds = createAsyncThunk('accessed-ids', async () => {
  return await passingSecretInfoContract.getAccessedIds();
});
