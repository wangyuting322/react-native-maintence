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
} from '../../assets/styles/Global.js';
// 组件
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Vibration,
  Alert,
  Modal,
} from 'react-native';
// import {navigate} from '../../navigation/index';
import {Text, View, Button} from 'native-base';
// 图片放大查看
import ImageViewer from 'react-native-image-zoom-viewer';
/**
https://github.com/react-native-camera/react-native-camera/blob/master/docs/RNCamera.md
*/
import {RNCamera, FaceDetector} from 'react-native-camera';

function ScanFixedAssets({route, navigation}) {
  // 显示读取二维码
  let [showCode, setShowCode] = useState(true);
  // 相机
  let [camera, setCamera] = useState();
  // 相机的类型（前置镜头，后置镜头
  let [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
  // 图片路径
  let [imagePath, setImagePath] = useState();
  // 是否放大图片
  let [isBig, setIsBig] = useState(false);

  /**
   * 二维码扫描
   */
  function barcodeReceived(e) {
    if (showCode) {
      setShowCode(false);
      if (e) {
        // data -条码的文本表示形式（如果有）| rawData -条形码中编码的原始数据（如果有） | type -检测到的条形码的类型
        let {type, data, rawData, target, bounds} = {...e};
        Vibration.vibrate([0, 500], false);
        Alert.alert(
          '扫描成功',
          `扫描结果：
          条码的文本表示形式：${data},
          条码原始数据：${rawData},
          条码类型：${type}`,
          [
            {
              text: '确定',
              onPress: () => setShowCode(true),
            },
          ],
          {cancelable: true},
        );
      } else {
        Alert.alert(
          '提示',
          '扫描失败，请将手机对准二维码重新尝试',
          [
            {
              text: '确定',
            },
          ],
          {cancelable: false},
        );
      }
    }
  }
  /**
   * 拍照
   */
  const takePicture = async () => {
    if (camera) {
      const options = {quality: 0.5, base64: true, doNotSave: false};
      const data = await camera.takePictureAsync(options);
      console.log(data.uri);
      setImagePath(data.uri);
      console.log(imagePath);
    }
  };
  /**
   * 切换摄像头类型（前置摄像头和后置摄像头）
   */
  function switchCamera() {
    setCameraType(
      cameraType === RNCamera.Constants.Type.back
        ? RNCamera.Constants.Type.front // 0
        : RNCamera.Constants.Type.back, // 1
    );
  }
  /**
   * 是否放大
   */
  function handleBig(isBig) {
    setIsBig(isBig);
  }

  return (
    <View style={styles.wrapper}>
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
          imageUrls={[
            {
              url: imagePath,
            },
          ]}
          style={{width: '100%'}}
          // index={initIndex}
          enableImageZoom={true} // 是否开启手势缩放
          saveToLocalByLongPress={true} //是否开启长按保存
          menuContext={{saveToLocal: '保存图片', cancel: '取消'}}
        />
      </Modal>
      <View style={styles.cameraWrapepr}>
        {/**摄像头拍摄 */}
        <RNCamera
          ref={ref => {
            setCamera(ref);
          }}
          // captureTarget={RNCamera.constants.CaptureTarget.temp}
          style={styles.cameraWrapepr}
          type={cameraType}
          googleVisionBarcodeType={
            RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE
          }
          flashMode={RNCamera.Constants.FlashMode.auto}
          onBarCodeRead={barcodeReceived}></RNCamera>
      </View>
      <View style={styles.controller}>
        <Button onPress={takePicture}>
          <Text style={{fontSize: 14}}> 拍照 </Text>
        </Button>
        <Button onPress={switchCamera}>
          <Text style={{fontSize: 14}}> 转换摄像头 </Text>
        </Button>
      </View>
      {imagePath ? (
        <TouchableOpacity
          onPress={() => {
            handleBig(true);
          }}>
          <Image
            source={{uri: imagePath}}
            style={{width: 100, height: 100}}></Image>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    ...globalFlexStyle.columnFlex,
    flexGrow: 1,
  },
  cameraWrapepr: {
    flexGrow: 3,
    width: '100%',
  },
  controller: {
    ...globalFlexStyle.rowFlex,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});
export default ScanFixedAssets;
