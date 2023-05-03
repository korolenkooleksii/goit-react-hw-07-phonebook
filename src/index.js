import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { store } from 'redux/store';
import App from 'components/App/App';
import './index.css';

const theme = {
  colors: {
    dark: '#041d51',
    grey: '#313131',
    white: 'white',
    accent: '#739ceda4',
    noActive: '#b3c4e6a3',
    shadow: '1px 2px 2px rgb(0 0 0 / 0.5)',
    shadowAccent: '2px 5px 2px rgb(0 0 0 / 0.5)',
  },
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
