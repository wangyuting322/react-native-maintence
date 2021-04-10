/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FixedAssetsScreen from '../fixedAssets/FixedAssets';
import SearchScreen from '../search/Search.js';
import MineScreen from '../mine/Mine.js';
import {Icon} from 'native-base';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

function Home({route, navigation}) {
  const allTabNavigations = [
    {
      name: 'FixedAssets',
      options: {
        tabBarLabel: $event => renderTabBarLabel($event, '固定资产'),
        tabBarIcon: $event => renderTabBarIcon($event, 'home'),
      },
      component: FixedAssetsScreen,
    },
    {
      name: 'Search',
      options: {
        tabBarLabel: $event => renderTabBarLabel($event, '搜索'),
        tabBarIcon: $event => renderTabBarIcon($event, 'search'),
      },
      component: SearchScreen,
    },
    {
      name: 'Mine',
      options: {
        tabBarLabel: $event => renderTabBarLabel($event, '我的'),
        tabBarIcon: $event => renderTabBarIcon($event, 'user'),
      },
      component: MineScreen,
    },
  ];

  /**
   * 渲染底部栏文字
   */
  function renderTabBarLabel({focused, color, size}, label) {
    return (
      <Text style={focused ? styles.activeColor : styles.normalColor}>
        {label}
      </Text>
    );
  }

  /**
   * 渲染底部栏图标
   */
  function renderTabBarIcon({focused, color, size}, icon) {
    return (
      <Icon
        name={icon}
        style={focused ? styles.activeColor : styles.normalColor}
        type="FontAwesome"></Icon>
    );
  }

  return (
    <SafeAreaProvider>
      {/* <KeyboardAvoidingView
        // behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.wrapper}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <Tab.Navigator initialRouteName={route.initialRouteName}>
        {allTabNavigations.map(item => {
          return (
            <Tab.Screen
              name={item.name}
              options={item.options}
              component={item.component}
            />
          );
        })}
      </Tab.Navigator>
      {/* </TouchableWithoutFeedback>
      </KeyboardAvoidingView> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  activeColor: {
    color: '#3F51B5',
  },
  normalColor: {
    color: '#000',
  },
});
export default Home;
