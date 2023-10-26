import React, { FC } from 'react';
import { useParams } from 'react-router';
import { handleCopyAddress } from 'utils/helpers/alert';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { CompaniesSalaryList } from 'features/companies-salaries';
import { useSelector } from 'react-redux';
import { getManipulatedCompaniesSalaries } from 'smart-contracts/companies-salaries/slice';
import { SecretInfoList } from 'features/secret-infos';
import { getManipulatedSecretInfos } from 'smart-contracts/passing-secret-info/slice';
import { SMART_CONTRACTS_DATA_ENUM } from 'smart-contracts/types';
import { SearchInput, Sort } from 'features/components';

const Account: FC = () => {
  const { account_address } = useParams();
  const companiesSalaries = useSelector(getManipulatedCompaniesSalaries);
  const secretInfos = useSelector(getManipulatedSecretInfos);

  if (!account_address) {
    return <>Wrong route</>;
  }

  return (
    <>
      <section className="flex flex-wrap items-center gap-2 lg:gap-4 xl:gap-8">
        <button
          onClick={() => handleCopyAddress(account_address)}
          className="text-xl font-medium cursor-pointer dont-break-out hover:bg-gray-800 rounded-button"
        >
          {account_address}
        </button>
      </section>
      <div className="mt-4"></div>
      <Tabs>
        <TabList>
          <div className="flex">
            <Tab selectedClassName="bg-white text-black outline-none" className="p-2 px-3">
              Companies Salaries
            </Tab>
            <Tab selectedClassName="bg-white text-black outline-none" className="p-2 px-3">
              Secret infos
            </Tab>
          </div>
        </TabList>

        <TabPanel>
          <section className="flex flex-wrap items-center gap-2 mt-4 lg:gap-4 xl:gap-8">
            <SearchInput type={SMART_CONTRACTS_DATA_ENUM.COMPANIES_SALARY} />
            <Sort type={SMART_CONTRACTS_DATA_ENUM.COMPANIES_SALARY} />
          </section>
          <CompaniesSalaryList
            companiesSalaries={companiesSalaries.filter(
              ([salary_id, owner_address]) => account_address === owner_address
            )}
          />
        </TabPanel>
        <TabPanel>
          <section className="flex flex-wrap items-center gap-2 mt-4 lg:gap-4 xl:gap-8">
            <SearchInput type={SMART_CONTRACTS_DATA_ENUM.SECRET_INFO} />
            <Sort type={SMART_CONTRACTS_DATA_ENUM.SECRET_INFO} />
          </section>
          <SecretInfoList
            secretInfos={secretInfos.filter(
              ([secret_info_id, owner_address]) => account_address === owner_address
            )}
            accessed={false}
          />
        </TabPanel>
      </Tabs>
    </>
  );
};

export default Account;
