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
  render() {
    return (
      <Swiper 
        style={styles.wrapper} 
        autoplay
        autoplayTimeout={2}
      >
        <View style={styles.slide}>
          <View style={styles.title_container}>
            <Image source={Boost} style={styles.icon_style} />
            <Text style={styles.title_text}>Daha Hızlı Eşleşme Yakala</Text>
          </View>
          <Text style={styles.text}></Text>
        </View>
        <View style={styles.slide}>
          <View style={styles.title_container}>
            <Image source={SuperLike} style={styles.icon_style}/>
            <Text style={styles.title_text}>Süper Like İle Ön Plana Çık</Text>
          </View>
          <Text style={styles.text}>Eşleşme şansın 3 kat daha fazla!</Text>
        </View>
        <View style={styles.slide}>
          <View style={styles.title_container}>
            <Image source={MapIcon} style={styles.icon_style}/>
            <Text style={styles.title_text}>Dünyanın Her Yerinde Kaydır</Text>
          </View>
          <Text style={styles.text}>Konumunu değiştiren Pasaport, Tinder Plus'da!</Text>
        </View>
        <View style={styles.slide}>
          <View style={styles.title_container}>
            <Image source={Key} style={styles.icon_style} />
            <Text style={styles.title_text}>Profilinizi Kontrol Edin</Text>
          </View>
          <Text style={styles.text}>Tinder plus ile profilinin istediğin bölümlerini gizle</Text>
        </View>
        <View style={styles.slide}>
          <View style={styles.title_container}>
            <Image source={Rewind} style={[styles.icon_style, {tintColor: 'rgb(250,177,11)'}]}/>
            <Text style={styles.title_text}>Sağa Kaydırmak İstemiştim</Text>
          </View>
          <Text style={styles.text}>Tinder plus ile sınırsız geri alma özelliği kazan!</Text>
        </View>
        <View style={styles.slide}>
          <View style={styles.title_container}>
            <Image source={Like} style={styles.icon_style}/>
            <Text style={styles.title_text}>Eşleşme Şansını Arttır</Text>
          </View>
          <Text style={styles.text}>Tinder plus ile sınırsız beğeni hakkı kazan!</Text>
        </View>
      </Swiper>
    );
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