import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import { size } from '../helpers/devices';
import * as Statics from '../helpers/statics';
import { BackgroundLayer } from '../assets';

export default class TinderCard extends Component {
  render() {
    const { url, name, age, school } = this.props;

    return (
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: url}} 
          style={styles.news_image_style} 
        >
          <ImageBackground 
            style={styles.name_info_container}
            source={BackgroundLayer}
          >
            <Text style={styles.name_style}>{name}, {age}</Text>
            <Text style={styles.school_style}>{school}</Text>
          </ImageBackground>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  news_image_style: {
    width: Statics.DEVICE_WIDTH - size(25),
    height: size(550), // FIX ME ITS BAD
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginHorizontal: size(10),
    marginTop: size(10),
    borderRadius: 15,
    overflow: 'hidden'
  },
  name_info_container: {
    padding: size(20),
  },
  name_style: {
    fontSize: size(24),
    fontWeight: '700',
    color: 'white',
    marginBottom: size(5),
    backgroundColor: 'transparent',
  },
  school_style: {
    fontSize: size(18),
    fontWeight: '400',
    color: 'white',
    backgroundColor: 'transparent',
  },
});
