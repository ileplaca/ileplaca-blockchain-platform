import { configureStore } from '@reduxjs/toolkit';
import SmartContractsReducer from 'smart-contracts/slice';
import SecretInfosReducer from 'smart-contracts/passing-secret-info/slice';

export const store = configureStore({
  reducer: {
    smartContracts: SmartContractsReducer,
    secretInfos: SecretInfosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
