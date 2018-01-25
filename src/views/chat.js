import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Search } from '../assets';
import { size } from '../helpers/devices';
import * as Statics from '../helpers/statics';

const newMatches = [
  {id: 1, name: 'Gizem', profilePic: 'https://www.randomlists.com/img/people/john_f_kennedy.jpg'},
  {id: 2, name: 'Merve', profilePic: 'https://pbs.twimg.com/profile_images/681369932207013888/CHESpTzF.jpg'},
  {id: 3, name: 'Aslı', profilePic: 'https://c1.staticflickr.com/6/5252/5403292396_0804de9bcf_b.jpg'},
];

const Messages = [
  {id: 1, name: 'Ayşe', profilePic: 'https://www.rd.com/wp-content/uploads/2017/03/02-People-Share-the-Random-Act-of-Kindness-That-Changed-Their-Life-Fatima-M-Woods-380x254.jpg'},
  {id: 2, name: 'Fatma', profilePic: 'https://image.yenisafak.com/resim/imagecrop/2017/07/06/04/46/resized_6d734-9adcf410maxresdefault.jpg'},
]


export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state={
      searchText: '',
    }
  }

  onSearchInputChange(value) {
    this.setState({
      searchText: value,
    });
  }

  pushToScreen(screenName, person) {
    console.log('props', person);
    if(Platform.OS === 'ios') {
      this.props.navigator.push({screen: screenName, passProps: person})
    } else {
      this.props.navigator.showModal({screen: screenName , passProps: person, animationType: 'slide-up'})
    }
  }

  renderSearchContainer() {
		return (
			<View style={ styles.text_input_container }>
				<Image source={ Search } style={ styles.search_icon } />
				<TextInput
						onChangeText={(value) => this.onSearchInputChange(value)}
						value={this.state.searchText}
						style={ styles.text_input }
						placeholder={ 'Search 3 Matches' }
						placeholderTextColor={ 'gray' }
						underlineColorAndroid="rgba(0,0,0,0)"
						selectionColor={ 'white' }
					/>
			</View>
		);
  }

  renderNewMatches() {
    return (
      <View style={styles.new_matches_container}>
        <Text style={styles.new_matches_title_style}>New Matches</Text>
        <View style={styles.matches_container}>
          {newMatches.map((person) => {
            return (
              <TouchableOpacity 
                key={person.id} 
                style={styles.person_container}
                onPress={() => this.pushToScreen('ChatDetail', { data: person } )}
              >
                <Image source={{uri: person.profilePic}} style={styles.person_image_style}/>
                <Text style={styles.person_name_style}>{person.name}</Text>
              </TouchableOpacity >
            );
          })}
        </View>
      </View>
    )
  }

  renderMessages() {
    return (
      <View style={styles.messages_container}>
        <Text style={styles.messages_title_style}>Messages</Text>
        <View style={styles.message_person_container}>
        {Messages.map((person) => {
            return (
              <TouchableOpacity 
                key={person.id} 
                style={styles.messsage_person}
                onPress={() => this.pushToScreen('ChatDetail', { data: person })}
              >
                <Image source={{uri: person.profilePic}} style={styles.messsage_person_image_style}/>
                <Text style={styles.message_person_name_style}>{person.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderSearchContainer()}
        {this.renderNewMatches()}
        {this.renderMessages()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(244,246,251)',
  },
   //----------------- SEARCH ----------------//
  search_container: {
    marginVertical: size(20),
    flexDirection: 'row',
    
    alignItems: 'center',
    height: size(45),
  },
  search_icon_style: {
    width: size(20),
    height: size(20),
    resizeMode: 'contain',
    tintColor: 'rgb(253,77,55)'
  },
  text_input_container:{
		flexDirection: 'row',
		alignItems: 'center',
    height: size(50),
    margin: size(20),
	},
	text_input: {
		width: Statics.DEVICE_WIDTH - size(60),
		fontSize: size(14),
    height: size(45),
    marginLeft: size(10),
    color: '#363636',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(253,77,55, 0.7)',
	},
	search_icon: {
    height: size(20),
    width: size(20),
		tintColor: 'rgb(253,77,55)'
  },
  //---------------------NEW MATCHES-----------------------//
  new_matches_container: {
    marginHorizontal: size(20),
  },
  new_matches_title_style: {
    fontSize: size(18),
    fontWeight: '600',
    color: 'rgb(253,77,55)'
  },
  matches_container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: size(10),
  },
  person_container: {
    marginVertical: size(5),
    marginHorizontal: size(10),
    alignItems: 'center'
  },
  person_image_style: {
    width: size(75),
    height: size(75),
    borderRadius: size(35),
    resizeMode: 'cover',
    marginBottom: size(10),
  },
  person_name_style: {
    fontSize: size(16),
    fontWeight: '600',
    color: 'black',
  },
  //-----------------MESSAGES-------------//
  messages_container: {
    marginHorizontal: size(20),
    marginTop: size(20),
  },
  messages_title_style: {
    fontSize: size(18),
    fontWeight: '600',
    color: 'rgb(253,77,55)'
  },
  message_person_container: {
    marginTop: size(10),
    justifyContent: 'flex-start',
  },
  messsage_person: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: size(5),
    marginHorizontal: size(10),
    alignItems: 'center',
  },
  messsage_person_image_style: {
    width: size(90),
    height: size(90),
    borderRadius: size(90) / 2,
    resizeMode: 'cover',
    marginBottom: size(10),
  },
  message_person_name_style: {
    fontSize: size(16),
    fontWeight: '600',
    color: 'black',
    marginLeft: size(10),
  },
});