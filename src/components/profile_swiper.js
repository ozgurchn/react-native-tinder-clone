import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { size } from '../helpers/devices';
import { Rewind, Like, Boost, SuperLike, MapIcon, Key } from '../assets';

export default class ProfileSwiper extends Component {
  constructor(props) {
    super(props);
    this.state = {
        swiperShow:false,
    };
  }
  componentDidMount(){
      setTimeout(()=>{
          this.setState({
              swiperShow:true
          });
      },0)
  }
  render() {
    if (this.state.swiperShow) {
      return (
        <Swiper 
          style={styles.wrapper} 
          autoplay
          autoplayTimeout={2}
          animated={true}
        >
          <View style={styles.slide}>
            <View style={styles.title_container}>
              <Image source={Boost} style={styles.icon_style} />
              <Text style={styles.title_text}>Get Matches Faster</Text>
            </View>
            <Text style={styles.text}></Text>
          </View>
          <View style={styles.slide}>
            <View style={styles.title_container}>
              <Image source={SuperLike} style={styles.icon_style}/>
              <Text style={styles.title_text}>Stand Out With Super Likes</Text>
            </View>
            <Text style={styles.text}>You're 3x more likely to get a match!</Text>
          </View>
          <View style={styles.slide}>
            <View style={styles.title_container}>
              <Image source={MapIcon} style={styles.icon_style}/>
              <Text style={styles.title_text}>Swipe Around The World</Text>
            </View>
            <Text style={styles.text}>Passport to anywhere with Tinder Plus!</Text>
          </View>
          <View style={styles.slide}>
            <View style={styles.title_container}>
              <Image source={Key} style={styles.icon_style} />
              <Text style={styles.title_text}>Control Your Profile</Text>
            </View>
            <Text style={styles.text}>Limit what others see with Tinder Plus</Text>
          </View>
          <View style={styles.slide}>
            <View style={styles.title_container}>
              <Image source={Rewind} style={[styles.icon_style, {tintColor: 'rgb(250,177,11)'}]}/>
              <Text style={styles.title_text}>I Meant to Swipe Right</Text>
            </View>
            <Text style={styles.text}>Get unlimited Rewinds with Tinder Plus!</Text>
          </View>
          <View style={styles.slide}>
            <View style={styles.title_container}>
              <Image source={Like} style={styles.icon_style}/>
              <Text style={styles.title_text}>Increase Your Chances</Text>
            </View>
            <Text style={styles.text}>Get unlimited Likes with Tinder Plus!</Text>
          </View>
        </Swiper>
      );
    } else {
      return (
        <View />
      )
    }
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 100
  },
  title_container: { 
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title_text: {
    fontSize: size(22),
    fontWeight: '700',
    color: '#363636',
  },
  icon_style: {
    width: size(25),
    height: size(25),
    resizeMode: 'contain',
    marginRight: size(10),
  },
  slide: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: size(10),
    color: '#363636',
    fontSize: size(16),
  }
});