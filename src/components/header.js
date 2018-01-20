import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class Header extends Component {
  renderLeftIcon() {
    return (
      <TouchableOpacity>
        <Text>Left</Text>
      </TouchableOpacity>
    )
  }

  renderRightIcon() {
    return (
      <TouchableOpacity>
        <Text>Left</Text>
      </TouchableOpacity>
    )
  }

  renderTitle(title) {
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
  }

  render() {
    const { leftButton, rightButton, title, headerStyle } = this.props;

    return (
      <View style={styles.container}>
				<View style={ [styles.header_container, headerStyle] }>
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
  },
  title_container: {
		flex: 5,
		justifyContent: 'center',
		alignItems: 'center',
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
		fontSize: size(16),
		fontWeight: '600',
		color: 'white',
	},
});