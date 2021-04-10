/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {View} from 'react-native';
import {Container, Header, Item, Input, Icon, Button, Text} from 'native-base';

function Search() {
  let [search, setSearch] = useState('');

  function updateSearch(search) {
    setSearch(search);
  }

  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Input
            placeholder="请输入搜索内容"
            onChangeText={updateSearch}
            value={search}
          />
          <Icon name="ios-search" />
        </Item>
      </Header>
    </Container>
  );
}

export default Search;
