/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  Modal,
  TouchableHighlight,
} from 'react-native';
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
import ImagePicker, {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
// 图片放大查看
import ImageViewer from 'react-native-image-zoom-viewer';

function AddMaintenance({route, navigation}) {
  // 多图片信息
  let [imageArr, setImageArr] = useState([]);
  // 图片信息
  let [imageInfo, setImageInfo] = useState(null);
  // 是否放大图片
  let [isBig, setIsBig] = useState(false);
  // 放大图片的索引
  let [initIndex, setInitIndex] = useState(0);

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

  // 使用state保证视图的更新
  let [DATA, setDATA] = useState(inputData);
  /**
   * input填写
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
        if (field === 'image') {
          allData[field] = imageArr;
        } else {
          allData[field] = value;
        }
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
   * 选择图片
   */
  function selectPicture() {
    Alert.alert(
      '',
      '请选择方式',
      [
        {
          text: '相机拍摄',
          onPress: () => {
            launchCamera({saveToPhotos: true}, response => {
              if (response.didCancel) {
                console.log('用户点击了取消');
              } else if (response.error) {
                console.log('ImagePicker 出错: ', response.error);
              } else {
                let arr = [...imageArr, response];
                setImageArr(arr);
                console.log(imageArr);
              }
            });
          },
        },
        {
          text: '相册选取',
          onPress: () => {
            launchImageLibrary({quality: 0.5}, response => {
              if (response.didCancel) {
                console.log('用户点击了取消');
              } else if (response.error) {
                console.log('ImagePicker 出错: ', response.error);
              } else {
                let arr = [...imageArr, response];
                setImageArr(arr);
                console.log(imageArr);
              }
            });
          },
        },
      ],
      {cancelable: true},
    );
  }
  /**
   * 删除图片
   */
  function deleteImage(index) {
    let arr = [...imageArr];
    arr.splice(index, 1);
    setImageArr(arr);
  }
  /**
   * 是否放大
   */
  function handleBig(isBig, index = 0) {
    setIsBig(isBig);
    setInitIndex(index);
  }
  /**
   * 渲染图片
   */
  function renderUploadImage() {
    return (
      <View style={styles.imgWrapper}>
        {imageArr.map((item, index) => {
          return (
            <View style={styles.showImageView}>
              <Text
                style={styles.showImageX}
                onPress={() => deleteImage(index)}>
                X
              </Text>
              <TouchableHighlight
                activeOpacity={1}
                underlayColor="#DDDDDD"
                onPress={() => handleBig(true, index)}>
                <Image
                  source={{
                    uri: item.uri,
                  }}
                  style={styles.showImageImage}></Image>
              </TouchableHighlight>
            </View>
          );
        })}
        <Text onPress={selectPicture} style={styles.upload}>
          +
        </Text>
      </View>
    );
  }
  /**
   * 渲染内容中的单个项
   */
  function renderContent(field, data) {
    let uri = imageInfo && imageInfo.uri;
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
              item.renderType === 'image' ? (
                renderUploadImage()
              ) : null
            ) : (
              <Input
                style={styles.input}
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

  let arr = imageArr.map(item => {
    return {url: item.uri};
  });

  return (
    <ScrollView>
      {/**图片放大查看 */}
      <Modal
        animationType="fade"
        presentationStyle={'overFullScreen'}
        transparent={true}
        visible={isBig}
        onRequestClose={() => {
          setIsBig(false);
        }}>
        <ImageViewer
          imageUrls={arr}
          style={{width: '100%'}}
          index={initIndex}
          enableImageZoom={true} // 是否开启手势缩放
          saveToLocalByLongPress={true} //是否开启长按保存
          menuContext={{saveToLocal: '保存图片', cancel: '取消'}}
        />
      </Modal>
      {/**列表填写 */}
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
