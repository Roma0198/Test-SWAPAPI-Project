import { Home } from '@screens/Home';
import { CharacterDetails } from '@screens/CharacterDetails';

export const screens = {
  HomeStack: {
    Home: {
      name: 'Home',
      component: Home,
    },
    CharacterDetails: {
      name: 'CharacterDetails',
      component: CharacterDetails,
    },
  },
};
