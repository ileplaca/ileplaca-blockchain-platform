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

  describe("reply", () => {
    it("Add reply to secret info", async () => {
      await companiesSalaries.addSalary(4000, 3000, 10, 300, "Frontend developer", "1 year","Test salary", 1, "idk");


      await companiesSalaries.addSalaryReply(0, "content");
      const secret_info = await companiesSalaries.getSalaryById(0);
      assert.equal(secret_info.replies[0].content, "content");
    })
  })

  describe("rate", () => {
    it("Add positive rate to secret info", async () => {
      await companiesSalaries.addSalary(4000, 3000, 10, 300, "Frontend developer", "1 year","Test salary", 1, "idk");


      await companiesSalaries.addSalaryRate(0, true);
      const secret_info = await companiesSalaries.getSalaryById(0);
      assert.equal(secret_info.rates[0].rate, true);
    })

    it("Add negative rate to secret info", async () => {
      await companiesSalaries.addSalary(4000, 3000, 10, 300, "Frontend developer", "1 year","Test salary", 1, "idk");


      await companiesSalaries.addSalaryRate(0, false);
      const secret_info = await companiesSalaries.getSalaryById(0);
      assert.equal(secret_info.rates[0].rate, false);
    })

    it("Add 2 rates from different accounts to secret info", async () => {
      await companiesSalaries.addSalary(4000, 3000, 10, 300, "Frontend developer", "1 year","Test salary", 1, "idk");

      await companiesSalaries.addSalaryRate(0, true);

      const accounts = await ethers.getSigners();
      const secondAccount = accounts[1];

      const secondAccountContract = await companiesSalaries.connect(secondAccount);
      secondAccountContract.addSalaryRate(0, false)

      const secret_info = await secondAccountContract.getSalaryById(0);
      assert.equal(secret_info.rates.length, 2);
    })

    it("Fail Add 2 rates from same account to secret info", async () => {
      await companiesSalaries.addSalary(4000, 3000, 10, 300, "Frontend developer", "1 year","Test salary", 1, "idk");

      await companiesSalaries.addSalaryRate(0, true);
      expect(companiesSalaries.addSalaryRate(0, true)).to.be.revertedWith("You already rate this info")
    })

    it("Remove rate from secret info", async () => {
      await companiesSalaries.addSalary(4000, 3000, 10, 300, "Frontend developer", "1 year","Test salary", 1, "idk");

      await companiesSalaries.addSalaryRate(0, true);
      await companiesSalaries.removeSalaryRate(0);
      const secret_info = await companiesSalaries.getSalaryById(0);
      assert.equal(secret_info.rates.length, 0);
    })

    it("Fail Remove rate from secret info", async () => {
      await companiesSalaries.addSalary(4000, 3000, 10, 300, "Frontend developer", "1 year","Test salary", 1, "idk");


      expect(companiesSalaries.removeSalaryRate(0)).to.be.revertedWith("You don't have any rate")
    })

    it("Change already exists rate from secret info", async () => {
      await companiesSalaries.addSalary(4000, 3000, 10, 300, "Frontend developer", "1 year","Test salary", 1, "idk");


      await companiesSalaries.addSalaryRate(0, true);
      await companiesSalaries.changeSalaryRate(0);
      const secret_info = await companiesSalaries.getSalaryById(0);
      assert.equal(secret_info.rates[0].rate, false)
    })

    it("Fail Change already exists rate from secret info", async () => {
      await companiesSalaries.addSalary(4000, 3000, 10, 300, "Frontend developer", "1 year","Test salary", 1, "idk");


      expect(companiesSalaries.changeSalaryRate(0)).to.be.revertedWith("You don't have any rate")
    })
  })

})