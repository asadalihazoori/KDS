import React from 'react'
import KDS from './src/screens/kds/KDS';
import { Provider } from 'react-redux';
import store, { persistedStore } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { SocketProvider } from './src/context/socket';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <SocketProvider>
          <KDS />
        </SocketProvider>
      </PersistGate>
    </Provider>
  )
}

export default App;

