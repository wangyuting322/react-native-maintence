import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, CommonActions} from '@react-navigation/native';

import LoginScreen from '../views/login/Login.js';
import HomeScreen from '../views/home/Home.js';
// import FixedAssetsScreen from "../views/fixedAssets/FixedAssets.js"
// import SearchScreen from "../views/search/Search.js"
// import MineScreen from "../views/mine/Mine.js"
import AddFixedAssetsScreen from '../views/fixedAssets/AddFixedAssets.js';
import AddMaintenanceScreen from '../views/fixedAssets/AddMaintenance.js';
import ScanFixedAssetsScreen from '../views/fixedAssets/ScanFixedAssets.js';
import MyAssetsScreen from '../views/mine/MyAssets.js';
export const Stack = createStackNavigator();
/**
 * 全局钩子
 * 参考https://blog.csdn.net/qq_42076140/article/details/108214932
 */
let navigator;

export function navigate(routeName, params = {}) {
  if (navigator) {
    navigator.dispatch(
      CommonActions.navigate({
        name: routeName,
        params: params,
      }),
    );
  } else {
    throw new Error('路由未加载');
  }
}
export const allStackNavigations = [
  {
    name: 'Login',
    options: {
      headerTitle: '登录',
      headerShown: false,
    },
    component: LoginScreen,
  },
  {
    name: 'Home',
    options: {
      headerTitle: '主页',
      headerShown: false,
    },
    component: HomeScreen,
  },
  // {
  //   name: 'FixedAssets',
  //   options: {
  //     headerTitle: '固定资产页面',
  //     headerShown: false
  //   },
  //   component: FixedAssetsScreen
  // },
  // {
  //   name: 'Search',
  //   options: {
  //     headerTitle: '搜索页面',
  //   },
  //   component: SearchScreen
  // },
  // {
  //   name: 'Mine',
  //   options: {
  //     headerTitle: '我的',
  //   },
  //   component: MineScreen
  // },
  {
    name: 'addFixedAssets',
    options: {
      headerTitle: '新增资产',
      headerShown: true,
    },
    component: AddFixedAssetsScreen,
  },
  {
    name: 'addMaintenance',
    options: {
      headerTitle: '新增维保',
      headerShown: true,
    },
    component: AddMaintenanceScreen,
  },
  {
    name: 'scanFixedAssets',
    options: {
      headerTitle: '识别资产',
      headerShown: true,
    },
    component: ScanFixedAssetsScreen,
  },
  {
    name: 'myAssets',
    options: {
      headerTitle: '我的资产',
      headerShown: true,
    },
    component: MyAssetsScreen,
  },
];

function Navigation(args) {
  return (
    <NavigationContainer
      ref={navigatorRef => {
        navigator = navigatorRef;
      }}>
      <Stack.Navigator initialRouteName="Login">
        {allStackNavigations.map(item => {
          return (
            <Stack.Screen
              name={item.name}
              options={item.options}
              component={item.component}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
