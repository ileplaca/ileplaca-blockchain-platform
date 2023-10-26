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
    it.only('get and add salaries', async () => {
      await companiesSalaries.addSalary({
        company_id: 1,
        company_name: 'asdfdsaf',
        employment_type: 'sdfsafasdf',
        experience: 1231,
        first: 123123,
        last: 123123,
        experience_in_company: 12,
        location: 'asdfsdaf',
        operating_mode: 'asdfasdfasdf',
        opinion: 'asdfsafasdf',
        role: 'asdfdasfdasf',
        salary_currency: 'PLN',
        speed_of_growth: 123
      });
      const salaries = await companiesSalaries.getSalaries();
      assert.equal(salaries[0].last, Number(123123));
    });
  });
});
