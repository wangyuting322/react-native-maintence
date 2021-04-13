import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CustomDateTime(props) {
  let {
    // value选中的值，格式：[{uri:'xxx',...},{uri:'xxx',...}]
    value: cacheTime = new Date(1598051730000),
    // 选择器类型，可选值： 'date' 日期 |'time' 时间
    mode = 'date',
    // 是否24小时制
    is24Hour = true,
    // "default" | "spinner" | "calendar" (only for date mode) | "clock" (only for time mode)
    display = 'default',
    // 可选的最大时间
    maximumDate = new Date(),
    // 可选的最小时间
    minimumDate = new Date(1950, 4, 4),
    placeholder = '请选择',
  } = {...props};

  let [showTimePicker, setShowTimePicker] = useState(false);
  /**
   * 点击日期选择器选择时间
   */
  function changeTime(event, date) {
    console.log(event, date);
    setShowTimePicker(false);
    props.onChangeTime(data);
  }
  /**
   * 渲染文本
   */
  function renderText() {
    if (!cacheTime) {
      return placeholder;
    }
    return cacheTime.toString();
  }
  return (
    <View>
      {/**日期选择器 */}
      {showTimePicker ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={cacheTime}
          mode={mode}
          is24Hour={is24Hour}
          display={display}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          onChange={changeTime}
        />
      ) : null}
      <Text
        style={styles.textStyle}
        onPress={() => {
          setShowTimePicker(true);
        }}>
        {renderText()}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 14,
    marginRight: 5,
    textAlign: 'right',
  },
});
