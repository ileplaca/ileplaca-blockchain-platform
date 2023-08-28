import { BigNumberish, ethers } from 'ethers';
import { ethereum } from 'smart-contracts';
import { passingSecretInfoAbi, passingSecretInfoAddress } from '.';
import { PassingSecretInfo } from './types';
import Cookies from 'js-cookie';

export const createEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  const passingSecretInfoContract = new ethers.Contract(
    passingSecretInfoAddress,
    passingSecretInfoAbi,
    signer
  );

  return passingSecretInfoContract as unknown as PassingSecretInfo;
};

class PassingSecretInfoClass {
  public async getSecretInfos() {
    const contract = await createEthereumContract();
    return await contract.getSecretInfos();
  }

  public async getSecretInfosAccessed() {
    const contract = await createEthereumContract();
    return await contract.getSecretInfosAccessed();
  }

  public async addSecretInfo(
    amount: number | BigNumberish,
    title: string,
    description: string,
    max_uses: number,
    info: string,
    zero_knowledge_proof: string
  ) {
    const contract = await createEthereumContract();
    return await contract.addSecretInfo(amount, title, description, max_uses, info, zero_knowledge_proof);
  }

  public async payForSecretInfoAccess(
    secret_info_id: number | string,
    { value }: { value: BigNumberish }
  ) {
    const contract = await createEthereumContract();
    return await contract.payForSecretInfoAccess(secret_info_id, { value });
  }

  public async addSecretInfoReply(secret_info_id: number | string, content: string) {
    const contract = await createEthereumContract();
    return await contract.addSecretInfoReply(secret_info_id, content);
  }

  public async addSecretInfoRate(secret_info_id: number | string, rate: boolean) {
    const contract = await createEthereumContract();
    return await contract.addSecretInfoRate(secret_info_id, rate);
  }

  public async removeSecretInfoRate(secret_info_id: number | string) {
    const contract = await createEthereumContract();
    return await contract.removeSecretInfoRate(secret_info_id);
  }

  public async changeSecretInfoRate(secret_info_id: number | string) {
    const contract = await createEthereumContract();
    return await contract.changeSecretInfoRate(secret_info_id);
  }

  public async getBalance() {
    await ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(ethereum);
    return await provider.getBalance(Cookies.get('account') as string);
  }

  public async addAccountOpinion (account_address: string, content: string, rate: boolean) {
    const contract = await createEthereumContract();
    return contract.addAccountOpinion(account_address, content, rate)
  }

  public async getAccountOpinionsByAddress (account_address: string) {
    const contract = await createEthereumContract();
    return contract.getAccountOpinionsByAddress(account_address)
  }
}

export const passingSecretInfoContract = new PassingSecretInfoClass();
