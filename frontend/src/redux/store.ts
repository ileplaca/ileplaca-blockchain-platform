import { configureStore } from "@reduxjs/toolkit";
import SmartContractsReducer from 'smart-contracts/slice'

export const store = configureStore({
  reducer: {
    smartContracts: SmartContractsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;