import { assert, expect } from 'chai';
import hre, { ethers } from 'hardhat'
import { SMART_CONTRACTS } from '../utils/types/SmartContracts';
import '@nomiclabs/hardhat-ethers'
import { utils } from 'ethers';
import { CompaniesSalaries } from '../utils/types/CompaniesSalaries';

describe(SMART_CONTRACTS.COMPANIES_SALARIES, () => {
  let companiesSalaries: CompaniesSalaries;
  let deployer: any;

  beforeEach(async () => {
    deployer = (await hre.getNamedAccounts()).deployer;
    const companiesSalariesContract = await ethers.getContractFactory(SMART_CONTRACTS.COMPANIES_SALARIES);
    companiesSalaries = await companiesSalariesContract.deploy() as unknown as CompaniesSalaries;
    await companiesSalaries.deployed()
  })

  describe('salaries',  () => {
    it('get and add salaries', async () => {
      await companiesSalaries.addSalary(4000, 3000, 10, 300, "Frontend developer", "1 year","Test salary", 1, "idk");
      const salaries = await companiesSalaries.getSalaries();
      assert.equal(salaries[0].current, 4000);
    })

    it('get salaries by company id', async () => {
      await companiesSalaries.addSalary(4000, 3000, 10, 300, "Frontend developer", "1 year","Test salary", 1, "idk");
      await companiesSalaries.addSalary(4000, 3000, 10, 300, "Frontend developer", "1 year","Test salary", 1, "idk");
      const salaries = await companiesSalaries.getSalariesByCompanyId(1);
      assert.equal(salaries.length, 2);
    })

    it('get salaries by company id without salaries', async () => {
      const salaries = await companiesSalaries.getSalariesByCompanyId(1);
      assert.equal(salaries.length, 0);
    })
  })
})