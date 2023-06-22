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
        3,
        3,
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
        3,
        3,
        'Test secret info info',
      )

      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        'companyname',
        3,
        3,
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
        3,
        3,
        'Test secret info info',
      )
      const secretInfoAccessed = await passingSecretInfo.getSecretInfoAccessedById(0);
      assert.equal(secretInfoAccessed.secret_info.amount, Number(utils.parseEther('0.1')))
    })


    it("fail get secret info with secret info accessed as other address without pay" , async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        'Test secret info company name',
        3,
        3,
        'Test secret info info',
      )

      const accounts = await ethers.getSigners();
      const account = await accounts[1].getAddress();
      expect(
        (await passingSecretInfo.connect(account)).getSecretInfoAccessedById(0)
      ).to.be.revertedWith("You don't have access to this info. You have to pay owner of info.");
    })

    it("get paid secret info access as owner" , async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        'Test secret info company name',
        3,
        3,
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
        3,
        3,
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
        3,
        3,
        'Test secret info info',
      )

      const accounts = await ethers.getSigners();
      const secondAccount = accounts[1];

      const secondAccountContract = await passingSecretInfo.connect(secondAccount);
      await secondAccountContract.payForSecretInfoAccess(0, { value: utils.parseEther('0.1') })

      const secretInfoAccessed = await secondAccountContract.getSecretInfoAccessedById(0);
      assert.equal(secretInfoAccessed.secret_info.amount, Number(utils.parseEther('0.1')))
    })

    it("fail get secret info after paid with valid amount for secret info accessed as other user" , async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        'Test secret info company name',
        3,
        3,
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
        3,
        3,
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

  describe("reply", () => {
    it("Add reply to secret info", async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        'Test secret info company name',
        3,
        3,
        'Test secret info info',
      )

      await passingSecretInfo.addSecretInfoReply(0, "content");
      const secret_info = await passingSecretInfo.getSecretInfoById(0);
      assert.equal(secret_info.replies[0].content, "content");
    })
  })

  describe("rate", () => {
    it("Add positive rate to secret info", async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        'Test secret info company name',
        3,
        3,
        'Test secret info info',
      )

      await passingSecretInfo.addSecretInfoRate(0, true);
      const secret_info = await passingSecretInfo.getSecretInfoById(0);
      assert.equal(secret_info.rates[0].rate, true);
    })

    it("Add negative rate to secret info", async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        'Test secret info company name',
        3,
        3,
        'Test secret info info',
      )

      await passingSecretInfo.addSecretInfoRate(0, false);
      const secret_info = await passingSecretInfo.getSecretInfoById(0);
      assert.equal(secret_info.rates[0].rate, false);
    })

    it("Add 2 rates from different accounts to secret info", async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        'Test secret info company name',
        3,
        3,
        'Test secret info info',
      )
      await passingSecretInfo.addSecretInfoRate(0, true);

      const accounts = await ethers.getSigners();
      const secondAccount = accounts[1];

      const secondAccountContract = await passingSecretInfo.connect(secondAccount);
      secondAccountContract.addSecretInfoRate(0, false)

      const secret_info = await secondAccountContract.getSecretInfoById(0);
      assert.equal(secret_info.rates.length, 2);
    })

    it("Fail Add 2 rates from same account to secret info", async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        'Test secret info company name',
        3,
        3,
        'Test secret info info',
      )
      await passingSecretInfo.addSecretInfoRate(0, true);
      expect(passingSecretInfo.addSecretInfoRate(0, true)).to.be.revertedWith("You already rate this info")
    })

    it("Remove rate from secret info", async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        'Test secret info company name',
        3,
        3,
        'Test secret info info',
      )
      await passingSecretInfo.addSecretInfoRate(0, true);
      await passingSecretInfo.removeSecretInfoRate(0);
      const secret_info = await passingSecretInfo.getSecretInfoById(0);
      assert.equal(secret_info.rates.length, 0);
    })

    it("Fail Remove rate from secret info", async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        'Test secret info company name',
        3,
        3,
        'Test secret info info',
      )

      expect(passingSecretInfo.removeSecretInfoRate(0)).to.be.revertedWith("You don't have any rate")
    })

    it("Change already exists rate from secret info", async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        'Test secret info company name',
        3,
        3,
        'Test secret info info',
      )

      await passingSecretInfo.addSecretInfoRate(0, true);
      await passingSecretInfo.changeSecretInfoRate(0);
      const secret_info = await passingSecretInfo.getSecretInfoById(0);
      assert.equal(secret_info.rates[0].rate, false)
    })

    it("Fail Change already exists rate from secret info", async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        'Test secret info company name',
        3,
        3,
        'Test secret info info',
      )

      expect(passingSecretInfo.changeSecretInfoRate(0)).to.be.revertedWith("You don't have any rate")
    })
  })
})