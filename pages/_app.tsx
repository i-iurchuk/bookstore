import type { AppProps } from 'next/app';
import React, { FC } from 'react';
import { Provider } from 'react-redux';

import { wrapper } from '../app/store/store';
import '../styles/globals.css';

const App: FC<AppProps> = ({ Component, ...rest }) => {
  const {store, props} = wrapper.useWrappedStore(rest);
  
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
};

export default App;
