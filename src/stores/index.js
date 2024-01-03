import { createContext, useContext } from 'react';

import { GlobalStore } from '@stores/GlobalStore';

const globalStore = new GlobalStore();

export class RootStore {
  globalStore;

  constructor() {
    this.globalStore = globalStore;
  }
}

export const rootStore = new RootStore();

export const StoreContext = createContext(rootStore);
export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);
