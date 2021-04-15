import React, {useState} from 'react';
// 全局样式
import {
  globalColor,
  globalSize,
  globalFlexStyle,
} from '../assets/styles/Global';
// 组件
import {StyleSheet} from 'react-native';
import {View, Text} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default function CustomDateTime(props) {
  let {
    // value选中的值，格式：[{uri:'xxx',...},{uri:'xxx',...}]
    value: cacheTime = new Date(),
    // 选择器类型，可选值： 'date' 日期 |'time' 时间
    mode = 'date',
    // 是否24小时制
    is24Hour = true,
    // 可选的最大时间
    maximumDate = new Date(),
    // 可选的最小时间
    minimumDate = new Date(1960, 1, 1),
    placeholder = '请选择',
  } = {...props};

  // 是否显示日期选择器
  let [showDatePicker, setShowDatePicker] = useState(false);
  // 是否显示时间选择器
  let [showTimePicker, setShowTimePicker] = useState(false);
  let [cacheDateTime, setCacheDateTime] = useState(cacheTime);

  /**
   * 修改日期
   */
  function changeDate({nativeEvent, type}, timestamp) {
    if (type === 'set') {
      if (mode == 'date') {
        setShowDatePicker(false);
        setShowTimePicker(false);
        props.onChangeTime(formatDateTime(timestamp || cacheTime));
      } else {
        setShowDatePicker(false);
        setCacheDateTime(timestamp);
        setShowTimePicker(true);
      }
    } else if (type === 'dismissed') {
      setShowDatePicker(false);
      setShowTimePicker(false);
    }
  }
  /**
   * 点击日期选择器选择时间
   */
  function changeTime({nativeEvent, type}, timestamp) {
    if (type === 'set') {
      setShowDatePicker(false);
      setShowTimePicker(false);
      props.onChangeTime(formatDateTime(timestamp));
    } else if (type === 'dismissed') {
      setShowDatePicker(true);
      setShowTimePicker(false);
    }
  }
  /**
   * 格式化最终要传递的值
   */
  function formatDateTime(timestamp) {
    if (mode === 'date') {
      return moment(timestamp).format('YYYY-MM-DD');
    }
    return moment(timestamp).format('YYYY-MM-DD	HH:mm');
  }
  /**
   * 渲染文本
   */
  function renderText() {
    if (!cacheTime) {
      return placeholder;
    }
    return formatDateTime(cacheTime);
  }

  return (
    <View>
      {/**日期选择器 */}
      {showDatePicker ? (
        <DateTimePicker
          // testID="datePicker"
          value={cacheDateTime}
          is24Hour={true}
          mode="date"
          display="default"
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          onChange={changeDate}
        />
      ) : null}
      {/**时间选择器 */}
      {showTimePicker ? (
        <DateTimePicker
          // testID="datePicker"
          value={cacheDateTime}
          mode="time"
          is24Hour={true}
          // neutralButtonLabel="选择日期"
          display="clock"
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          onChange={changeTime}
        />
      ) : null}
      <Text
        style={styles.textStyle}
        onPress={() => {
          setShowDatePicker(true);
        }}>
        {renderText()}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    ...globalSize.textSize,
    marginRight: 5,
    textAlign: 'right',
  },
});
