/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
// 全局样式
import {
  globalColor,
  globalSize,
  globalFlexStyle,
} from '../../assets/styles/Global.js';
// 组件
import {StyleSheet} from 'react-native';
import {
  Container,
  View,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Icon,
  Text,
  Toast,
  Root,
} from 'native-base';
// 接口
import axios from 'axios';
import {setToken, getToken} from '../../utils/Storage';

function Login({route, navigation}) {
  let [loginName, setLoginName] = useState('');
  let [password, setPassword] = useState('');

  /**
   * 修改账号
   */
  function changeLoginName(text) {
    setLoginName(text);
  }
  /**
   * 修改密码
   */
  function changePassword(text) {
    setPassword(text);
  }
  /**
   * 登录按钮的点击事件
   */
  function handleLogin() {
    axios({
      url: 'http://121.40.228.54:8083/system/login',
      method: 'POST',
      data: {
        username: loginName,
        password: password,
      },
    })
      .then(async ({data: res}) => {
        console.log(res);
        if (res.code == 200) {
          let token = res.data;
          // 存token
          setToken(token);
          // 取token
          let myToken = await getToken(token);
          // 跳转路由
          navigation.navigate('Home', {initialRouteName: 'FixedAssets'});
        } else {
          Toast.show({
            text: res.message,
            textStyle: {textAlign: 'center'},
            // buttonText: '确定',
            position: 'top',
            type: 'warning',
            duration: 2000,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <Root>
      <Container>
        <Content style={styles.content}>
          <Text style={styles.titleText}>欢迎登录管理系统</Text>
          <Form>
            <Item style={styles.item}>
              <Icon name="user" type="FontAwesome"></Icon>
              <Input
                style={styles.input}
                placeholder="请输入账号"
                value={loginName}
                onChangeText={changeLoginName}></Input>
            </Item>
            <Item>
              <Icon name="lock" type="FontAwesome"></Icon>
              <Input
                style={styles.input}
                placeholder="请输入密码"
                value={password}
                keyboardType="number-pad"
                onChangeText={changePassword}></Input>
            </Item>
          </Form>
          <Button
            full
            iconLeft
            primary
            onPress={handleLogin}
            style={styles.button}>
            <Icon name="paper-plane" />
            <Text style={styles.buttonText}>登录</Text>
          </Button>
        </Content>
      </Container>
    </Root>
  );
}

const styles = StyleSheet.create({
  content: {
    margin: 10,
    marginTop: 0,
  },
  item: {
    marginTop: 20,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingTop: '30%',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    ...globalSize.titleSize,
  },
  button: {
    marginTop: 50,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default Login;
