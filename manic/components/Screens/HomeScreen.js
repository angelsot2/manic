import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const userSelector = (context) => [context.user];
import { withAuthenticator, useAuthenticator} from '@aws-amplify/ui-react-native';
const SignOutButton = () => {
  const {user, signOut} = useAuthenticator(userSelector);
  return (

    <View style={styles.buttonContainer}>
        <Button 
          title="Sign Out"
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

const CreateNewEventButton = ({navigation}) => {
    return (
      <View style={styles.buttonContainer}>
        <Button 
          title="Create New Event"
          mode="contained"
          onPress={() => navigation.navigate('CreateCalendarEvent')}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
        Create New Calendar Event
        </Button>
      </View>
    );
}; 

const CreateNewWorkPostButton =({navigation}) => {
  return(
    <View style={styles.buttonContainer}>
      <Button
        title="Create New Work Post"
        mode="contained"
        onPress={()=> navigation.navigate('CreateWorkPost')}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Create New Work Post 
      </Button>
    </View>
  )
};

const CalendarScreenButton =({navigation}) => {
  return (
    <TouchableOpacity
      style={[styles.iconButton, styles.bottomLeft]}
      onPress={() => navigation.navigate('ViewCalendars')}
    >
      <Icon name="calendar" size={30} color='#fff'/>
    </TouchableOpacity>
  )
};

const MessagesScreenButton = ({navigation}) => {
  return (
    <TouchableOpacity
      style={[styles.iconButton, styles.bottomRight]}
      onPress={() => navigation.navigate('ViewMessages')}
    >
      <Icon name="message-text" size={30} color="#fff"/>
    </TouchableOpacity>
  )
};

const MoreOptionsButton = ({navigation}) => {
  return(
    <TouchableOpacity
      style={[styles.iconButton, styles.topRight]}
      onPress = {() => navigation.navigate('ViewMoreOptions')}
    >
      <Icon name="reorder-horizontal" size={30} color="#fff"/>
    </TouchableOpacity>
  )
}



const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CreateNewEventButton navigation={navigation}/>
      <CreateNewWorkPostButton navigation={navigation}/>
      <SignOutButton/>
      <CalendarScreenButton navigation={navigation}/>
      <MessagesScreenButton navigation={navigation}/>
      <MoreOptionsButton navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer:{
    width:250, 
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
  iconButton:{
    position: 'absolute',
    backgroundColor: 'purple',
    width: 50,
    height: 50, 
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomLeft: {
    bottom: 20,
    left: 20,
  },
  bottomRight: {
    bottom: 20,
    right: 20,
  },
  topRight: {
    top: 20,
    right: 20,
  },
});

export default HomeScreen;
