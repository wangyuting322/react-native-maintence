/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
// 全局样式
import {
  globalColor,
  globalSize,
  globalFlexStyle,
} from '../../assets/styles/Global.js';
// 组件
import {StyleSheet, TouchableHighlight, ScrollView} from 'react-native';
import CustomSegment from '../../components/CustomSegment.js';

import {View, Card, CardItem, Text} from 'native-base';

function AssetsCheck({route, navigation}) {
  let tabs = [
    {
      key: '0',
      label: '未盘点',
      data: [
        {
          title: '本次长裤数据中心河北巡检',
          state: 0,
          sumNum: 12,
          normalNum: 12,
          brokenNum: 22,
          leftNum: 22,
          createTime: '2020-02-01',
        },
        {
          title: 'remark',
          state: 0,
          sumNum: 12,
          normalNum: 12,
          brokenNum: 22,
          leftNum: 22,
          createTime: '2020-02-01',
        },
      ],
    },
    {
      key: '1',
      label: '已盘点',
    },
  ];
  function renderView(data) {
    if (!data || data.length === 0) {
      return <Text style={styles.noDataText}>暂无数据</Text>;
    }
    return data.map((item, index) => {
      let {
        title,
        state,
        sumNum,
        normalNum,
        brokenNum,
        leftNum,
        createTime,
      } = item;
      return (
        <Card>
          <CardItem header button>
            <View style={styles.headerView}>
              <Text>{title}</Text>
              <Text style={styles.stateText}>
                {state === 0 ? '未巡检' : '已巡检'}
              </Text>
            </View>
          </CardItem>
          <CardItem>
            <View style={styles.headerView}>
              <View style={styles.tableView}>
                <Text style={styles.tableHeader}>资产总数</Text>
                <Text style={styles.tableBody}>{sumNum}</Text>
              </View>
              <View style={styles.tableView}>
                <Text style={styles.tableHeader}>正常数量</Text>
                <Text style={styles.tableBody}>{normalNum}</Text>
              </View>
              <View style={styles.tableView}>
                <Text style={styles.tableHeader}>故障数量</Text>
                <Text style={styles.tableBody}>{brokenNum}</Text>
              </View>
              <View style={styles.tableView}>
                <Text style={styles.tableHeader}>未巡检数</Text>
                <Text style={styles.tableBody}>{leftNum}</Text>
              </View>
            </View>
          </CardItem>
          <CardItem footer>
            <Text style={styles.footerTime}>{createTime}</Text>
          </CardItem>
        </Card>
      );
    });
  }
  return <CustomSegment tabData={tabs} renderView={renderView}></CustomSegment>;
}

const styles = StyleSheet.create({
  noDataText: {
    width: '100%',
    textAlign: 'center',
  },
  headerView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stateText: {
    ...globalSize.textSize,
    color: 'green',
  },
  tableView: {
    ...globalFlexStyle.columnFlex,
    flexGrow: 1,
  },
  tableHeader: {
    ...globalSize.titleSize,
    borderWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    width: '100%',
    textAlign: 'center',
    borderColor: 'grey',
    fontWeight: 'bold',
  },
  tableBody: {
    ...globalSize.titleSize,
    borderWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    width: '100%',
    textAlign: 'center',
    borderWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  footerTime: {
    ...globalSize.textSize,
    ...globalColor.greyColor,
  },
});
export default AssetsCheck;
