import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import { size } from '../helpers/devices';

export default class Box extends Component {
  static propTypes = {
    style: PropTypes.any,
    centered: PropTypes.bool,
    onPress: PropTypes.func,
	}

	static defaultProps = {
    style: {},
    centered: false,
    onPress: () => {},
  }

  render() {
    const { style, centered, onPress } = this.props;
    const centeredStyle = centered ? 
      { justifyContent: 'center', alignItems: 'center' } : 
      { justifyContent: 'flex-start',};

    return (
      <TouchableOpacity 
        style={[styles.container, centeredStyle, style]}
        onPress={onPress}
      >
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: size(15),
    margin: size(5),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    borderRadius: size(5),
    backgroundColor: 'white',
    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 1,
  },
});