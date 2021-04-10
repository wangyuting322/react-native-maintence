/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {
  View,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Button,
  Input,
} from 'native-base';

function AddFixedAssets({route, navigation}) {
  console.log(route, navigation);
  let inputData = [
    {
      title: '基本信息',
      field: 'baseInfo',
      data: [
        {
          title: '资产名称',
          field: 'name',
          value: null,
          required: true,
        },
        {
          title: '资产分类',
          field: 'state',
          value: null,
          required: true,
        },
        {
          title: '资产状态',
          field: 'state',
          value: null,
          required: true,
        },
        {
          title: '规格型号',
          field: 'specification',
          value: null,
          required: true,
        },
        {
          title: '序列',
          field: 'sequence',
          value: null,
        },
        {
          title: '供应商',
          field: 'supplier',
          value: null,
        },
        {
          title: '品牌',
          field: 'brand',
          value: null,
        },
        {
          title: '来源',
          field: 'source',
          value: null,
        },
      ],
    },
  ];

  // let baseInfo = {
  //   name: '',
  //   type: '',
  //   state: '',
  //   specification: '',
  //   sequence: '',
  //   supplier: '',
  //   brand: '',
  //   source: '',
  // };
  /**
   * 填写资产事件
   */
  function changeText(value, objField, dataField) {
    inputData = inputData.map(item => {
      if (item.field === objField) {
        item.data = item.data.map(it => {
          if (it.field === dataField) {
            it.value = value;
          }
          return it;
        });
      }
      return item;
    });
  }

  /**
   * 提交事件
   */
  function handleSubmit() {
    let allData = {};
    let isApproved = true;
    for (let i = 0; i < inputData.length; i++) {
      let dataInfo = inputData[i].data;
      for (let j = 0; j < dataInfo.length; j++) {
        let {required, value, title, field} = dataInfo[j];
        if (required && !value) {
          alert(`请填写${title}`);
          isApproved = false;
          break;
        }
        allData[field] = value;
      }
    }
    console.log(allData);
    if (isApproved) {
      // 返回上一页面
      // navigation.goBack();
      // 返回首页
      navigation.replace('Home', {initialRouteName: 'FixedAssets'});
    }
  }

  /**
   * 渲染内容中的单个项
   */
  function renderContent(field, data) {
    return data.map((item, index) => {
      return (
        <ListItem style={styles.contentItem}>
          <Left style={styles.contentItemLeft}>
            <Text>
              {item.required ? (
                <Text style={{color: 'red', margin: 0, padding: 0}}>*</Text>
              ) : null}
              {item.title}
            </Text>
          </Left>
          <Right style={styles.contentItemRight}>
            <Input
              style={{
                height: 30,
                borderColor: 'transparent',
                borderWidth: 1,
                width: '50%',
                padding: 0,
              }}
              textAlign="right"
              placeholder="未填写"
              onChangeText={$event =>
                changeText($event, field, item.field)
              }></Input>
          </Right>
        </ListItem>
      );
    });
  }

  return (
    <ScrollView>
      <List>
        {inputData.map(({title, field, data}, index) => {
          return (
            <View>
              <ListItem key={`${title}-${index}`} style={{marginLeft: 0}}>
                <View style={styles.title}>
                  <View style={styles.before}></View>
                  <Text>{title}</Text>
                </View>
              </ListItem>
              {data ? renderContent(field, data) : null}
            </View>
          );
        })}
      </List>
      <Button full onPress={handleSubmit}>
        <Text>提交</Text>
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    backgroundColor: '#F1F3F4',
    width: '100%',
    flexDirection: 'row',
  },
  before: {
    flexBasis: 5,
    flexGrow: 0,
    backgroundColor: '#3F51B5',
  },
  contentItem: {
    marginLeft: 0,
    backgroundColor: 'white',
  },
  contentItemLeft: {
    flexBasis: '30%',
    flexGrow: 0,
  },
  contentItemRight: {
    flexGrow: 1,
  },
  view: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
export default AddFixedAssets;
