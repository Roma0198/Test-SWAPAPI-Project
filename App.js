import React from 'react';
import { Router } from './src/router';
import { rootStore, StoreProvider } from './src/stores';

const App = () => (
  <StoreProvider value={rootStore}>
    <Router />
  </StoreProvider>
);

export default App;
