/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Home, Chat, Profile } from './src/views';
import CustomTabBar from './src/components/custom_tab_bar';
import { Tinder, User, Message } from './src/assets';

export default class App extends Component {
  static navigatorStyle = {
		navBarHidden: true,
  }
  
  constructor(props) {
    super(props);
    this.state={}
  }

  render() {
    return (
      <ScrollableTabView
        prerenderingSiblingsNumber={ 2 }
        renderTabBar={ () => <CustomTabBar /> }
        locked
        initialPage={1}
      >
        <Profile tabLabel={User} />
        <Home tabLabel={Tinder} />
        <Chat tabLabel={Message} />
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
