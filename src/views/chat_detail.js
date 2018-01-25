import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import { Header } from '../components';
import { size } from '../helpers/devices';
import * as Statics from '../helpers/statics';

export default class ChatDetail extends Component {
  static navigatorStyle = {
		navBarHidden: true,
  }

  constructor(props) {
    super(props);
    this.state={
      messageText: '',
      messages: [],
      id: 0,
    }
  }

  renderHeaderTitleContainer(data) {
    return (
      <View style={styles.header_title_container}>
        <Image source={{uri: data.profilePic}} style={styles.profile_pic_style}/>
        <Text style={styles.title_text_style}>{data.name}</Text>
      </View>
    )
  }

  renderChatContainer() {
    const { messages } = this.state;
    const { name, profilePic } = this.props.data;

    if (messages.length < 1) {
      return(
        <View style={styles.empty_state_container}>
          <Text style={styles.empty_state_title_style}>You matched with <Text style={{fontWeight: '600'}}>{name}</Text></Text>
          <Text style={styles.empty_state_date_style}>Jan 20, 2018</Text>
          <Image source={{uri: profilePic}} style={styles.empty_state_image_style} />
          <Text style={styles.empty_state_text_style}>Over 90% of compliments get a response.</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.message_container}>
          {this.state.messages.map((message) => {
            return (
              <View key={message.id} style={styles.message_row}>
                <Text style={styles.message_text_style}>{message.messageText}</Text>
              </View>
            );
          })
          }
        </View>
      );
    } 
  }

  onMessageInputChange(value) {
    this.setState({
      messageText: value,
    });
  }

  sendMessage() {
    const obj = {
      id: this.state.id,
      messageText: this.state.messageText,
    };
    if (this.state.messageText !== '') {
      this.setState({
        messages: [...this.state.messages, obj],
        id: this.state.id + 1,
        messageText: '',
      });
    } else {
      alert('say something.')
    }
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
        <Header 
          renderTitleComponent={this.renderHeaderTitleContainer(this.props.data)}
          leftButton={() => this.popToScreen()} 
        />
        <View style={styles.inner_container}>
          {this.renderChatContainer()}
          <View style={styles.text_input_container}>
            <TextInput
              onChangeText={(value) => this.onMessageInputChange(value)}
              value={this.state.messageText}
              style={ styles.text_input }
              placeholder={ 'Type a message...' }
              placeholderTextColor={ 'gray' }
              underlineColorAndroid="rgba(0,0,0,0)"
              selectionColor={ 'black' }
            />
            <Text 
              style={styles.send_icon_style}
              onPress={() => this.sendMessage()}
            >></Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(244,246,251)',
  },
  //--------------------HEADER TITLE------------------//
  header_title_container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: size(10),
  },
  profile_pic_style: {
    width: size(50),
    height: size(50),
    borderRadius: size(50) / 2,
    overflow: 'hidden',
  },
  title_text_style: {
    marginLeft: size(5),
    fontSize: size(18),
    fontWeight: '500',
  },
  //------------------INNER CONTAINER-----------------//
  inner_container: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: size(5),
  },
  //----------------TEXT INPUT CONTAINER----------------//
  text_input_container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: size(10),
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    marginHorizontal: size(10),
    backgroundColor: 'rgba(221,221,221,0.6)',
  },
  text_input: {
    flex: 8,
    height: size(40),
    padding: size(10),
  },
  send_icon_style: {
    flex: 1,
    fontSize: size(24),
    color: 'gray',
    fontWeight: '700',
  },
  //-------------------MESSAGES------------------//
  message_container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: size(10),
  },
  message_row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginRight: size(5),
    backgroundColor: 'rgb(54,153,248)',
    marginVertical: size(5),
    padding: size(10),
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  message_text_style: {
    fontSize: size(20),
    color: 'white',
    marginLeft: size(5),
  },
  //--------------------EMPTY STATE-------------------//
  empty_state_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty_state_title_style: {
    fontSize: size(18),
    marginBottom: size(5),
  },
  empty_state_date_style: {
    color: 'rgba(0,0,0,0.6)',
  },
  empty_state_image_style: {
    width: size(150),
    height: size(150),
    borderRadius: size(150) / 2,
    marginVertical: size(50),

  }
});