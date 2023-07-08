import { BigNumberish } from 'ethers';

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
