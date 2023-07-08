import { BigNumberish, ethers } from 'ethers';
import { ethereum } from 'smart-contracts';
import { passingSecretInfoAbi, passingSecretInfoAddress } from '.';
import { PassingSecretInfo } from './types';

export const createEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  const companiesSalariesContract = new ethers.Contract(
    passingSecretInfoAddress,
    passingSecretInfoAbi,
    signer
  );

  return companiesSalariesContract as unknown as PassingSecretInfo;
};

class PassingSecretInfoClass {
  public async getSecretInfos() {
    const contract = await createEthereumContract();
    return await contract.getSecretInfos();
  }

  public async getSecretInfoById(secret_info_id: number | string) {
    const contract = await createEthereumContract();
    return await contract.getSecretInfoById(secret_info_id);
  }

  public async getSecretInfoAccessedById(secret_info_id: number | string) {
    const contract = await createEthereumContract();
    return await contract.getSecretInfoAccessedById(secret_info_id);
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
    info: string
  ) {
    const contract = await createEthereumContract();
    return await contract.addSecretInfo(amount, title, description, max_uses, info);
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
}

export const passingSecretInfoContract = new PassingSecretInfoClass();
