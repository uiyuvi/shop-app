import React from 'react';
import ShopNavigator from './navigation/shopNavigator';
import {Provider} from 'react-redux';
import store from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
