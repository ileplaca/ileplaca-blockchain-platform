import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import Index from './pages';
import { useDispatch } from 'react-redux';
import CompaniesSalaries from 'pages/companies-salaries';

function App() {
  return (
      <Routes>
        <Route index element={<Index />}></Route>
        <Route path="companies-salaries">
          <Route index element={<CompaniesSalaries />} />
        </Route>
      </Routes>
  )
}

export default App
