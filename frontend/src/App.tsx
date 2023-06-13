import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom';
import { Layout } from 'features/ui';
import { CompaniesSalaries, Index, SecretInfos } from 'pages';

function App() {
  return (
    <Routes>
      <Route index element={<Index />}></Route>
      <Route element={<Layout><Outlet /></Layout>} path="companies-salaries">
        <Route index element={<CompaniesSalaries />} />
      </Route>
      <Route element={<Layout><Outlet /></Layout>} path="secret-infos">
        <Route index element={<SecretInfos />} />
      </Route>
    </Routes>
  )
}

export default App
