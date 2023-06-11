import { ethers } from "ethers";
import { ethereum } from "smart-contracts";
import { passingSecretInfoAbi, passingSecretInfoAddress } from ".";
import { PassingSecretInfoContract } from "./types";

const createEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  const companiesSalariesContract = new ethers.Contract(passingSecretInfoAddress, passingSecretInfoAbi, signer)

  return companiesSalariesContract as unknown as PassingSecretInfoContract
}

export const passingSecretInfoContract = {
  async getSecretInfos () {
    const contract = await createEthereumContract();
    return await contract.getSecretInfos();
  }
}