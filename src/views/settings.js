import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
  Switch,
  Slider,
} from 'react-native';
import { Header, Box, Collapsable } from '../components';
import { Tinder, Boost, SuperLike } from '../assets';
import { size } from '../helpers/devices';

const CustomLayoutAnimation = {
  duration: 500,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.5,
  },
};

export default class Settings extends Component {
  static navigatorStyle = {
		navBarHidden: true,
  }

  constructor (props) {
    super(props);
    this.state = {
      male: true,
      female: false,
      distance: 2,
      age: 19,
    }
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentWillUpdate() {
    LayoutAnimation.configureNext(CustomLayoutAnimation);
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
          <Text style={styles.tinder_subtitle_style}>Unlock Our Most Exclusive Features</Text>
        </Box>
        <Box centered>
          <View style={styles.tinder_box_container}>
            <Image source={Tinder} style={styles.tinder_icon_style} />
            <Text style={styles.tinder_title_style}>tinder</Text>
            <Text style={styles.tinder_plus_style}>+</Text>
          </View>
          <Text style={styles.tinder_subtitle_style}>Unlimited Likes & More!</Text>
        </Box>
        <View style={styles.boost_super_like_container}>
          <Box style={{flex: 1}} centered>
            <View style={styles.boost_super_like_icon_container}>
              <Image source={Boost} style={styles.tinder_alt_icon_style} />
            </View>
            <Text style={styles.boost_text_style}>Get Boosts</Text>
          </Box>
          <Box style={{flex: 1}} centered>
            <View style={styles.boost_super_like_icon_container}>
              <Image source={SuperLike} style={styles.tinder_alt_icon_style} />
            </View>
            <Text style={styles.super_like_text_style}>Get Super Likes</Text>
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
          <Text>Swiping in:</Text>
          <Text style={styles.location_text}>My Current Location</Text>
        </Box>
        <Text style={styles.location_subtext}>Change your swipe location to see Tinder members in other cities.</Text>
      </View>
    );
  }

  renderShowMeContainer() {
    const male = this.state.male ? 'Men' : '';
    const female = this.state.female ? 'Women' : '';
    return (
      <View style={styles.show_me_container}>
        <Box style={styles.show_me_inner_container}>
          <View style={styles.show_me_title_container}>
            <Text style={styles.show_me_text}>Show Me</Text>
            <Text style={styles.gender_text}>{`${male} ${female}`}</Text>
          </View>
          <View style={styles.show_me_settings_container}>
            <View style={styles.show_me_row_container}>
              <Text>Men</Text>
              <Switch
                onValueChange={(value) => this.onGenderChange('male', value)}
                value={this.state.male}
                onTintColor={'rgb(247,196,198)'}
                thumbTintColor={this.state.male ? 'rgb(229,74,80)' : 'rgb(232,232,232)'}
                
              />
            </View>
            <View style={styles.show_me_row_container}>
              <Text>Women</Text>
              <Switch
                onValueChange={(value) => this.onGenderChange('female', value)}
                value={this.state.female}
                onTintColor={'rgb(247,196,198)'}
                thumbTintColor={this.state.female ? 'rgb(229,74,80)' : 'rgb(232,232,232)'}
                
              />
            </View>
          </View>
        </Box>
      </View>
    );
  }

  renderDistanceContainer() {
    return (
      <View style={styles.distance_container}>
        <Box>
          <View style={styles.show_me_title_container}>
            <Text style={styles.show_me_text}>Maximum Distance</Text>
            <Text style={styles.gender_text}>{this.state.distance}km.</Text>
          </View>
          <View style={styles.show_me_settings_container}>
            <View style={styles.show_me_row_container}>
              <Slider
                style={{flex: 1}}
                step={1}
                minimumValue={2}
                maximumValue={161}
                value={this.state.distance}
                onValueChange={val => this.setState({ distance: val })}
                thumbTintColor={'rgb(229,74,80)'}
                minimumTrackTintColor={'rgb(253,77,55)'}
              />
            </View>
          </View>
        </Box>
      </View>
    )
  }

  renderAgeContainer() {
    return (
      <View style={styles.age_container}>
        <Box>
          <View style={styles.show_me_title_container}>
            <Text style={styles.show_me_text}>Age Range</Text>
            <Text style={styles.gender_text}>19 - {this.state.age}</Text>
          </View>
          <View style={styles.show_me_settings_container}>
            <View style={styles.show_me_row_container}>
              <Slider
                style={{flex: 1}}
                step={1}
                minimumValue={19}
                maximumValue={55}
                value={this.state.age}
                onValueChange={val => this.setState({ age: val })}
                thumbTintColor={'rgb(229,74,80)'}
                minimumTrackTintColor={'rgb(253,77,55)'}
              />
            </View>
          </View>
        </Box>
      </View>
    );
  }

  onGenderChange(type, value) {
    this.setState({
      [type]: value,
    });
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
              title={'Settings'}
              leftButton={() => this.popToScreen()} 
            />
          }
        >
          {this.renderPremiumFeatureContainer()}
          {this.renderTitleContainer('Discovery Settings')}
          {this.renderLocationContainer()}
          {this.renderShowMeContainer()}
          {this.renderDistanceContainer()}
          {this.renderAgeContainer()}
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
    color: 'rgba(0,0,0,0.5)',
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
  },
  //--------------------SHOW ME CONTAINER----------------//
  show_me_container: {
    margin: size(10),
  },
  show_me_title_container: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  gender_text: {
    fontSize: size(18),
    fontWeight: '600',
  },
  show_me_text: {
    fontSize: size(18),
    fontWeight: '600',
    color: 'rgb(253,77,55)',
  },
  show_me_settings_container: { 
    marginTop: size(10),
  },
  show_me_row_container: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: size(10),
  },
  //----------------------DISCTANCE CONTAINER--------------------//
  distance_container: {
    marginHorizontal: size(10),
    marginVertical: size(5),
  },
  //----------------------AGE CONTAINER-------------------------//
  age_container: {
    marginHorizontal: size(10),
    marginVertical: size(5),
  },
});