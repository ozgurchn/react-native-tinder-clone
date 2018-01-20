import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Header } from '../components';

export default class Edit extends Component {
  static navigatorStyle = {
		navBarHidden: true,
  }

  render() {
    return (
      <View style={styles.container}>
        <Header 
          title={'Edit'}
          leftButton={() => this.props.navigator.pop()} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});