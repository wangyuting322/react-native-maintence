/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, TouchableHighlight} from 'react-native';
import {
  View,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Button,
  Input,
  // Picker,
} from 'native-base';
import Picker from 'react-native-picker';
import Select from '../../components/Select.js';

function AddFixedAssets({route, navigation}) {
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
          field: 'type',
          value: null,
          required: true,
          renderType: 'select',
          selectOptions: [
            {label: '分类一fsdfsdffdsff456414635434sdfds', value: '0'},
            {
              label: '分类二gvgcvcccccccccccccccccccccccccccccccccccccccc',
              value: '1',
            },
            {
              label: '分类二gvgcvcccccccccccccccccccccccccccccccccccccccc',
              value: '3',
            },
            {
              label: '分类二gvgcvcccccccccccccccccccccccccccccccccccccccc',
              value: '4',
            },
            {
              label: '分类二gvgcvcccccccccccccccccccccccccccccccccccccccc',
              value: '5',
            },
            {
              label: '分类二gvgcvcccccccccccccccccccccccccccccccccccccccc',
              value: '6',
            },
            {
              label: '分类二gvgcvcccccccccccccccccccccccccccccccccccccccc',
              value: '7',
            },
          ],
          mode: 'single',
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

  // 使用state保证视图的更新
  let [DATA, setDATA] = useState(inputData);

  /**
   * input 填写事件/select 选择事件
   */
  function changeField(value, objField, dataField) {
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
    setDATA(inputData);
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
      console.log(allData);
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
            <Text style={{fontSize: 14}}>
              {item.required ? (
                <Text style={{color: 'red', margin: 0, padding: 0}}>*</Text>
              ) : null}
              {item.title}
            </Text>
          </Left>
          <Right style={styles.contentItemRight}>
            {item.renderType ? (
              item.renderType === 'select' ? (
                <Select
                  onChecked={e => {
                    changeField(e, field, item.field);
                  }}
                  value={item.value || []}
                  type={item.mode}
                  options={item.selectOptions}></Select>
              ) : null
            ) : (
              <Input
                style={styles.input}
                textAlign="right"
                placeholder="未填写"
                onChangeText={$event =>
                  changeField($event, field, item.field)
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
        {DATA.map(({title, field, data}, index) => {
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
  input: {
    height: 30,
    borderColor: 'transparent',
    borderWidth: 1,
    padding: 0,
    fontSize: 14,
  },
  view: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
export default AddFixedAssets;
