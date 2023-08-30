import Cookies from 'js-cookie';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { accountActions } from 'smart-contracts/account/actions';
import { passingSecretInfoContract } from 'smart-contracts/passing-secret-info/actions';
import { getSecretInfosAccessed, getSecretInfosStatus } from 'smart-contracts/passing-secret-info/slice';
import { getAccount } from 'smart-contracts/slice';
import { defaultStats } from 'utils/constans/stats';
import { calcChange } from 'utils/helpers/calc';
import { CookiesEnum } from 'utils/types/cookies';


const useSecretInfoAccessedStats = () => {
  const status = useSelector(getSecretInfosStatus);
  const account = useSelector(getAccount);
  const secretInfosAccessed = useSelector(getSecretInfosAccessed);
  const { data: accountBalance } = useQuery(
    'accountBalance',
    accountActions.getBalance,
    { cacheTime: 0 }
  );

  const getStats = () => {
    if (!secretInfosAccessed || !account || !accountBalance) return defaultStats;

    let ownerSecretInfosAccessedCounter = 0;
    let earnings = 0;
    let expenses = 0;
    let sold = 0;
    let positiveRates = 0;
    let ratesCounter = 0;

    secretInfosAccessed.forEach(([secret_info]) => {
      const [
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
        rates
      ] = secret_info;
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
    });

    let lastStats = defaultStats;

    const lastStatsCookie = Cookies.get(CookiesEnum.LAST_STATS);
    if (lastStatsCookie) {
      lastStats = JSON.parse(lastStatsCookie);
    }

    const stats = {
      ownerSecretInfosAccessedLength: {
        value: ownerSecretInfosAccessedCounter,
        change: calcChange(
          ownerSecretInfosAccessedCounter,
          lastStats.ownerSecretInfosAccessedLength.value
        ),
      },
      bought: {
        value: secretInfosAccessed.length - ownerSecretInfosAccessedCounter,
        change: calcChange(
          secretInfosAccessed.length - ownerSecretInfosAccessedCounter,
          lastStats.bought.value
        ),
      },
      earnings: {
        value: earnings,
        change: calcChange(earnings, lastStats.earnings.value),
      },
      expenses: {
        value: expenses,
        change: calcChange(expenses, lastStats.expenses.value),
      },
      sold: {
        value: sold,
        change: calcChange(sold, lastStats.sold.value),
      },
      averageRate: {
        value: (positiveRates / ratesCounter).toFixed(2),
        change: calcChange(positiveRates / ratesCounter, lastStats.averageRate.value),
      },
      balance: {
        value: Number(accountBalance),
        change: calcChange(Number(accountBalance), Number(lastStats.balance.value)),
      },
      accessToSecretInfos: {
        value: secretInfosAccessed.length,
        change: calcChange(secretInfosAccessed.length, lastStats.accessToSecretInfos.value),
      },
    };

    if (
      (JSON.stringify(stats) !== Cookies.get(CookiesEnum.LAST_STATS) &&
        Number(Cookies.get(CookiesEnum.TIME_TO_REFRESH_LAST_STATS)) < Number(new Date())) ||
      !Cookies.get(CookiesEnum.LAST_STATS) ||
      !Cookies.get(CookiesEnum.TIME_TO_REFRESH_LAST_STATS)
    ) {
      Cookies.set(CookiesEnum.LAST_STATS, JSON.stringify(stats));
      Cookies.set(CookiesEnum.TIME_TO_REFRESH_LAST_STATS, String(Number(new Date()) + 86400000 * 7));
    }

    return stats;
  };

  return {
    account,
    getStats,
    accountBalance,
    secretInfosAccessed,
    status
  };
};

export default useSecretInfoAccessedStats;
