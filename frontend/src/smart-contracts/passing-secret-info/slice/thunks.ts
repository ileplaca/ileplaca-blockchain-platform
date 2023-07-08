import { createAsyncThunk } from '@reduxjs/toolkit';
import { passingSecretInfoContract } from '../actions';

export const fetchSecretInfos = createAsyncThunk('secret-infos', async () => {
  const response = await passingSecretInfoContract.getSecretInfos();
  return response;
});

export const fetchSecretInfosAccessed = createAsyncThunk('secret-infos-accsesed', async () => {
  const response = await passingSecretInfoContract.getSecretInfosAccessed();
  return response;
});
