/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, TouchableHighlight, ScrollView} from 'react-native';
import {navigate} from '../../navigation/index';
import {View, List, ListItem, Text, Icon} from 'native-base';

import {
  globalColor,
  globalSize,
  globalFlexStyle,
} from '../../assets/styles/Global';

function FixedAssets({navigation}) {
  const DATA = [
    {
      title: '资产',
      data: [
        {
          icon: 'shopping-cart',
          title: '入库',
          link: 'AddFixedAssets',
        },
        {
          icon: 'barcode',
          title: '识别',
          link: 'ScanFixedAssets',
        },
        {
          icon: 'edit',
          title: '盘点',
          link: 'AssetsCheck',
        },
        {
          icon: 'search',
          title: '巡检',
        },
        {
          icon: 'star-o',
          title: '报修',
        },
        {
          icon: 'spoon',
          title: '领用',
        },
        {
          icon: 'sticky-note-o',
          title: '借用',
        },
        {
          icon: 'tint',
          title: '申请',
          link: 'AddMaintenance',
        },
        {
          icon: 'trash',
          title: '报废',
        },
        {
          icon: 'skyatlas',
          title: '调拨',
        },
        {
          icon: 'wpforms',
          title: '报表',
        },
      ],
    },
    {
      title: '数据中心',
      data: [
        {
          icon: 'money',
          title: '机柜',
        },
        {
          icon: 'clone',
          title: '备件',
        },
      ],
    },
    {
      title: '资产',
      data: [
        {
          icon: 'shopping-cart',
          title: '入库',
          link: 'addFixedAssets',
        },
        {
          icon: 'barcode',
          title: '识别',
        },
        {
          icon: 'edit',
          title: '盘点',
        },
        {
          icon: 'search',
          title: '巡检',
        },
        {
          icon: 'star-o',
          title: '报修',
        },
        {
          icon: 'spoon',
          title: '领用',
        },
        {
          icon: 'sticky-note-o',
          title: '借用',
        },
        {
          icon: 'tint',
          title: '申请',
        },
        {
          icon: 'trash',
          title: '报废',
        },
        {
          icon: 'skyatlas',
          title: '调拨',
        },
        {
          icon: 'wpforms',
          title: '报表',
        },
      ],
    },
  ];
  /**
   * 链接跳转事件
   */
  function handleLink({link}) {
    if (link) {
      navigation.navigate(link);
    }
  }

  /**
   * 渲染内容中的单个项
   */
  function renderContentItem(content) {
    return (
      <ListItem style={styles.content}>
        {content.map((item, index) => {
          return (
            <TouchableHighlight
              style={styles.contentItem}
              underlayColor={globalColor.shadowColor.backgroundColor}
              onPress={() => handleLink(item)}>
              <View style={styles.contentItemView}>
                <Icon
                  name={item.icon}
                  style={styles.contentItemIcon}
                  type="FontAwesome"></Icon>
                <Text style={styles.contentItemText}>{item.title}</Text>
              </View>
            </TouchableHighlight>
          );
        })}
      </ListItem>
    );
  }

  return (
    <ScrollView>
      <List>
        {DATA.map(({title, data}, index) => {
          return (
            <View>
              <ListItem key={`${title}-${index}`}>
                <View style={styles.title}>
                  <View style={styles.before}></View>
                  <Text style={styles.titleText}>{title}</Text>
                </View>
              </ListItem>
              {data ? renderContentItem(data) : null}
            </View>
          );
        })}
      </List>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  title: {
    ...globalFlexStyle.rowFlex,
  },
  before: {
    ...globalColor.themeBackgroundColor,
    flexBasis: 5,
    flexGrow: 0,
    marginRight: 10,
  },
  titleText: {
    ...globalSize.titleSize,
  },
  content: {
    ...globalFlexStyle.rowFlex,
  },
  contentItem: {
    width: '33%',
    padding: 10,
  },
  contentItemView: {
    ...globalFlexStyle.columnFlex,
  },
  contentItemIcon: {
    ...globalSize.iconSize,
    ...globalColor.greyColor,
  },
  contentItemText: {
    ...globalSize.textSize,
    ...globalColor.greyColor,
  },
});
export default FixedAssets;
