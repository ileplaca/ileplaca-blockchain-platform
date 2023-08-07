import { Loading } from 'features/components';
import useSecretInfoAccessedStats from 'features/secret-infos-accessed/secret-info-accessed-stats/use-secret-info-accessed-stats';
import SecretInfoProfileStatistic from 'features/secret-infos-accessed/secret-info-profile-statistic/secret-info-profile-statistic';
import React, { FC, useEffect, useState } from 'react';
import { convertEthGweiWei, parseEthGweiToWei } from 'utils/helpers/convert';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';

const Profile: FC = () => {
  const { account, accountBalance, getStats, secretInfosAccessed } = useSecretInfoAccessedStats();
  const getCookie = Cookies.get('last_stats');
  const [stats, setStats] = useState<any>({
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
  });

  useEffect(() => {
    const gotStats = getStats();
    setStats(gotStats);
  }, [secretInfosAccessed, accountBalance, getCookie]);

  if (!accountBalance || !stats) return <Loading />;

  return (
    <motion.main whileInView={{ opacity: [0, 100] }} className="flex flex-col items-start">
      <h1 className="text-5xl font-bold">Hello</h1>
      <h2 className="text-xl">{account}</h2>
      <SecretInfoProfileStatistic
        variant="dark"
        name="Balance"
        value={Number(accountBalance) === 0 ? 0 : convertEthGweiWei(accountBalance ?? 0)}
        change={stats.balance.change}
      />
      <h3 className="mt-8 text-4xl font-medium">Secret infos statistics</h3>
      <div className="flex flex-wrap gap-4">
        <SecretInfoProfileStatistic
          variant="dark"
          name="Access to secret infos (with yours)"
          value={stats.accessToSecretInfos.value}
          change={stats.accessToSecretInfos.change}
        />
        <SecretInfoProfileStatistic
          variant="dark"
          name="Number of created secret infos"
          value={stats.ownerSecretInfosAccessedLength.value}
          change={stats.ownerSecretInfosAccessedLength.change}
        />
        <SecretInfoProfileStatistic
          variant="dark"
          name="Bought"
          value={stats.bought.value}
          change={stats.bought.change}
        />
        <SecretInfoProfileStatistic
          variant="dark"
          name="Earnings"
          value={convertEthGweiWei(stats.earnings.value)}
          change={stats.earnings.change}
        />
        <SecretInfoProfileStatistic
          variant="dark"
          name="Expenses"
          value={convertEthGweiWei(stats.expenses.value)}
          change={stats.expenses.change}
        />
        <SecretInfoProfileStatistic
          variant="dark"
          name="Sold"
          value={stats.sold.value}
          change={stats.sold.change}
        />
        <SecretInfoProfileStatistic
          variant="dark"
          name="Average rate"
          value={stats.averageRate.value}
          change={stats.averageRate.change}
        />
      </div>
    </motion.main>
  );
};

export default Profile;
