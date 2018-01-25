import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Animated,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import Interactable from 'react-native-interactable';
import  BottomTabBar  from './bottom_tab_bar';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.75 * SCREEN_WIDTH;

const transformValue = Platform.select({ ios: '10deg', android: '5deg' });

export default class Deck2 extends Component {
  static propTypes = {
    onSwipeLeft: PropTypes.func,
    onSwipeRight: PropTypes.func,
    data: PropTypes.array.isRequired,
    renderCard: PropTypes.func.isRequired,
    renderNoMoreCards: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onSwipeLeft: () => {},
    onSwipeRight: () => {},
  }

  constructor(props) {
    super(props);
    const position = new Animated.Value(0);
    this.state = {position, index: 0, isDone: false }
  }

  componentWillReceiveProps(props) {
    if (props.data !== this.props.data) {
      this.setState({
        index: 0
      });
    }
  }

  onSwipeComplete(direction) {
    if (this.state.index <= this.props.data.length - 1) {
      if (direction === 'right') {
        this.refs.test.snapTo({index: 0})
      } else {
        this.refs.test.snapTo({index: 2})
      }
    }
  }

  controlCardLeaving(event) {
    const { onSwipeLeft, onSwipeRight, data} = this.props;
    const item = data[this.state.index]

    if (event.left === 'enter') {
      onSwipeLeft(item);
      this.state.position.setValue(0);
      this.setState({
        index: this.state.index + 1
      });
    } else if (event.right === 'enter') {
      onSwipeRight(item);
      this.state.position.setValue(0);
      this.setState({
        index: this.state.index + 1
      });
    } else {
      console.log('else');
    }
  }

  renderCards() {
    if (this.state.index >= this.props.data.length) {
      return (
        <View style={styles.noMoreCards}>
           {this.props.renderNoMoreCards()}
        </View>);
        this.setState({isDone: true})
    }
    else {
      return this.props.data.map((item, i) => {
        const androidStyle = {
          elevation: -i * 10,
        }
        if (i < this.state.index) { return null; }
  
        if (i === this.state.index) {
          return (
            <Interactable.View 
              ref = {'test'}
              style={[styles.cardStyle, androidStyle]}
              key={item.id}
              snapPoints={[
                {x: 390},
                {x: 0, damping: 0.7},
                {x: -390}
              ]}
              animatedValueX={this.state.position}
              onAlert={(event) => this.controlCardLeaving(event.nativeEvent)}
              alertAreas={[{id: 'right', influenceArea: {left: SWIPE_THRESHOLD}}, {id: 'left', influenceArea: {right:-SWIPE_THRESHOLD}}]}
            >
              <Animated.View key={item.id} style={[{}, {
                transform: [{
                  rotate: this.state.position.interpolate({
                    inputRange: [-300, 0, 300],
                    outputRange: [transformValue, '0deg', `-${transformValue}`]
                  })
                }]
              }]}>
                  
                  <Animated.View style={[styles.overlay_nope, {
                    opacity: this.state.position.interpolate({
                      inputRange: [-120, 0],
                      outputRange: [0.8, 0],
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp'
                    })
                  }]}>
                    <Text style={[styles.overlayText, {color: '#de6d77', borderColor: '#de6d77'}]}>Nope</Text>
                  </Animated.View>

                  <Animated.View style={[styles.overlay, {
                    opacity: this.state.position.interpolate({
                      inputRange: [0, 120],
                      outputRange: [0, 0.8],
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp'
                    })
                  }]}>
                    <Text style={[styles.overlayText, {color: '#2f9a5d', borderColor: '#2f9a5d'}]}>Like</Text>
                  </Animated.View>
                  {this.props.renderCard(item)}
              </Animated.View>
            </Interactable.View>
          );
        }
        return (
          <Interactable.View 
              style={[styles.cardStyle, androidStyle]}
              key={item.id}
              horizontalOnly={false}
              animatedValueX={this.state.position}
            >
            <Animated.View key={item.id} style={[styles.cardStyle, androidStyle]}>
              {this.props.renderCard(item)}
            </Animated.View>
          </Interactable.View>
        );
      }).reverse();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderCards()}
        <BottomTabBar
          isDone={this.state.isDone}
          onRewindPressed={() => console.log('rewind pressed')}
          onDislikePressed={() => this.onSwipeComplete('left')}
          onSuperLikePressed={() => console.log('superLike pressed')}
          onLikePressed={() => this.onSwipeComplete('right')}
          onBoostPressed={() => console.log('boost pressed')} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  cardStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,

  },
  noMoreCards: {
    position: 'absolute',
    top: 0,
    bottom: 50,
    left: 0,
    right: 0,
    width: SCREEN_WIDTH,
  },
  overlay: {
    position: 'absolute',
    bottom: 180,
    left: 25,
    right: 0,
    top: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    elevation: 100,
    zIndex: 100,
  },
  overlay_nope: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 25,
    top: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    elevation: 100,
    zIndex: 100,
  },
  overlayText: {
    fontSize: 40,
    color: 'white',
    fontWeight: '600',
    padding: 3,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  buttons_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_style: {
    padding: 20,
  },
});