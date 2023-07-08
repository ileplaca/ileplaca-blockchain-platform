import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ReduxProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <Router>
          <App />
        </Router>
      </React.StrictMode>
    </QueryClientProvider>
  </ReduxProvider>
);
