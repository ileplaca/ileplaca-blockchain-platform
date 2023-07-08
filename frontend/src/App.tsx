import React, { useEffect } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Layout } from 'features/ui';
import { CompaniesSalaries, Index, SecretInfos } from 'pages';
import { useDispatch } from 'react-redux';
import { setAccount } from 'smart-contracts/slice';
import Cookies from 'js-cookie';
import SecretInfosAccessed from 'pages/secret-infos-accessed';
import { fetchSecretInfos } from 'smart-contracts/passing-secret-info/slice/thunks';
import { store } from 'redux/store';

store.dispatch(fetchSecretInfos());

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAccount(Cookies.get('account')));
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
    </Routes>
  );
}

export default App;
