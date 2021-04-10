/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
// import {navigate} from '../../navigation/index';
import {Text, View} from 'native-base';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function MyAssets({route, navigation}) {
  return (
    <ScrollView>
      <View>
        <Text>我的资产</Text>
      </View>
    </ScrollView>
  );
}

export default MyAssets;
