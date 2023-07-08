import { ethers } from 'ethers';
import { ethereum } from 'smart-contracts';
import { companiesSalariesAbi, companiesSalariesAddress } from '.';
import { CompaniesSalaries } from './types';
import { ResponseContractEnum } from 'utils/types/api';

const createEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  const companiesSalariesContract = new ethers.Contract(
    companiesSalariesAddress,
    companiesSalariesAbi,
    signer
  );
  return companiesSalariesContract as unknown as CompaniesSalaries;
};

export const companiesSalariesContract: CompaniesSalaries = {
  async addSalary(
    current,
    first,
    speed_of_growth,
    raise_change,
    role,
    experience,
    opinion,
    company_id,
    company_name
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
        company_id,
        company_name
      );

      return ResponseContractEnum.SUCCESS;
    } catch (err) {
      console.log(err);
      return ResponseContractEnum.FAILED;
    }
  },

  async getSalaries() {
    const contract = await createEthereumContract();
    return await contract.getSalaries();
  },

  async getSalaryById(salary_id: number) {
    const contract = await createEthereumContract();
    return await contract.getSalaryById(salary_id);
  },

  async getSalariesByCompanyId(company_id) {
    const contract = await createEthereumContract();
    return await contract.getSalariesByCompanyId(company_id);
  },

  async addSalaryReply(salary_id, content) {
    const contract = await createEthereumContract();
    return await contract.addSalaryReply(salary_id, content);
  },

  async addSalaryRate(salary_id, rate) {
    const contract = await createEthereumContract();
    return await contract.addSalaryRate(salary_id, rate);
  },

  async removeSalaryRate(salary_id) {
    const contract = await createEthereumContract();
    return await contract.removeSalaryRate(salary_id);
  },

  async changeSalaryRate(salary_id) {
    const contract = await createEthereumContract();
    return await contract.changeSalaryRate(salary_id);
  },
};
