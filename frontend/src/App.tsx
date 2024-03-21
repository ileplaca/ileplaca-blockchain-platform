import React, { useEffect } from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { Layout } from 'features/ui';
import { CompaniesSalaries, Index, Profile, SecretInfos } from 'pages';
import { useDispatch } from 'react-redux';
import { setAccount } from 'smart-contracts/slice';
import Cookies from 'js-cookie';
import SecretInfosAccessed from 'pages/secret-infos-accessed';
import {
  fetchSecretInfos,
  fetchAccessedIds,
} from 'smart-contracts/passing-secret-info/slice/thunks';
import { store } from 'redux/store';
import { ethereum } from 'smart-contracts';
import { CookiesEnum } from 'utils/types/cookies';
import Account from 'pages/accounts/[account_address]';
import { fetchCompaniesSalaries } from 'smart-contracts/companies-salaries/slice/thunks';
import Accounts from 'pages/accounts';

store.dispatch(fetchSecretInfos());
store.dispatch(fetchAccessedIds());
store.dispatch(fetchCompaniesSalaries());

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setAccount(Cookies.get(CookiesEnum.ACCOUNT)));

    ethereum.on('accountsChanged', function (accounts: string[]) {
      Cookies.set(CookiesEnum.ACCOUNT, accounts[0]);
      dispatch(setAccount(accounts[0]));
      window.location.reload();
    });
  }, []);

  return (
    <Routes>
      <Route index element={<Index />}></Route>
      <Route
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
        path="companies-salaries"
      >
        <Route index element={<CompaniesSalaries />} />
      </Route>
      <Route
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
        path="secret-infos"
      >
        <Route index element={<SecretInfos />} />
      </Route>
      <Route
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
        path="secret-info-accessed"
      >
        <Route index element={<SecretInfosAccessed />} />
      </Route>
      <Route
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
        path="profile"
      >
        <Route index element={<Profile />} />
      </Route>
      <Route
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
        path="accounts"
      >
        <Route index element={<Accounts />} />
        <Route path=":account_address" element={<Account />} />
      </Route>
    </Routes>
  );
}

export default App;
