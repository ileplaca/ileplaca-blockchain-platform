import { assert, expect } from 'chai';
import hre, { ethers } from 'hardhat'
import { PassingSecretInfo } from '../utils/types/PassingSecretInfo';
import { SMART_CONTRACTS } from '../utils/types/SmartContracts';
import '@nomiclabs/hardhat-ethers'
import { BigNumber, utils } from 'ethers';

describe(SMART_CONTRACTS.PASSING_SECRET_INFO, () => {
  let passingSecretInfo: PassingSecretInfo;
  let deployer: any;

  beforeEach(async () => {
    deployer = (await hre.getNamedAccounts()).deployer;
    const passingSecretInfoContract = await ethers.getContractFactory(SMART_CONTRACTS.PASSING_SECRET_INFO);
    passingSecretInfo = await passingSecretInfoContract.deploy() as unknown as PassingSecretInfo;
    await passingSecretInfo.deployed()
  })

  describe("secret info", () => {
    it("addSecretInfo", async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        'Test secret info company name',
        'Test secret info info',
      )

      const secretInfos = await passingSecretInfo.getSecretInfos();
      assert.equal(secretInfos[0].amount, Number(utils.parseEther('0.1')))
    })

    it('getSecretInfoByCompanyName', async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        'companyname',
        'Test secret info info',
      )

      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        'companyname',
        'Test secret info info',
      )

      assert.equal((await passingSecretInfo.getSecretInfosByCompanyName('companyname')).length, 2)
    })
  })

  describe("secret info accessed", () => {
    it("get secret info with secret info accessed as owner" , async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        'Test secret info company name',
        'Test secret info info',
      )
      const secretInfoAccessed = await passingSecretInfo.getSecretInfoAccessed(0);
      assert.equal(secretInfoAccessed.secret_info.amount, Number(utils.parseEther('0.1')))
    })


    it("fail get secret info with secret info accessed as other address without pay" , async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        'Test secret info company name',
        'Test secret info info',
      )

      const accounts = await ethers.getSigners();
      const account = await accounts[1].getAddress();
      expect(
        (await passingSecretInfo.connect(account)).getSecretInfoAccessed(0)
      ).to.be.revertedWith("You don't have access to this info. You have to pay owner of info.");
    })

    it("get paid secret info access as owner" , async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        'Test secret info company name',
        'Test secret info info',
      )
      const secretInfoAccessed = await passingSecretInfo.getPaidSecretInfosAccessed();
      assert.equal(secretInfoAccessed[0].secret_info.amount, Number(utils.parseEther('0.1')))
    })


    it("get paid secret info access as user" , async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        'Test secret info company name',
        'Test secret info info',
      )
      const accounts = await ethers.getSigners();
      const secondAccount = accounts[1];

      const secondAccountContract = await passingSecretInfo.connect(secondAccount);
      await secondAccountContract.payForSecretInfoAccess(0, { value: utils.parseEther('0.1') })
      const secretInfoAccessed = await passingSecretInfo.getPaidSecretInfosAccessed();
      assert.equal(secretInfoAccessed[0].secret_info.amount, Number(utils.parseEther('0.1')))
    })
  })

  describe("payForSecretInfoAccess", () => {
    it("get secret info after paid with valid amount for secret info accessed as other user" , async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        'Test secret info company name',
        'Test secret info info',
      )

      const accounts = await ethers.getSigners();
      const secondAccount = accounts[1];

      const secondAccountContract = await passingSecretInfo.connect(secondAccount);
      await secondAccountContract.payForSecretInfoAccess(0, { value: utils.parseEther('0.1') })

      const secretInfoAccessed = await secondAccountContract.getSecretInfoAccessed(0);
      assert.equal(secretInfoAccessed.secret_info.amount, Number(utils.parseEther('0.1')))
    })

    it("fail get secret info after paid with valid amount for secret info accessed as other user" , async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        'Test secret info company name',
        'Test secret info info',
      )

      const accounts = await ethers.getSigners();
      const secondAccount = accounts[1];

      const secondAccountContract = await passingSecretInfo.connect(secondAccount);
      expect(
        secondAccountContract.payForSecretInfoAccess(0, { value: utils.parseEther('0.01') })
      ).to.be.revertedWith("Wrong ETH (WEI) value");
    })

    it("fail get secret info after paid two times with valid amount for secret info accessed as other user" , async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        'Test secret info company name',
        'Test secret info info',
      )

      const accounts = await ethers.getSigners();
      const secondAccount = accounts[1];

      const secondAccountContract = await passingSecretInfo.connect(secondAccount);
      await secondAccountContract.payForSecretInfoAccess(0, { value: utils.parseEther('0.1') })
      expect(
       secondAccountContract.payForSecretInfoAccess(0, { value: utils.parseEther('0.1') })
      ).to.be.revertedWith("You already paid for this info");
    })
  })
})