import React from 'react'
import KDS from './src/screens/kds/KDS';
import { Provider } from 'react-redux';
import store, { persistedStore } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <KDS />
      </PersistGate>
    </Provider>
  )
}

export default App;

