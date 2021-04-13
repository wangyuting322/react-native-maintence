/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import CustomForm from '../../components/CustomForm.js';

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

  return (
    <CustomForm
      inputData={DATA}
      route={route}
      navigation={navigation}
      toNavigation="Home"
      navigationParams={{initialRouteName: 'FixedAssets'}}
      changeData={e => {
        setDATA(e);
      }}></CustomForm>
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
