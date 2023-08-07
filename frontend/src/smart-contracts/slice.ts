import { createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { RootState } from 'redux/store';
import { ethereum } from 'smart-contracts';

const SmartContractsSlice = createSlice({
  name: 'smart-contracts',
  initialState: {
    account: '',
  },
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
    },
  },
});

export const { setAccount } = SmartContractsSlice.actions;
export const getAccount = (state: RootState) => state.smartContracts.account;

export default SmartContractsSlice.reducer;
