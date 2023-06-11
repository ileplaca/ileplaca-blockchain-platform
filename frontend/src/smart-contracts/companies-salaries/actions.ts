import { ethers } from "ethers";
import { ethereum } from "smart-contracts";
import { companiesSalariesAbi, companiesSalariesAddress } from ".";
import { CompaniesSalaries } from "./types";
import { ResponseContractEnum } from "utils/types/api";

const createEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  const companiesSalariesContract = new ethers.Contract(companiesSalariesAddress, companiesSalariesAbi, signer)
  return companiesSalariesContract as unknown as CompaniesSalaries
}

export const companiesSalariesContract: CompaniesSalaries = {
  async addSalary (
    current,
    first,
    speed_of_growth,
    raise_change,
    role,
    experience,
    opinion,
    company_id
  ) {
    try {
      const companiesSalariesContract = await createEthereumContract();
      await companiesSalariesContract.addSalary(
        current,
        first,
        speed_of_growth,
        raise_change,
        role,
        experience,
        opinion,
        company_id
      )

      return ResponseContractEnum.SUCCESS
    } catch (err) {
      console.log(err)
      return ResponseContractEnum.FAILED
    }
  },

  async getSalaries() {
    const contract = await createEthereumContract();
    return await contract.getSalaries();
  },

  async getSalariesByCompanyId(company_id) {
    const contract = await createEthereumContract();
    return await contract.getSalariesByCompanyId(company_id);
  },
}