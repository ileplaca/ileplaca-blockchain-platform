import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { accountActions } from 'smart-contracts/account/actions';
import { passingSecretInfoContract } from 'smart-contracts/passing-secret-info/actions';
import {
  getAccessedIds,
  getSecretInfos,
  getSecretInfosStatus,
} from 'smart-contracts/passing-secret-info/slice';
import { SecretInfo } from 'smart-contracts/passing-secret-info/types';
import { getAccount } from 'smart-contracts/slice';
import { defaultStats } from 'utils/constans/stats';
import { calcChange } from 'utils/helpers/calc';
import { CookiesEnum } from 'utils/types/cookies';

const useSecretInfoAccessedStats = () => {
  const status = useSelector(getSecretInfosStatus);
  const account = useSelector(getAccount);
  const secretInfos = useSelector(getSecretInfos);
  const accessedIds = useSelector(getAccessedIds);
  const [stats, setStats] = useState(defaultStats);
  const cookieStats = Cookies.get(`${CookiesEnum.LAST_STATS}_${account}`);
  const [userSecretInfos, setUserSecretInfos] = useState<SecretInfo[]>([]);

  const { data: accountBalance } = useQuery(`accountBalance${account}`, accountActions.getBalance, {
    cacheTime: 0,
  });

  useEffect(() => {
    if (!secretInfos || !accessedIds || !account || !accountBalance) {
      setStats(defaultStats);
    } else {
      setStats(getStats() as any);
    }
  }, [secretInfos, accessedIds, account, accountBalance]);

  const getStats = () => {
    if (!secretInfos || !accessedIds || !account || !accountBalance) return defaultStats;
    setUserSecretInfos(secretInfos.filter(secretInfo => secretInfo[1].toLocaleLowerCase() === account))

    let ownerSecretInfosAccessedCounter = 0;
    let earnings = 0;
    let expenses = 0;
    let sold = 0;
    let positiveRates = 0;
    let ratesCounter = 0;

    [...secretInfos]
      .filter(([secret_info_id]) => accessedIds.some((accessedId) => accessedId === secret_info_id))
      .forEach(
        ([
          secret_info_id,
          owner_address,
          amount,
          title,
          description,
          zero_knowledge_proof,
          max_uses,
          current_uses,
          created_at,
          replies,
          rates,
        ]) => {
          if (owner_address.toLocaleLowerCase() === account) {
            ownerSecretInfosAccessedCounter++;
            earnings += Number(current_uses) * Number(amount);
            sold += Number(current_uses);

            ratesCounter += rates.length;
            rates.forEach(([rate_id, owner_address_rate, rate]) => {
              if (rate) {
                positiveRates++;
              }
            });
          }

          if (owner_address.toLocaleLowerCase() !== account) {
            expenses += Number(amount);
          }
        }
      );

    let lastStats;

    if (cookieStats) {
      lastStats = JSON.parse(cookieStats);
    } else {
      lastStats = defaultStats;
    }

    let stats = {
      ownerSecretInfosAccessedLength: {
        value: ownerSecretInfosAccessedCounter,
        change: !cookieStats ? 0 :  calcChange(
          ownerSecretInfosAccessedCounter,
          lastStats.ownerSecretInfosAccessedLength.value
        ),
      },
      bought: {
        value: accessedIds.length - ownerSecretInfosAccessedCounter,
        change: !cookieStats ? 0 : calcChange(
          accessedIds.length - ownerSecretInfosAccessedCounter,
          lastStats.bought.value
        ),
      },
      earnings: {
        value: earnings,
        change: !cookieStats ? 0 : calcChange(earnings, lastStats.earnings.value),
      },
      expenses: {
        value: expenses,
        change: !cookieStats ? 0 : calcChange(expenses, lastStats.expenses.value),
      },
      sold: {
        value: sold,
        change: !cookieStats ? 0 : calcChange(sold, lastStats.sold.value),
      },
      averageRate: {
        value: (positiveRates / ratesCounter).toFixed(2),
        change: !cookieStats ? 0 : calcChange(positiveRates / ratesCounter, lastStats.averageRate.value),
      },
      balance: {
        value: Number(accountBalance),
        change: !cookieStats ? 0 : calcChange(Number(accountBalance), Number(lastStats.balance.value)),
      },
      accessToSecretInfos: {
        value: accessedIds.length,
        change: !cookieStats ? 0 : calcChange(accessedIds.length, lastStats.accessToSecretInfos.value),
      },
    };


    if (!cookieStats) {
      Cookies.set(`${CookiesEnum.LAST_STATS}_${account}`, JSON.stringify(stats), { expires: 3 })
    }

    return stats;
  };

  return {
    account,
    accountBalance,
    status,
    stats,
    userSecretInfos
  };
};

export default useSecretInfoAccessedStats;
