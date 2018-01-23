import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { size } from '../helpers/devices';
import * as Statics from '../helpers/statics';
import { Back } from '../assets';

export default class Header extends Component {
  static propTypes = {
		leftButton: PropTypes.func,
		rightButton: PropTypes.func,
    title: PropTypes.string,
    headerStyle: PropTypes.object,
	}

	static defaultProps = {
    leftButton: null,
    rightButton: null,
    title: '',
    headerStyle: {},
  }

  renderLeftIcon(leftButton) {
    if (leftButton) {
      return (
        <TouchableOpacity 
          onPress={leftButton}
          style={styles.left_icon_container}
        >
          <Image source={Back} style={styles.icon_style} />
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={styles.left_icon_container} />
      );
    }
  }

  renderRightIcon(rightButton) {
    if (rightButton) {
      return (
        <TouchableOpacity 
          onPress={rightButton}
          style={styles.right_icon_container}
        >
          <Text>Right</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <View style={styles.right_icon_container} />
      )
    }
  }

  renderTitle(title) {
    if (this.props.title !== '') {
      return (
        <View style={styles.title_container}>
          <Text 
            style={styles.title_text}
            numberOfLines={ 1 } 
            ellipsizeMode={ 'tail' }
          >
            {title}
          </Text>
        </View>
      )
    } else {
      return (
        <View style={styles.title_container}>
          {this.props.renderTitleComponent}
        </View>
      )
    }
  }

  render() {
    const { leftButton, rightButton, title, headerStyle } = this.props;
    const marginTop = Platform.OS === 'ios' ? { paddingTop: size(10)} : {};

    return (
      <View style={styles.container}>
				<View style={ [styles.header_container, headerStyle, marginTop] }>
					{ Statics.IS_ANDROID ? StatusBar.setBarStyle('light-content', true) : null }
					{this.renderLeftIcon(leftButton) }
          {this.renderTitle(title) }
          {this.renderRightIcon(rightButton)}
				</View>
			</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: size(75),
  },
  header_container: {
    flex: 1,
		flexDirection: 'row',
		backgroundColor: 'white',
    maxHeight: size(80),
    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  title_container: {
    flex: 5,
    justifyContent: 'center',
	},
	left_icon_container: {
		flex: 1,
		justifyContent: 'center',
    alignItems: 'center',
	},
	right_icon_container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
  },
  title_text: {
		fontSize: size(18),
		fontWeight: '600',
    color: '#363636',
    marginLeft: size(15),
  },
  icon_style: {
    width: size(20),
    height: size(20),
    resizeMode: 'contain',
  }
});