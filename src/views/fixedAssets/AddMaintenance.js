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
          renderType: 'timePicker',
          mode: 'time',
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
  imgWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  showImageView: {
    position: 'relative',
    padding: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  showImageX: {
    textAlign: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    width: 20,
    height: 20,
    lineHeight: 20,
    position: 'absolute',
    right: 0,
    zIndex: 99,
    backgroundColor: 'black',
    color: 'white',
  },
  showImageImage: {
    width: 50,
    height: 50,
  },
  upload: {
    borderWidth: 1,
    borderColor: 'black',
    height: 50,
    width: 50,
    lineHeight: 50,
    fontSize: 24,
    textAlign: 'center',
    margin: 3,
  },
});
export default AddMaintenance;
