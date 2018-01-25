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
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      visible: true
    }
    console.disableYellowBox = true;
  }


  onNavigatorEvent(event) {
    if (event.id === 'willAppear') {
      this.setState({
        visible: true
      });
    }
    if (event.id === 'willDisappear') {
      this.setState({
        visible: false
      });
    }
  }

  render() {
    return (
      <ScrollableTabView
        prerenderingSiblingsNumber={ 2 }
        renderTabBar={ () => <CustomTabBar /> }
        locked
        initialPage={1}
        style={{flex: this.state.visible ? 1 : 0}}
      >
        <Profile tabLabel={User} navigator={this.props.navigator} />
        <Home tabLabel={Tinder} navigator={this.props.navigator} />
        <Chat tabLabel={Message} navigator={this.props.navigator} />
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
