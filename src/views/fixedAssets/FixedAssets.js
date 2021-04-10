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

function FixedAssets() {
  const DATA = [
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
          link: 'scanFixedAssets',
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
          link: 'addMaintenance',
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
      navigate(link);
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
              underlayColor="#F1F3F4"
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
        {DATA.map((item, index) => {
          return (
            <View>
              <ListItem key={`${item.title}-${index}`}>
                <View style={styles.title}>
                  <View style={styles.before}></View>
                  <Text>{item.title}</Text>
                </View>
              </ListItem>
              {item.data ? renderContentItem(item.data) : null}
            </View>
          );
        })}
      </List>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  title: {
    backgroundColor: '#F2F2F2',
    width: '100%',
    flexDirection: 'row',
  },
  before: {
    flexBasis: 5,
    flexGrow: 0,
    marginRight: 10,
    backgroundColor: '#3F51B5',
  },
  content: {
    padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  contentItem: {
    width: '33%',
    paddingTop: 10,
    paddingBottom: 10,
  },
  contentItemView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentItemIcon: {
    fontSize: 18,
    color: 'grey',
  },
  contentItemText: {
    fontSize: 14,
    color: 'grey',
  },
});
export default FixedAssets;
