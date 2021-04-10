/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Vibration, Alert} from 'react-native';
// import {navigate} from '../../navigation/index';
import {Text, View, Image} from 'native-base';
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

  return (
    <View style={styles.wrapper}>
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
      <View style={styles.controller}>
        <TouchableOpacity onPress={takePicture} style={styles.capture}>
          <Text style={{fontSize: 14}}> 拍照 </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={switchCamera} style={styles.capture}>
          <Text style={{fontSize: 14}}> 转换摄像头 </Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.controller}>
        <Image source={{imagePath}} style={{width: 100, height: 100}}></Image>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    flex: 1,
  },
  cameraWrapepr: {
    flex: 2,
    flexBasis: 300,
    width: '100%',
  },
  controller: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
export default ScanFixedAssets;
