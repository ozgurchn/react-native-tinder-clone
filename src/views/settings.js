import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import { Header, Box } from '../components';
import { Tinder, Boost, SuperLike } from '../assets';
import { size } from '../helpers/devices';

export default class Settings extends Component {
  static navigatorStyle = {
		navBarHidden: true,
  }

  renderPremiumFeatureContainer() {
    return (
      <View style={{margin: size(10)}}>
        <Box centered>
          <View style={styles.tinder_box_container}>
            <Image source={Tinder} style={[styles.tinder_icon_style, {tintColor: '#DAA520'}]} />
            <Text style={styles.tinder_title_style}>tinder</Text>
            <Text style={styles.tinder_gold_style}>GOLD</Text>
          </View>
          <Text style={styles.tinder_subtitle_style}>En Ayrıcalıklı Özelliklerimize Sahip Ol</Text>
        </Box>
        <Box centered>
          <View style={styles.tinder_box_container}>
            <Image source={Tinder} style={styles.tinder_icon_style} />
            <Text style={styles.tinder_title_style}>tinder</Text>
            <Text style={styles.tinder_plus_style}>+</Text>
          </View>
          <Text style={styles.tinder_subtitle_style}>Sınırsız Beğeni ve Daha Fazlası</Text>
        </Box>
        <View style={styles.boost_super_like_container}>
          <Box style={{flex: 1}} centered>
            <View style={styles.boost_super_like_icon_container}>
              <Image source={Boost} style={styles.tinder_alt_icon_style} />
            </View>
            <Text style={styles.boost_text_style}>Boost Satın Al</Text>
          </Box>
          <Box style={{flex: 1}} centered>
            <View style={styles.boost_super_like_icon_container}>
              <Image source={SuperLike} style={styles.tinder_alt_icon_style} />
            </View>
            <Text style={styles.super_like_text_style}>Super Like Satın Al</Text>
          </Box>
        </View>
      </View>
    );
  }

  renderTitleContainer(title) {
    return (
      <View style={styles.title_container}>
        <Text style={styles.title_text}>{title}</Text>
      </View>
    )
  }

  renderLocationContainer() {
    return (
      <View style={styles.location_container}>
        <Box style={styles.location_inner_container}>
          <Text>Şurada kaydırılıyor:</Text>
          <Text style={styles.location_text}>Şu Anki Yerim</Text>
        </Box>
        <Text style={styles.location_subtext}>Diğer şehirlerdeki Tinder üyelerini görmek için kayrdırma konumunu değiştirin</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header 
          title={'Settings'}
          leftButton={() => this.props.navigator.pop()} 
        />
        {this.renderPremiumFeatureContainer()}
        {this.renderTitleContainer('Keşfet Ayarları')}
        {this.renderLocationContainer()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(244,246,251)',
  },
  //------------PREMIUM FEATURE-------------//
  boost_super_like_container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tinder_box_container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tinder_icon_style: {
    width: size(20),
    height: size(20),
    resizeMode: 'contain',
  },
  tinder_title_style: {
    fontSize: size(24),
    fontWeight: '700',
    color: 'black',
  },
  tinder_subtitle_style: {
    fontSize: size(14),
    fontWeight: '400',
    color: '#363636',
  },
  tinder_gold_style: {
    marginLeft: size(5),
    fontSize: size(12),
    backgroundColor: '#DAA520',
    padding: size(3),
    color: 'white',
  },
  tinder_plus_style: {
    fontSize: size(26),
    color: 'rgb(253,77,55)',
  },
  tinder_alt_icon_style: {
    width: size(20),
    height: size(20),
    resizeMode: 'contain',
  },
  tinder_alt_icon_style: {
    width: size(30),
    height: size(30),
    resizeMode: 'contain',
  },
  boost_super_like_icon_container: {
    padding: size(10),
    borderRadius: size(60) / 2,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#ddd',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  boost_text_style: {
    marginTop: size(5),
    fontSize: size(14),
    fontWeight: '500',
    color: 'purple',
  },
  super_like_text_style: {
    marginTop: size(5),
    fontSize: size(14),
    fontWeight: '500',
    color: 'rgb(22,168,191)',
  },
  //-----------------------TITLE CONTAINER----------------//
  title_container: {
    marginLeft: size(20),
    marginVertical: size(10),
  },
  title_text: {
    fontSize: size(18),
    color: 'black',
    fontWeight: '600',
  },
  //---------------------LOCATION CONTAINER-----------------//
  location_container: {
    marginHorizontal: size(10)
  },
  location_inner_container: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  location_text: {
    fontSize: size(16),
    color: '#126ce2',
    fontWeight: '600',
  },
  location_subtext: {
    fontSize: size(14),
    color: 'rgba(0,0,0,0.5)',
    marginHorizontal: size(7),
  }
});