import { ethers } from 'hardhat';
import { SMART_CONTRACTS } from '../utils/types/SmartContracts';

async function main() {
  // const PassingSecretInfo = await ethers.getContractFactory(SMART_CONTRACTS.PASSING_SECRET_INFO);
  // const passingSecretInfo = await PassingSecretInfo.deploy();

  const CompaniesSalaries = await ethers.getContractFactory(SMART_CONTRACTS.COMPANIES_SALARIES);
  const companiesSalaries = await CompaniesSalaries.deploy();

  // await passingSecretInfo.deployed();
  await companiesSalaries.deployed();

  // console.log(`Address passing secret info ${passingSecretInfo.address}`);
  console.log(`Address companies salaries ${companiesSalaries.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
