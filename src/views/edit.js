import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Switch,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Header, Collapsable } from '../components';
import { size } from '../helpers/devices';
import * as Statics from '../helpers/statics';

export default class Edit extends Component {
  static navigatorStyle = {
		navBarHidden: true,
  }

  constructor (props) {
    super(props);
    this.state = {
      smartPhotos: false,
      desc: '',
    }
  }

  renderPhotosContainer() {
    return (
      <View style={styles.photos_container}>
        <View style={styles.photo_row}>
          <View style={styles.big_picture_container}>
          <ImageBackground 
            style={styles.big_picture_style}
            source={{uri: 'https://avatars0.githubusercontent.com/u/7205900?s=400&v=4'}}
          >
            <Text style={styles.photo_counter}>1</Text>
            <View style={styles.delete_button_container}>
              <Text style={styles.delete_button_style}>X</Text>
            </View>
          </ImageBackground>
          </View>
          <View style={styles.horizontal_photos_container}>
            <ImageBackground 
              style={styles.picture_style}
              source={{uri: 'https://pbs.twimg.com/profile_images/681369932207013888/CHESpTzF.jpg'}}
            >
              <Text style={styles.photo_counter}>2</Text>
              <View style={styles.delete_button_container}>
                <Text style={styles.delete_button_style}>X</Text>
              </View>
            </ImageBackground>
            <ImageBackground 
              style={styles.picture_style}
              source={{uri: 'https://c1.staticflickr.com/6/5252/5403292396_0804de9bcf_b.jpg'}}
            >
              <Text style={styles.photo_counter}>3</Text>
              <View style={styles.delete_button_container}>
                <Text style={styles.delete_button_style}>X</Text>
              </View>
            </ImageBackground>
          </View>
        </View>
        <View style={styles.photo_row}>
          <ImageBackground 
            style={styles.picture_alt_style}
            source={{uri: ''}}
          >
            <Text style={styles.photo_counter}>4</Text>
          </ImageBackground>
          <ImageBackground 
            style={styles.picture_alt_style}
            source={{uri: ''}}
          >
            <Text style={styles.photo_counter}>5</Text>
          </ImageBackground>
          <ImageBackground 
            style={styles.picture_alt_style}
            source={{uri: ''}}
          >
            <Text style={styles.photo_counter}>6</Text>
          </ImageBackground>
        </View>
      </View>
    )
  }

  renderSmartPhotosContainer() {
    return (
      <View>
        <View style={styles.smart_photos_container}>
          <Text style={styles.smart_photo_title_style}>Akıllı Fotoğraflar</Text>
          <Switch
            onValueChange={(value) => this.setState({smartPhotos: !this.state.smartPhotos})}
            value={this.state.smartPhotos}
            onTintColor={'rgb(247,196,198)'}
            thumbTintColor={this.state.smartPhotos ? 'rgb(229,74,80)' : 'rgb(232,232,232)'}
          />
        </View>
        <Text style={styles.smart_photo_subtitle_style}>Akıllı Fotoğraflar, profil fotoğraflarını sürekli olarak test ederek ilk görünmesini en uygun olanı seçer.</Text>
      </View>
    )
  }

  renderWhoIsContainer(name) {
    return (
      <View style={{marginBottom: size(10)}}>
        <Text style={styles.who_is_title_text}>Kim bu {name}</Text>
        <View style={styles.who_is_textinput_container}>
          <TextInput
            style={styles.multi_text_input_filed}
            onChangeText={(a) => this.setState({desc: a})}
            multiline={true}
            blurOnSubmit={false}
            maxLength={500}
            underlineColorAndroid={'rgba(0,0,0,0)'}
            textAlignVertical='top'
            placeholder={''}
            placeholderTextColor={'rgb(57,162,254)'}
            value={this.state.desc}
          />
        </View>
      </View>
    )
  }

  renderJobContainer(name) {
    return (
      <View style={{marginBottom: size(10)}}>
        <Text style={styles.who_is_title_text}>Mevcut İş</Text>
        <TouchableOpacity 
          style={styles.who_is_textinput_container}
          onPress={() => alert('pressed')}
        >
          <Text>İşi Seç</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderSchoolContainer(name) {
    return (
      <View style={{marginBottom: size(10)}}>
        <Text style={styles.who_is_title_text}>Okul</Text>
        <TouchableOpacity 
          style={styles.who_is_textinput_container}
          onPress={() => alert('pressed')}
        >
          <Text>Okul Seç</Text>
        </TouchableOpacity>
      </View>
    )
  }

  popToScreen() {
    if(Platform.OS === 'ios') {
      this.props.navigator.pop();
    } else {
      this.props.navigator.dismissModal({animationType: 'slide-down'})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Collapsable 
          renderHeader={
            <Header 
              title={'Edit'}
              leftButton={() => this.popToScreen()} 
            />
          }
        >
          {this.renderPhotosContainer()}
          {this.renderSmartPhotosContainer()}
          {this.renderWhoIsContainer('Ozgur')}
          {this.renderJobContainer()}
          {this.renderSchoolContainer()}
        </Collapsable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(244,246,251)',
  },
  //------------------PHOTOS CONTAINER------------------//
  photos_container: {
    margin: size(10),
  },
  photo_row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: size(5),
  },
  big_picture_container: {
    flex: 3,
  },
  horizontal_photos_container: {
    flex: 1.5,
  },
  big_picture_style: {
    width:  size(Statics.DEVICE_WIDTH / 1.6),
    height: size(Statics.DEVICE_WIDTH / 1.6)  + size(10),
    borderRadius: size(5),
    overflow: 'hidden',
  },
  picture_style: {
    width:  size(Statics.DEVICE_WIDTH / 3.2),
    height: size(Statics.DEVICE_WIDTH / 3.2),
    borderRadius: size(5),
    overflow: 'hidden',
    marginVertical: size(5),
  },
  picture_alt_style: {
    backgroundColor: '#e1e3e8',
    borderWidth: 1,
    borderColor: '#c6c6c6',
    width:  size(Statics.DEVICE_WIDTH / 3.2),
    height: size(Statics.DEVICE_WIDTH / 3.2),
    borderRadius: size(5),
    overflow: 'hidden',
    marginRight: size(5),
  },
  photo_counter: {
    color: 'white',
    fontWeight: '700',
    fontSize: size(30),
    backgroundColor: 'transparent',
    padding: size(5),
  },
  delete_button_container: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    padding: size(10),
    backgroundColor: 'rgb(244,246,251)',
    width: size(40),
    height: size(40),
    borderRadius: size(80) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  delete_button_style: {
    fontSize: size(22),
    color: 'rgb(253,77,55)',
    backgroundColor: 'transparent',
    fontWeight: '900',
  },
  //-----------------------SMART PHOTOS--------------------//
  smart_photos_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: size(10),
    paddingHorizontal: size(20),
    paddingVertical: size(10),
    backgroundColor: 'white',
  },
  smart_photo_title_style: {
    color: 'rgb(253,77,55)',
    fontWeight: '600',
  },
  smart_photo_subtitle_style: {
    marginHorizontal: size(20),
    marginVertical: size(10),
    color: 'rgba(0,0,0,0.6)',
    fontSize: size(14),
  },
  //--------------------WHO IS CONTAINER-----------------//
  who_is_title_text: {
    marginHorizontal: size(20),
    marginTop: size(10),
    fontSize: size(16),
    fontWeight: '500',
  },
  who_is_textinput_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: size(10),
    paddingHorizontal: size(20),
    paddingVertical: size(10),
    backgroundColor: 'white',
  },
  multi_text_input_filed: {
    height: size(80),
  }
});