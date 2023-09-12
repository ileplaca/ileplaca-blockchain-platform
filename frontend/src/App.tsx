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

store.dispatch(fetchSecretInfos());
store.dispatch(fetchAccessedIds());

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setAccount(Cookies.get('account')));

    ethereum.on('accountsChanged', function (accounts: string[]) {
      Cookies.remove(CookiesEnum.LAST_STATS);
      Cookies.remove(CookiesEnum.TIME_TO_REFRESH_LAST_STATS);
      Cookies.set(CookiesEnum.ACCOUNT, accounts[0]);
      dispatch(setAccount(accounts[0]));
      navigate(0);
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
        <Route path=":account_address" element={<Account />} />
      </Route>
    </Routes>
  );
}

export default App;
