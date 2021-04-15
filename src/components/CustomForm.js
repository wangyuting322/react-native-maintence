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
} from '../assets/styles/Global';
// 组件
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
import CustomSelect from './CustomSelect.js';
import CustomImage from './CustomImage.js';
import CustomDateTime from './CustomDateTime.js';

function CustomForm(props) {
  let {
    // 标识表单中的需要填写的项
    inputData = [],
    // 当前页面的route
    route,
    // 导航
    navigation,
    // 点击提交后的跳转页面
    toNavigation,
    // 点击提交后跳转页面需要携带的参数
    navigationParams,
  } = {
    ...props,
  };

  // 使用state保证视图的更新
  let [DATA, setDATA] = useState(inputData);
  /**
   * 修改input中的字段值 - input 填写事件/select 选择事件
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
    props.changeData(inputData);
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
      // 返回首页
      navigation.replace(toNavigation, navigationParams);
    }
  }
  /**
   * 渲染输入框
   */
  function renderInput(field, item) {
    return (
      <Input
        style={styles.input}
        textAlign="right"
        placeholder="未填写"
        onChangeText={$event => changeField($event, field, item.field)}></Input>
    );
  }
  /**
   * 渲染普通单选，多选框
   */
  function renderSelect(field, item) {
    return (
      <CustomSelect
        onSelect={e => {
          changeField(e, field, item.field);
        }}
        value={item.value || []}
        mode={item.mode || 'single'}
        options={item.selectOptions}></CustomSelect>
    );
  }
  /**
   * 渲染上传图片
   */
  function renderUploadImage(field, item) {
    return (
      <CustomImage
        value={item.value || []}
        mode={item.mode || 'multiple'}
        onChangeImage={$event => {
          changeField($event, field, item.field);
        }}></CustomImage>
    );
  }
  function renderTimePicker(field, item) {
    return (
      <CustomDateTime
        value={
          !item.value || !!(new Date(item.value).toString() == 'Invalid Date')
            ? new Date()
            : new Date(item.value)
        }
        mode={item.mode || 'date'}
        onChangeTime={$event => {
          console.log($event);
          changeField($event, field, item.field);
        }}></CustomDateTime>
    );
  }
  /**
   * 渲染内容中的单个项
   */
  function renderContent(field, data) {
    return data.map((item, index) => {
      return (
        <ListItem style={styles.contentListItem}>
          <Left style={styles.left}>
            <Text style={styles.leftText}>
              {item.required ? (
                <Text style={styles.requiredText}>*</Text>
              ) : null}
              {item.title}
            </Text>
          </Left>
          <Right style={styles.right}>
            {item.renderType
              ? item.renderType === 'select'
                ? renderSelect(field, item)
                : item.renderType === 'image'
                ? renderUploadImage(field, item)
                : item.renderType === 'timePicker'
                ? renderTimePicker(field, item)
                : null
              : renderInput(field, item)}
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
              <ListItem key={`${title}-${index}`} style={styles.headerListItem}>
                <View style={styles.title}>
                  <View style={styles.before}></View>
                  <Text style={styles.titleText}>{title}</Text>
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
  headerListItem: {
    marginLeft: 0,
  },
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
  contentListItem: {
    marginLeft: 0,
    backgroundColor: 'white',
  },
  left: {
    ...globalFlexStyle.left,
  },
  leftText: {
    ...globalSize.textSize,
  },
  requiredText: {
    color: 'red',
  },
  right: {
    ...globalFlexStyle.right,
  },
  input: {
    ...globalSize.textSize,
    height: 30,
    padding: 0,
  },
});
export default CustomForm;
