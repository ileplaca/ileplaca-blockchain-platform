import { ethers } from 'ethers';
import { ethereum } from 'smart-contracts';
import { companiesSalariesAbi, companiesSalariesAddress } from '.';
import { CompaniesSalaries, Salary, SalaryDto } from './types';
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
  async addSalary(salary: SalaryDto) {
    const companiesSalariesContract = await createEthereumContract();
    return await companiesSalariesContract.addSalary(salary);
  },

  async getSalaries() {
    const contract = await createEthereumContract();
    return await contract.getSalaries();
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
