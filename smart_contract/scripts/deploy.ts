import { ethers } from "hardhat";
import { SMART_CONTRACTS } from "../utils/types/SmartContracts";

async function main() {
  const PassingSecretInfo = await ethers.getContractFactory(SMART_CONTRACTS.PASSING_SECRET_INFO);
  const passingSecretInfo = await PassingSecretInfo.deploy()

  await passingSecretInfo.deployed();

  console.log(
    `ETH and unlock timestamp deployed to ${passingSecretInfo.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
