import React, {useState} from 'react';
import {
  StyleSheet,
  Alert,
  Image,
  Modal,
  TouchableHighlight,
} from 'react-native';
import {View, Text} from 'native-base';
// 图片上传
import ImagePicker, {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
// 图片放大查看
import ImageViewer from 'react-native-image-zoom-viewer';
export default function CustomImage(props) {
  let {
    // value选中的值，格式：[{uri:'xxx',...},{uri:'xxx',...}]
    value: imageArr = [],
    // 选择器类型，可选值： 'single' 单选 |'multiple' 多选
    mode = 'multiple',
  } = {...props};
  // 是否放大图片
  let [isBig, setIsBig] = useState(false);
  // 放大图片的索引
  let [initIndex, setInitIndex] = useState(0);

  if (!imageArr) {
    imageArr = [];
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
                if (mode === 'single') {
                  imageArr = [response];
                } else if (mode === 'multiple') {
                  imageArr.push(response);
                }
                props.onChangeImage(imageArr);
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
                if (mode === 'single') {
                  imageArr = [response];
                } else if (mode === 'multiple') {
                  imageArr.push(response);
                }
                props.onChangeImage(imageArr);
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
    imageArr.splice(index, 1);
    props.onChangeImage(imageArr);
  }
  /**
   * 是否放大
   */
  function handleBig(isBig, index = 0) {
    setIsBig(isBig);
    setInitIndex(index);
  }

  return (
    <View>
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
          imageUrls={imageArr.map(item => {
            return {
              url: item.uri,
            };
          })}
          style={{width: '100%'}}
          index={initIndex}
          enableImageZoom={true} // 是否开启手势缩放
          saveToLocalByLongPress={true} //是否开启长按保存
          menuContext={{saveToLocal: '保存图片', cancel: '取消'}}
        />
      </Modal>
      {/**图片上传 - 点击选择，回显 */}
      <View style={styles.imageWrapper}>
        {imageArr.map((item, index) => {
          return (
            <View style={styles.imageView}>
              <Text
                style={styles.deleteImage}
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
                  style={styles.imageContent}></Image>
              </TouchableHighlight>
            </View>
          );
        })}
        <Text onPress={selectPicture} style={styles.uploadImage}>
          +
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  imageWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageView: {
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 3,
  },
  deleteImage: {
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
  imageContent: {
    width: 50,
    height: 50,
  },
  uploadImage: {
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
