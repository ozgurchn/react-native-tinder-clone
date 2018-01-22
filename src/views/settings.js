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
  Animated,
} from 'react-native';
import { Header, Box } from '../components';
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

const NAVBAR_HEIGHT = 80;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 10, android: 14 });

export default class Settings extends Component {
  static navigatorStyle = {
		navBarHidden: true,
  }

  constructor (props) {
    super(props);
    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);

    this.state = {
      male: true,
      female: false,
      distance: 2,
      age: 19,
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
          offsetAnim,
        ),
        0,
        NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
      ),
    }
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  _clampedScrollValue = 0;
  _offsetValue = 0;
  _scrollValue = 0;

  componentDidMount() {
    this.state.scrollAnim.addListener(({ value }) => {
      const diff = value - this._scrollValue;
      this._scrollValue = value;
      this._clampedScrollValue = Math.min(
        Math.max(this._clampedScrollValue + diff, 0),
        NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
      );
    });
    this.state.offsetAnim.addListener(({ value }) => {
      this._offsetValue = value;
    });
  }

  componentWillUnmount() {
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
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

  renderShowMeContainer() {
    const male = this.state.male ? 'Erkekler' : '';
    const female = this.state.female ? 'Kadınlar' : '';
    return (
      <View style={styles.show_me_container}>
        <Box style={styles.show_me_inner_container}>
          <View style={styles.show_me_title_container}>
            <Text style={styles.show_me_text}>Bana Göster</Text>
            <Text style={styles.gender_text}>{`${male} ${female}`}</Text>
          </View>
          <View style={styles.show_me_settings_container}>
            <View style={styles.show_me_row_container}>
              <Text>Erkekler</Text>
              <Switch
                onValueChange={(value) => this.onGenderChange('male', value)}
                value={this.state.male}
                onTintColor={'rgb(253,77,55)'}
              />
            </View>
            <View style={styles.show_me_row_container}>
              <Text>Kadınlar</Text>
              <Switch
                onValueChange={(value) => this.onGenderChange('female', value)}
                value={this.state.female}
                onTintColor={'rgb(253,77,55)'}
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
            <Text style={styles.show_me_text}>Azami Mesafe</Text>
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
                thumbTintColor={'black'}
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
            <Text style={styles.show_me_text}>Yaş Aralığı</Text>
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
                thumbTintColor={'black'}
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

  _onScrollEndDrag = () => {
    this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250);
  };

  _onMomentumScrollBegin = () => {
    clearTimeout(this._scrollEndTimer);
  };

  _onMomentumScrollEnd = () => {
    const toValue = this._scrollValue > NAVBAR_HEIGHT &&
      this._clampedScrollValue > (NAVBAR_HEIGHT - STATUS_BAR_HEIGHT) / 2
      ? this._offsetValue + NAVBAR_HEIGHT
      : this._offsetValue - NAVBAR_HEIGHT;

    Animated.timing(this.state.offsetAnim, {
      toValue,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { clampedScroll } = this.state;

    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [0, - (NAVBAR_HEIGHT - STATUS_BAR_HEIGHT)],
      extrapolate: 'clamp',
    });
    const navbarOpacity = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.container}>
        <Animated.ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
            { useNativeDriver: true },
          )}
          onMomentumScrollBegin={this._onMomentumScrollBegin}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          onScrollEndDrag={this._onScrollEndDrag}
        >
          {this.renderPremiumFeatureContainer()}
          {this.renderTitleContainer('Keşfet Ayarları')}
          {this.renderLocationContainer()}
          {this.renderShowMeContainer()}
          {this.renderDistanceContainer()}
          {this.renderAgeContainer()}
        </Animated.ScrollView>
        <Animated.View style={[styles.navbar, { transform: [{ translateY: navbarTranslate }] }]}>
          <Header 
            title={'Settings'}
            leftButton={() => this.props.navigator.pop()} 
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(244,246,251)',
  },
  contentContainer: {
    paddingTop: size(75),
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
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