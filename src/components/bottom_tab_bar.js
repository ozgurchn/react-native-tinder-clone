import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Animated,
  Easing,
} from 'react-native';
import { size } from '../helpers/devices';
import * as Statics from '../helpers/statics';
import { Rewind, Dislike, SuperLike, Like, Boost } from '../assets';

export default class BottomTabBar extends Component {
  constructor(props) {
    super(props);
    this.scaleValue1 = new Animated.Value(0);
    this.scaleValue2 = new Animated.Value(0);
    this.scaleValue3 = new Animated.Value(0);
    this.scaleValue4 = new Animated.Value(0);
    this.scaleValue5 = new Animated.Value(0);
    this.onRewindPress = this.onRewindPress.bind(this);
    this.onDislikePress = this.onDislikePress.bind(this);
    this.onSuperLikePress = this.onSuperLikePress.bind(this);
    this.onLikePress = this.onLikePress.bind(this);
    this.onBoostPress = this.onBoostPress.bind(this);
    this.state={}
  }

  componentWillReceiveProps(props) {
    console.log('PRops', props);
  }

  scaleButton() {
    Animated.timing(
        this.scaleValue,
        {
          toValue: 1,
          duration: 300,
          easing: Easing.easeOutBack
        }
    ).start(() => {});
  }

  onRewindPress() {
    this.scaleValue1.setValue(0);
    Animated.timing(
      this.scaleValue1,
      {
        toValue: 1,
        duration: 300,
        easing: Easing.easeOutBack
      }
  ).start(() => {});
    this.props.onRewindPressed();
  }

  onDislikePress() {
    this.scaleValue2.setValue(0);
    Animated.timing(
      this.scaleValue2,
      {
        toValue: 1,
        duration: 300,
        easing: Easing.easeOutBack
      }
  ).start(() => {});
    this.props.onDislikePressed();
  }

  onSuperLikePress() {
    this.scaleValue3.setValue(0);
    Animated.timing(
      this.scaleValue3,
      {
        toValue: 1,
        duration: 300,
        easing: Easing.easeOutBack
      }
  ).start(() => {});
    this.props.onSuperLikePressed();
  }

  onLikePress() {
    this.scaleValue4.setValue(0);
    Animated.timing(
      this.scaleValue4,
      {
        toValue: 1,
        duration: 300,
        easing: Easing.easeOutBack
      }
  ).start(() => {});
    this.props.onLikePressed();
  }

  onBoostPress() {
    this.scaleValue5.setValue(0);
    Animated.timing(
      this.scaleValue5,
      {
        toValue: 1,
        duration: 300,
        easing: Easing.easeOutBack
      }
  ).start(() => {});
    this.props.onBoostPressed();
  }

  getCardStyle1() {
    const scale = this.scaleValue1.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.7, 1]
    });
      return {
        transform: [{ scale }]
      };
  }

  getCardStyle2() {
    const scale = this.scaleValue2.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.7, 1]
    });
      return {
        transform: [{ scale }]
      };
  }

  getCardStyle3() {
    const scale = this.scaleValue3.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.7, 1]
    });
      return {
        transform: [{ scale }]
      };
  }

  getCardStyle4() {
    const scale = this.scaleValue4.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.7, 1]
    });
      return {
        transform: [{ scale }]
      };
  }

  getCardStyle5() {
    const scale = this.scaleValue5.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.7, 1]
    });
      return {
        transform: [{ scale }]
      };
  }

  render() {
    const disableStyle = this.props.isDone ? {tintColor: 'rgb(209,215,223)'} : {}; 
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.onRewindPress} disabled={this.props.isDone}>
          <Animated.View style={[styles.button_container, this.getCardStyle1()]}>
            <Image source={Rewind} style={[styles.small_icon, {tintColor: 'rgb(250,177,11)'}, disableStyle]}/>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.onDislikePress}>
          <Animated.View style={[styles.button_container, this.getCardStyle2()]}>
            <Image source={Dislike} style={styles.large_icon}/>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.onSuperLikePress}>
          <Animated.View style={[styles.button_container, this.getCardStyle3()]}>
            <Image source={SuperLike} style={styles.small_icon}/>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.onLikePress}>
          <Animated.View style={[styles.button_container, this.getCardStyle4()]}>
              <Image source={Like} style={styles.large_icon}/>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.onBoostPress}>
          <Animated.View style={[styles.button_container, this.getCardStyle5()]}>
            <Image source={Boost} style={styles.small_icon}/> 
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: size(10),
  },
  button_container: {
    padding: size(15),
    backgroundColor: 'white',
    borderRadius: 30,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    overflow: 'hidden'
  },
  small_icon: {
    width: size(20),
    height: size(20),
    resizeMode: 'contain',
  },
  large_icon: {
    width: size(30),
    height: size(30),
    resizeMode: 'contain',
  },
})