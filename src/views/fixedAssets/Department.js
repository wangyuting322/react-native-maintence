/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useRef} from 'react';
// 全局样式
import {
  globalColor,
  globalSize,
  globalFlexStyle,
} from '../../assets/styles/Global';
// 组件
import {View, FlatList, TouchableHighlight} from 'react-native';
import {
  Container,
  Header,
  Content,
  Item,
  Input,
  Icon,
  Button,
  Text,
  Toast,
  ListItem,
  Fab,
} from 'native-base';
import {getToken} from '../../utils/Storage';
// 接口
import axios from 'axios';

function Department() {
  let [search, setSearch] = useState({deptName: ''});
  let flat = useRef(null);
  let [refresh, setRefresh] = useState(false);
  let [deptList, setDeptList] = useState([]);
  let [current, setCurrent] = useState(1);
  let [deptName, setDeptName] = useState('');
  let [size, setSize] = useState(5);
  let [token, setToken] = useState();
  /**
   * 获取搜索框中的字
   */
  function updateSearch(search) {
    setSearch({deptName: search});
  }
  /**
   * 修改带搜索的部门名称
   */
  function changeDeptName() {
    setDeptName(search.deptName);
  }
  /**
   * 获取部门列表信息
   */
  function getDeptList(myToken) {
    return axios({
      url: 'http://不能告诉你:8083/system/dept/list',
      method: 'GET',
      params: {
        current: 1,
        size: size * current,
        deptName: deptName,
      },
      headers: {
        Authorization: `Bearer ${myToken || token}`,
      },
    })
      .then(({data: res}) => {
        let {code, data, message} = res;
        if (code !== 200) {
          Toast.show({
            text: message,
            textStyle: {textAlign: 'center'},
            position: 'top',
            type: 'warning',
            duration: 2000,
          });
        } else {
          let {records} = data;
          setDeptList(records);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  /**
   * 滚动区域回到顶部
   */
  function toTop() {
    flat.current.scrollToOffset({offset: 0});
  }
  /**
   * 刷新
   */
  function reload() {
    setCurrent(1);
    setSearch('');
    setDeptName('');
    toTop();
  }
  /**
   * 首次获取数据
   */
  useEffect(async () => {
    setRefresh(true);
    let myToken = await getToken('token');
    setToken(myToken);
    // 获取部门列表数据
    await getDeptList(myToken);
    setRefresh(false);
  }, []);

  useEffect(async () => {
    setRefresh(true);
    // 获取部门列表数据
    await getDeptList();
    setRefresh(false);
  }, [deptName, current, size]);

  function renderItem(data) {
    let {index, item} = data;
    return (
      <View style={{height: 200}}>
        <Text>{item.deptName}</Text>
      </View>
    );
  }
  return (
    <Container style={{flexGrow: 1}}>
      {/**搜索栏 */}
      <Header searchBar rounded>
        <Item>
          <Input
            placeholder="请输入搜索的部门名称"
            onChangeText={updateSearch}
            value={search}
          />
          <Icon
            name="ios-search"
            style={{height: 30}}
            onPress={changeDeptName}
          />
        </Item>
      </Header>
      {/**内容滚动栏 */}
      <FlatList
        ref={flat}
        data={deptList}
        renderItem={renderItem}
        // getItemLayout={(data, index) => ({
        //   length: 200,
        //   offset: 200 * index,
        //   index,
        // })}
        keyExtractor={item => item.deptId}
        // 显示刷新
        refreshing={refresh}
        //
        onRefresh={reload}
        // 上拉加载更多数据
        onEndReachedThreshold={0.1}
        // 获取更多
        onEndReached={() => {
          setCurrent(current + 1);
        }}
        numColumns={1}
        ListEmptyComponent={
          <Text style={{textAlign: 'center', margin: 10}}>暂无数据</Text>
        }
        // ListFooterComponent={
        //   deptList.length === 0 ? null : (
        //     <TouchableHighlight
        //       underlayColor={globalColor.shadowColor.backgroundColor}
        //       onPress={() => {
        //         setCurrent(current + 1);
        //       }}>
        //       <Text style={{textAlign: 'center', margin: 10}}>
        //         获取更多数据
        //       </Text>
        //     </TouchableHighlight>
        //   )
        // }
        progressViewOffset={50}
      />
      {/**工具栏 */}
      <Fab
        style={{backgroundColor: '#5067FF'}}
        position="bottomRight"
        onPress={toTop}>
        <Icon name="arrow-circle-up" type="FontAwesome" />
      </Fab>
    </Container>
  );
}

export default Department;
