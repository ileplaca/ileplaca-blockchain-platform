import { assert } from 'chai';
import hre, { ethers } from 'hardhat';
import { SMART_CONTRACTS } from '../utils/types/SmartContracts';
import '@nomiclabs/hardhat-ethers';
import { CompaniesSalaries } from '../utils/types/CompaniesSalaries';

describe(SMART_CONTRACTS.COMPANIES_SALARIES, () => {
  let companiesSalaries: CompaniesSalaries;
  let deployer: any;

  beforeEach(async () => {
    deployer = (await hre.getNamedAccounts()).deployer;
    const companiesSalariesContract = await ethers.getContractFactory(SMART_CONTRACTS.COMPANIES_SALARIES);
    companiesSalaries = (await companiesSalariesContract.deploy()) as unknown as CompaniesSalaries;
    await companiesSalaries.deployed();
  });

  describe('salaries', () => {
    it('get and add salaries', async () => {
      await companiesSalaries.addSalary(5000, 10000, 50, 0, "Samsung filia Warszawa", "Junior backend developer Golang", "1 year Junior", "Generalnie wszystko spoko ok nawet polecam serdecznie, ale nie ma juz etatow.", "Warszawa", "B2B", "Zdalnie");
      const salaries = await companiesSalaries.getSalaries();
      assert.equal(salaries[0].last, Number(10000));
    });
  });
});
