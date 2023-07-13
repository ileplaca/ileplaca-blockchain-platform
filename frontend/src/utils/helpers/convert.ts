import { BigNumberish } from 'ethers';
import { UnitType } from 'utils/types/units';

export const convertEthGweiWei = (num: number | BigNumberish) => {
  num = Number(num);
  if (num < 1e5) {
    return `${num} WEI`;
  }

  if (num < 1e13) {
    return `${num / 1e9} GWEI`;
  }

  return `${num / 1e18} ETH`;
};

export const parseEthGweiToWei = (value: number, unit: UnitType) => {
  if (unit === 'ETH') {
    return value * 1e18;
  }

  if (unit === 'GWEI') {
    return value * 1e9;
  }

  return value;
};
