import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { size } from '../helpers/devices';
import * as Statics from '../helpers/statics';
let CustomScrollView = ScrollView;

export default class CustomTabBar extends Component {
	static propTypes = {
		goToPage: PropTypes.func,
		tabs: PropTypes.arrayOf(PropTypes.string),
		activeTab: PropTypes.number,
	}

	static defaultProps = {
		goToPage: () => {},
		tabs: [],
		activeTab: 0,
	}

	constructor(props) {
		super(props);

		this.scrollWidth = 0;
		this.scrollHeight = 0;
		this.elementCount = this.props.tabs.length;
	}

	tabPressed(i) {
		this.props.goToPage(i);
	}

	render() {
		const newMargin = Statics.IS_ANDROID ? { marginTop: size(15) } : {};
		const maxHeight = Statics.IS_ANDROID ? { maxHeight: size(60) } : {};
		return (
			<ScrollView
				ref={ (scrollView) => { CustomScrollView = scrollView; } }
				horizontal
				showsHorizontalScrollIndicator={ false }
				showsVerticalScrollIndicator={ false }
				automaticallyAdjustContentInsets
				scrollEventThrottle={ 200 }
				style={ [styles.container, maxHeight] }
				contentContainerStyle={ [styles.content_container, newMargin] }
				onContentSizeChange={ (contentWidth, contentHeight) => {
					this.scrollWidth = contentWidth;
					this.scrollHeight = contentHeight;
				} }
			>
				{ this.props.tabs.map((tab, i) => {
					const activeTab = this.props.activeTab === i ? { tintColor: 'rgb(253,77,55)' } : { tintColor: 'rgb(209,215,223)'};
					return (
						<TouchableOpacity key={ tab } onPress={ () => this.tabPressed(i) } style={ [styles.tab] }>
							<Image style={ [styles.image_style, activeTab] } source={tab} />
						</TouchableOpacity>);
				})}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		maxHeight: size(70),
	},
	content_container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
    alignItems: 'center',
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: '#ddd',
		marginTop: size(10),
    
	},
	tab: {
		flex: 1,
		borderRadius: size(7),
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: size(10),
		
	},
	image_style: {
    width: size(35),
    height: size(35),
    resizeMode: 'contain',
	},
});