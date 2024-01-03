import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { HomeStack } from '@router/HomeStack';

export const Router = () => (
  <NavigationContainer>
    <HomeStack />
  </NavigationContainer>
);
