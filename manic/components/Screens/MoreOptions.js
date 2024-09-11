import {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuthenticator} from '@aws-amplify/ui-react-native';
import * as ImagePicker from 'expo-image-picker';
import placeholderImage from '../../assets/images/userplaceholder.jpg';
import {Amplify} from 'aws-amplify';
import amplifyconfig from '../../src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);
import FriendsScreen from '../Friends.js';

const userSelector = (context) => [context.user];



const SignOutButton = () => {
    const {user, signOut} = useAuthenticator(userSelector);
    return (
  
      <View style={styles.buttonContainer}>
          <Button 
            mode="contained"
            onPress={signOut}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
          Sign Out
          </Button>
        </View>
    );
};

const MoreOptions = () => {
    const {user} = useAuthenticator((context) => [context.user]);

    return(
        <View style={styles.containter}>
            <Text>Username: {user.username}</Text>
            <SignOutButton/>
            <FriendsScreen/>
        </View>
    );
}

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'top',
    },
    image: {
        marginTop: 10,
        width: 125,
        height: 125,
        borderRadius: 100,
    },
    profilePhotoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    changePhoto: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'purple',
        width: 30,
        height: 30,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer:{
        width:150, 
        height: 50, 
        marginHorizontal:20, 
        alignItems:'center',
        justifyContent:'center',
        padding: 3,
        borderRadius: 5,
        marginTop: 20,
      }, 
    button:{
        borderRadius: 10, 
        width: '100%',
        height: '100%',
        justifyContent: 'center', 
        backgroundColor: 'purple',
      },
    buttonText: {
        color:'#fff',
        fontSize: 15,
    },
    searchUserContainer: {
      
    },
});

export default MoreOptions