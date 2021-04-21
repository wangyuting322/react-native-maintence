/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, ScrollView, Image} from 'react-native';
import {View, List, ListItem, Text, Icon, Left, Body, Right} from 'native-base';

function Mine({route, navigation}) {
  let [userInfo, setUserInfo] = useState({
    department: '科技部2',
    roleName: '管理员',
  });
  const DATA = [
    {
      title: '我的服务',
      data: [
        {
          title: '我的资产',
          icon: 'hdd-o',
          link: 'MyAssets',
        },
        {
          title: '我的报修',
          icon: 'fa',
        },
        {
          title: '我的借用',
          icon: 'hourglass',
        },
        {
          title: '打印机连接',
          icon: 'plug',
        },
        {
          title: '修改密码',
          icon: 'plug',
        },
        {
          title: '用户退出',
          icon: 'key',
        },
      ],
    },
    {
      title: '公共服务',
      data: [
        {
          title: '关于我们',
          icon: 'newspaper-o',
        },
        {
          title: '用户协议',
          icon: 'book',
        },
        {
          title: '意见反馈',
          icon: 'wrench',
        },
      ],
    },
  ];

  /**
   * 链接跳转事件
   */
  function handleLink(link = '') {
    if (link) {
      navigation.navigate(link);
    }
  }

  /**
   * 渲染内容中的单个项
   */
  function renderContentItem(data) {
    return data.map(({title, icon, link}, index) => {
      // console.log(`#${Math.random() * 10000}`);
      return (
        <ListItem
          key={`${icon}-${index}`}
          icon
          onPress={() => handleLink(link)}
          style={styles.contentItem}>
          <Left>
            <Icon
              name={icon}
              type="FontAwesome"
              style={styles.leftIcon}
              // style={{
              //   color: `#${Number.parseInt(Math.random() * 1000000)}`,
              //   fontSize: 18,
              // }}
            ></Icon>
          </Left>
          <Body>
            <Text style={{fontSize: 16}}>{title}</Text>
          </Body>
          <Right>
            <Icon name="chevron-right" type="FontAwesome"></Icon>
          </Right>
        </ListItem>
      );
    });
  }

  return (
    <ScrollView>
      {/**头部个人部门信息 */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/image/mine/logo.png')}
          style={{width: 100, height: 100}}></Image>
        <View style={styles.headerText}>
          <Text style={{fontSize: 18, marginBottom: 2}}>
            {userInfo.department}
          </Text>
          <Text style={{fontSize: 16}}>{userInfo.roleName}</Text>
        </View>
      </View>
      {/**内容部分 */}
      <List>
        {DATA.map(({title, data}, index) => {
          return (
            <View key={index}>
              <ListItem key={index} itemDivider></ListItem>
              {renderContentItem(data)}
            </View>
          );
        })}
      </List>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
  },
  headerText: {
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  contentItem: {
    backgroundColor: 'white',
    marginLeft: 0,
    paddingLeft: 10,
  },
  leftIcon: {
    fontSize: 16,
    // color: 'grey',
  },
});
export default Mine;
