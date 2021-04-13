import React, {useState, useEffect} from 'react';
import {StyleSheet, Modal, TouchableOpacity, ScrollView} from 'react-native';
import {View, ListItem, Text, Left, Right, CheckBox, Radio} from 'native-base';

export default function Select(props) {
  let {
    value: cacheValue = [],
    renderView = ({value, label}) => label,
    options,
    type = 'single',
    placeholder = '未选择',
    customStyles = {},
  } = {...props};

  // 是否显示弹窗
  let [modalVisible, setModalVisible] = useState(false);

  /**
   * 是否显示对话框
   */
  function showModal(isShow = true) {
    setModalVisible(isShow);
  }
  /**
   * 选择
   */
  function Radiopress(item, index) {
    let find = cacheValue.findIndex(it => it.value === item.value);
    if (find > -1) {
      cacheValue.splice(find, 1);
    } else {
      if (type === 'single') {
        cacheValue = [item];
      } else if (type === 'multiple') {
        cacheValue.push(item);
      }
    }
    props.onChecked(cacheValue);
  }

  /**
   * 渲染modal中的列表选项内容
   */
  function renderModalContent() {
    if (!options || options.length == 0) {
      return (
        <Text style={{textAlign: 'center', fontSize: 14}}>暂无可选数据</Text>
      );
    }
    return options.map((item, index) => {
      return (
        <ListItem style={{width: 250}}>
          <Left>
            <Text style={styles.leftText}>{renderView(item)}</Text>
          </Left>
          <Right>
            {type === 'single' ? (
              <Radio
                color={'#529FF3'}
                selectedColor={'#529FF3'}
                selected={!!cacheValue.find(it => it.value === item.value)}
                onPress={() => {
                  Radiopress(item, index);
                }}></Radio>
            ) : (
              <CheckBox
                color={'#529FF3'}
                checked={!!cacheValue.find(it => it.value === item.value)}
                onPress={() => {
                  Radiopress(item, index);
                }}></CheckBox>
            )}
          </Right>
        </ListItem>
      );
    });
  }
  /**
   * 渲染文本
   */
  function renderText() {
    if (!cacheValue || cacheValue.length == 0) {
      return placeholder;
    }
    return cacheValue.map(item => renderView(item)).join('，');
  }

  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          showModal(false);
        }}>
        <TouchableOpacity
          style={styles.centeredView}
          onPress={() => {
            showModal(false);
          }}>
          <View style={styles.modalView}>
            <ScrollView style={{flexGrow: 0}}>
              {renderModalContent()}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
      <Text
        onPress={() => showModal(true)}
        numberOfLines={3}
        ellipsizeMode="tail"
        style={{...styles.textStyle, ...customStyles}}>
        {renderText()}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    maxHeight: '70%',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  leftText: {
    fontSize: 14,
  },
  textStyle: {
    fontSize: 14,
    marginRight: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
