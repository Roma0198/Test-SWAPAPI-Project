import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { SafeAreaView, StyleSheet } from 'react-native';

import { screens } from '@router/screens';
import { colors } from '@extra/colors';

const NativeHomeStack = createStackNavigator();

export const HomeStack = () => (
  <SafeAreaView style={styles.container}>
    <NativeHomeStack.Navigator
      initialRouteName={screens.HomeStack?.Home?.name}
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      {Object.keys(screens.HomeStack).map(item => (
        <NativeHomeStack.Screen
          name={screens.HomeStack[item].name}
          component={screens.HomeStack[item].component}
          key={screens.HomeStack[item].name}
        />
      ))}
    </NativeHomeStack.Navigator>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.MAIN,
  },
});
