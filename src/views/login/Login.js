/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
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

function Login({route, navigation}) {
  let [loginName, setLoginName] = useState('');
  let [password, setPassword] = useState('');
  let [visibleToast, setVisibleToast] = useState(false);
  let [message, setMessage] = useState('');
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
   * 显示toast
   */
  function showToast(message) {
    setMessage(message);
    setVisibleToast(true);
  }
  /**
   * 登录按钮的点击事件
   */
  function handleLogin() {
    if (loginName === 'admin' && password === '12345') {
      navigation.navigate('Home', {initialRouteName: 'FixedAssets'});
    } else {
      Toast.show({
        text: '账号或密码错误',
        textStyle: {textAlign: 'center'},
        // buttonText: '确定',
        position: 'top',
        type: 'warning',
        duration: 2000,
      });
    }
  }

  return (
    <Root>
      <Container>
        <Content style={styles.content}>
          <Text style={styles.titleText}>欢迎登录管理系统</Text>
          <Form>
            <Item floatingLabel>
              <Label>账号</Label>
              <Input
                placeholder="请输入账号"
                value={loginName}
                onChangeText={changeLoginName}></Input>
            </Item>
            <Item floatingLabel>
              <Label>密码</Label>
              <Input
                placeholder="请输入密码"
                value={password}
                keyboardType="number-pad"
                onChangeText={changePassword}></Input>
            </Item>
          </Form>
          <Button full iconLeft onPress={handleLogin} style={{marginTop: 30}}>
            <Icon name="paper-plane" />
            <Text>登录</Text>
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
  titleText: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingTop: '30%',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Login;
