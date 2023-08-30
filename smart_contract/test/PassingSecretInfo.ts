import { assert, expect } from 'chai';
import hre, { ethers } from 'hardhat';
import { PassingSecretInfo } from '../utils/types/PassingSecretInfo';
import { SMART_CONTRACTS } from '../utils/types/SmartContracts';
import '@nomiclabs/hardhat-ethers';
import { BigNumber, utils } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe(SMART_CONTRACTS.PASSING_SECRET_INFO, () => {
  let passingSecretInfo: PassingSecretInfo;
  let deployer: string;
  let owner: SignerWithAddress;

  beforeEach(async () => {
    deployer = (await hre.getNamedAccounts()).deployer;
    const passingSecretInfoContract = await ethers.getContractFactory(SMART_CONTRACTS.PASSING_SECRET_INFO);
    passingSecretInfo = (await passingSecretInfoContract.deploy()) as unknown as PassingSecretInfo;
    await passingSecretInfo.deployed();
    const accounts = await ethers.getSigners();
    owner = accounts[0];
  });

  describe('secret info', () => {
    it('addSecretInfo', async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        3,
        'Test secret info info',
        'Zero knowledge proof'
      );

      const secretInfos = await passingSecretInfo.getSecretInfos();
      assert.equal(secretInfos[0].amount, Number(utils.parseEther('0.1')));
    });

    it('getSecretInfoByCompanyName', async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        3,
        'Test secret info info',
        'Zero knowledge proof'
      );

      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        3,
        'Test secret info info',
        'Zero knowledge proof'
      );

      assert.equal((await passingSecretInfo.getSecretInfos()).length, 2);
    });
  });

  describe('secret info accessed', () => {
    it('get secret info with secret info accessed as owner', async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        3,
        'Test secret info info',
        'Zero knowledge proof'
      );
      const secretInfoAccessed = await passingSecretInfo.getSecretInfoAccessedById(0);
      console.log("🚀 ~ file: PassingSecretInfo.ts:72 ~ it ~ secretInfoAccessed:", secretInfoAccessed)
      assert.equal(secretInfoAccessed.secret_info.amount, Number(utils.parseEther('0.1')));
    });

    it('get paid secret info access as owner', async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        3,
        'Test secret info info',
        'Zero knowledge proof'
      );
      const secretInfoAccessed = await passingSecretInfo.getSecretInfoAccessedById(0);
      assert.equal(secretInfoAccessed.secret_info.amount, Number(utils.parseEther('0.1')));
    });

    it('get paid secret info access as user', async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        3,
        'Test secret info info',
        'Zero knowledge proof'
      );
      const accounts = await ethers.getSigners();
      const secondAccount = accounts[1];

      const secondAccountContract = await passingSecretInfo.connect(secondAccount);
      await secondAccountContract.payForSecretInfoAccess(0, {
        value: utils.parseEther('0.1'),
      });
      const secretInfoAccessed = await passingSecretInfo.getSecretInfoAccessedById(0);
      assert.equal(secretInfoAccessed.secret_info.amount, Number(utils.parseEther('0.1')));
    });
  });

  describe('pay for secret info access', () => {
    it('get secret info after paid with valid amount for secret info accessed as other user, check if tax properly sent', async () => {
      const accounts = await ethers.getSigners();

      const secondAccount = accounts[1];
      const secondAccountContract = await passingSecretInfo.connect(secondAccount);

      const thirdAccount = accounts[2];
      const thirdAccountContract = await passingSecretInfo.connect(thirdAccount);

      await secondAccountContract.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        3,
        'Test secret info info',
        'Zero knowledge proof'
      );

      const ownerBalanceBeforeTransaction = Number(await owner.getBalance());

      await thirdAccountContract.payForSecretInfoAccess(0, {
        value: utils.parseEther('0.1'),
      });

      // get tax from transaction 5%
      const ownerBalanceAfterTransaction = Number(await owner.getBalance());
      const taxedValue = (Number(utils.parseEther('0.1')) * 5) / 100;
      const ownerBalanceWithoutTaxedValue = ownerBalanceAfterTransaction - taxedValue;

      expect(ownerBalanceBeforeTransaction).to.be.equal(ownerBalanceWithoutTaxedValue);

      const secretInfoAccessed = await thirdAccountContract.getSecretInfoAccessedById(0);
      assert.equal(secretInfoAccessed.secret_info.amount, Number(utils.parseEther('0.1')));
    });

    it('fail get secret info after paid with valid amount for secret info accessed as other user', async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        3,
        'Test secret info info',
        'Zero knowledge proof'
      );

      const accounts = await ethers.getSigners();
      const secondAccount = accounts[1];

      const secondAccountContract = await passingSecretInfo.connect(secondAccount);
      expect(
        secondAccountContract.payForSecretInfoAccess(0, {
          value: utils.parseEther('0.01'),
        })
      ).to.be.revertedWith('Wrong ETH (WEI) value');
    });

    it('fail get secret info after paid two times with valid amount for secret info accessed as other user', async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        3,
        'Test secret info info',
        'Zero knowledge proof'
      );

      const accounts = await ethers.getSigners();
      const secondAccount = accounts[1];

      const secondAccountContract = await passingSecretInfo.connect(secondAccount);
      await secondAccountContract.payForSecretInfoAccess(0, {
        value: utils.parseEther('0.1'),
      });
      expect(
        secondAccountContract.payForSecretInfoAccess(0, {
          value: utils.parseEther('0.1'),
        })
      ).to.be.revertedWith('You already paid for this info');
    });
  });

  describe('reply', () => {
    it('Add reply to secret info', async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        3,
        'Test secret info info',
        'Zero knowledge proof'
      );

      await passingSecretInfo.addSecretInfoReply(0, 'content');
      const secret_info = await passingSecretInfo.getSecretInfos();
      assert.equal(secret_info[0].replies[0].content, 'content');
    });
  });

  describe('rate', () => {
    it('Add positive rate to secret info', async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        3,
        'Test secret info info',
        'Zero knowledge proof'
      );

      const accounts = await ethers.getSigners();
      const secondAccount = accounts[1];
      const secondAccountContract = await passingSecretInfo.connect(secondAccount);

      await secondAccountContract.addSecretInfoRate(0, true);
      const secret_info = await secondAccountContract.getSecretInfos();
      assert.equal(secret_info[0].rates[0].rate, true);
    });

    it('Add negative rate to secret info', async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        3,
        'Test secret info info',
        'Zero knowledge proof'
      );

      const accounts = await ethers.getSigners();
      const secondAccount = accounts[1];
      const secondAccountContract = await passingSecretInfo.connect(secondAccount);

      await secondAccountContract.addSecretInfoRate(0, false);
      const secret_info = await secondAccountContract.getSecretInfos();
      assert.equal(secret_info[0].rates[0].rate, false);
    });

    it('Fail add rate to secret info as owner ', async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        3,
        'Test secret info info',
        'Zero knowledge proof'
      );

      expect(passingSecretInfo.addSecretInfoRate(0, false)).to.be.revertedWith('You are owner of this secret info');
    });

    it('Fail Add 2 rates from same account to secret info', async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        3,
        'Test secret info info',
        'Zero knowledge proof'
      );

      const accounts = await ethers.getSigners();
      const secondAccount = accounts[1];
      const secondAccountContract = await passingSecretInfo.connect(secondAccount);

      await secondAccountContract.addSecretInfoRate(0, true);
      expect(secondAccountContract.addSecretInfoRate(0, true)).to.be.revertedWith('You already rate this info');
    });

    it('Remove rate from secret info', async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        3,
        'Test secret info info',
        'Zero knowledge proof'
      );

      const accounts = await ethers.getSigners();
      const secondAccount = accounts[1];
      const secondAccountContract = await passingSecretInfo.connect(secondAccount);

      await secondAccountContract.addSecretInfoRate(0, true);
      await secondAccountContract.removeSecretInfoRate(0);
      const secret_info = await secondAccountContract.getSecretInfos();

      assert.equal(secret_info[0].rates.length, 0);
    });

    it('Fail Remove rate from secret info', async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        3,
        'Test secret info info',
        'Zero knowledge proof'
      );

      expect(passingSecretInfo.removeSecretInfoRate(0)).to.be.revertedWith("You don't have any rate");
    });

    it('Change already exists rate from secret info', async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        3,
        'Test secret info info',
        'Zero knowledge proof'
      );

      const accounts = await ethers.getSigners();
      const secondAccount = accounts[1];
      const secondAccountContract = await passingSecretInfo.connect(secondAccount);

      await secondAccountContract.addSecretInfoRate(0, true);
      await secondAccountContract.changeSecretInfoRate(0);
      const secret_info = await secondAccountContract.getSecretInfos();
      assert.equal(secret_info[0].rates[0].rate, false);
    });

    it('Fail Change already exists rate from secret info', async () => {
      await passingSecretInfo.addSecretInfo(
        utils.parseEther('0.1'),
        'Test secret info title',
        'Test secret info description',
        3,
        'Test secret info info',
        'Zero knowledge proof'
      );

      expect(passingSecretInfo.changeSecretInfoRate(0)).to.be.revertedWith("You don't have any rate");
    });
  });

  describe('account opinion', () => {
    it('add and get account opinions', async () => {
      const accounts = await ethers.getSigners();
      const secondAccount = accounts[1];

      await passingSecretInfo.addAccountOpinion(secondAccount.address, "it's ok", true);
      await passingSecretInfo.addAccountOpinion(secondAccount.address, "it's ok", false);

      const response = await passingSecretInfo.getAccountOpinionsByAddress(secondAccount.address);

      assert.equal(response.length, 2);
      assert.equal(response[0].rate, true);
    });
  });
});
