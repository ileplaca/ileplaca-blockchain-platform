import { ErrorMessage, Loading } from 'features/components';
import useSecretInfoAccessedStats from 'features/secret-infos-accessed/secret-info-accessed-stats/use-secret-info-accessed-stats';
import SecretInfoProfileStatistic from 'features/secret-infos-accessed/secret-info-profile-statistic/secret-info-profile-statistic';
import React, { FC, useEffect, useState } from 'react';
import { convertEthGweiWei } from 'utils/helpers/convert';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import { defaultStats } from 'utils/constans/stats';
import { CookiesEnum } from 'utils/types/cookies';
import { ResponseStatus } from 'utils/types/api';
import { copy } from 'utils/helpers/copy';

const Profile: FC = () => {
  const { account, accountBalance, getStats, status } = useSecretInfoAccessedStats();
  const getCookie = Cookies.get(CookiesEnum.LAST_STATS);
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    setStats(getStats() as any);
  },[accountBalance, getCookie]);

  if (status === ResponseStatus.FAILED) return <ErrorMessage />;
  if (!stats || isNaN(Number(accountBalance))) return <Loading />;

  return (
    <motion.main whileInView={{ opacity: [0, 100] }} className="flex flex-col items-start">
      <h1 className="text-5xl font-bold">Hello</h1>
      <h2 className="text-xl dont-break-out" onClick={() => copy(account)}>{account}</h2>
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
          name="Access to secret infos"
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
          value={isNaN(stats.averageRate.value) ? "0" : stats.averageRate.value*100+"%"}
          change={isNaN(stats.averageRate.change) ? "0" : stats.averageRate.change}
        />
      </div>
    </motion.main>
  );
};

export default Profile;
