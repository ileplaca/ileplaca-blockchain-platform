import { createAsyncThunk } from '@reduxjs/toolkit';
import { passingSecretInfoContract } from '../actions';

export const fetchSecretInfos = createAsyncThunk('secret-infos', async () => {
  return await passingSecretInfoContract.getSecretInfos();
});

export const fetchSecretInfosAccessed = createAsyncThunk('secret-infos-accsesed', async () => {
  return await passingSecretInfoContract.getSecretInfosAccessed();
});
