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
} from '../assets/styles/Global.js';
// 组件
import {StyleSheet, ScrollView} from 'react-native';

import {Container, Button, Segment, Content, Text} from 'native-base';

export default function CustomSegment(props) {
  let {
    // 标签页信息 [{key:"0", label: '未盘点',  data:[  {title:'本次长裤数据中心河北巡检'}}]
    tabData = [],
    // 标签页下内容显示
    renderView = () => {},
  } = props;

  // 当前活跃标签
  let [activeTab, setActiveTab] = useState('0');
  /**
   * 内容渲染
   */
  function renderContent() {
    if (tabData[activeTab].customRender) {
      return tabData[activeTab].customRender(tabData[activeTab].data);
    }
    return renderView(tabData[activeTab].data);
    // return <Text>ff</Text>;
  }
  return (
    <Container>
      <Segment style={{backgroundColor: 'white'}}>
        {tabData.map((item, index) => {
          let {key, label} = item;
          return (
            <Button
              first
              last
              style={activeTab === key ? styles.activeTab : styles.normalTab}
              onPress={() => {
                setActiveTab(key);
              }}>
              <Text
                style={activeTab === key ? styles.activeTab : styles.normalTab}>
                {label}
              </Text>
            </Button>
          );
        })}
      </Segment>
      <Content>
        <ScrollView style={styles.scrollView}>{renderContent()}</ScrollView>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  activeTab: {
    ...globalColor.themeBackgroundColor,
    ...globalColor.themeBorderColor,
  },
  normalTab: {
    ...globalColor.themeColor,
    ...globalColor.themeBorderColor,
    backgroundColor: 'white',
  },
  scrollView: {
    flexGrow: 0,
  },
});
