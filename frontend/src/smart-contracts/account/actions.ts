import { ethers } from "ethers";
import Cookies from "js-cookie";
import { ethereum } from "smart-contracts";
import { CookiesEnum } from "utils/types/cookies";

class AccountActions {
  public async getBalance() {
    await ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(ethereum);
    return await provider.getBalance(Cookies.get(CookiesEnum.ACCOUNT) as string);
  }
}

export const accountActions = new AccountActions();