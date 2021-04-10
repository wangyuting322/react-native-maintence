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
// 图片上传
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

function AddMaintenance({route, navigation}) {
  let inputData = [
    {
      title: '维保信息',
      field: 'baseInfo',
      data: [
        {
          title: '维保商',
          field: 'maintenanceSupplier',
          value: null,
        },
        {
          title: '脱保计算',
          field: 'debentureCalculation',
          value: null,
        },
        {
          title: '脱保日期',
          field: 'debentureDate',
          value: null,
        },
        {
          title: '维保状态',
          field: 'maintenanceState',
          value: null,
        },
        {
          title: '维保说明',
          field: 'maintenanceDescription',
          value: null,
        },
        {
          title: '图片',
          field: 'image',
          value: null,
          renderType: 'image',
        },
      ],
    },
  ];

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
    if (isApproved) {
      // 返回上一页面
      // navigation.goBack();
      // 返回首页
      navigation.replace('Home', {initialRouteName: 'FixedAssets'});
    }
  }

  /**
   * 选择图片
   */
  function selectPicture() {
    console.log(35);
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
            {item.renderType ? (
              item.renderType === 'image' ? (
                <Text
                  onPress={selectPicture}
                  style={{
                    borderWidth: 1,
                    borderColor: 'black',
                    padding: 30,
                    fontSize: 26,
                  }}>
                  +
                </Text>
              ) : null
            ) : (
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
            )}
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
export default AddMaintenance;
