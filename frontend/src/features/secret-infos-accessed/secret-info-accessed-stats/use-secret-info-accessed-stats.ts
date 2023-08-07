import Cookies from 'js-cookie';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { passingSecretInfoContract } from 'smart-contracts/passing-secret-info/actions';
import { getSecretInfosAccessed } from 'smart-contracts/passing-secret-info/slice';
import { getAccount } from 'smart-contracts/slice';

const calcChange = (value: number, lastValue: number) => {
  return (((Number(value) - Number(lastValue)) / Number(value)) * 100).toFixed(2);
};

const useSecretInfoAccessedStats = () => {
  const account = useSelector(getAccount);
  const secretInfosAccessed = useSelector(getSecretInfosAccessed);
  const { data: accountBalance } = useQuery(
    'accountBalance',
    passingSecretInfoContract.getBalance,
    { cacheTime: 0 }
  );

  const getStats = () => {
    if (!secretInfosAccessed || !account || !accountBalance) return;
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
        created_at,
        max_uses,
        current_uses,
        replies,
        rates,
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

    let lastStats = {
      ownerSecretInfosAccessedLength: {
        value: 0,
        change: 0,
      },
      bought: {
        value: 0,
        change: 0,
      },
      earnings: {
        value: 0,
        change: 0,
      },
      expenses: {
        value: 0,
        change: 0,
      },
      sold: {
        value: 0,
        change: 0,
      },
      averageRate: {
        value: 0,
        change: 0,
      },
      balance: {
        value: 0,
        change: 0,
      },
      accessToSecretInfos: {
        value: 0,
        change: 0,
      },
    };

    const lastStatsCookie = Cookies.get('last_stats');
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
      (JSON.stringify(stats) !== Cookies.get('last_stats') &&
        Number(Cookies.get('time_to_refresh_last_stats')) < Number(new Date())) ||
      !Cookies.get('last_stats') ||
      !Cookies.get('before_last_stats') ||
      !Cookies.get('time_to_refresh_last_stats')
    ) {
      Cookies.set('last_stats', JSON.stringify(stats));
      Cookies.set('before_last_stats', Cookies.get('last_stats') ?? JSON.stringify(stats));
      Cookies.set('time_to_refresh_last_stats', String(Number(new Date()) + 86400000 * 7));
    }

    return stats;
  };

  return {
    account,
    getStats,
    accountBalance,
    secretInfosAccessed,
  };
};

export default useSecretInfoAccessedStats;
