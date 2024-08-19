import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

/*
  To get user information look at at HomeScreen.js?
  8|     const userSelector = (context) => [context.user];
  ...
 11|     const {user, signOut} = useAuthenticator(userSelector);

*/


import { createCalendar } from '../../src/graphql/mutations';
import {v4 as uuidv4} from 'uuid';
import {Auth} from 'aws-amplify';
import { getCurrentUser } from 'aws-amplify/auth';
import {generateClient} from 'aws-amplify/api';
import {Amplify} from 'aws-amplify';

//import amplifyconfig from '../../src/amplifyconfiguration.json';
import awsconfig from '../../src/aws-exports';
Amplify.configure(awsconfig);
const client = generateClient();

const ViewCalendars = () => {
  const navigation = useNavigation();
  const [calendars, setCalendars] = useState([
    { id: '1', name: 'Calendar 1' },
    { id: '2', name: 'Calendar 2' },
    { id: '3', name: 'Calendar 3' },
    // Add more calendars as needed
  ]);

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Calendar",
      "Are you sure you want to delete this calendar?",
      [
        {text: "Cancel", style: "cancel"},
        {text: "Delete", onPress: () => setCalendars(calendars.filter(calendar => calendar.id !== id))}
      ]
    );
  };

  const renderRightActions = (id) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => handleDelete(id)}
    >
      <Icon name="delete" size={24} color="#fff" />
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    return (
      <Swipeable renderRightActions={() => renderRightActions(item.id)}>
        <View style={styles.calendarTile}>
          <TouchableOpacity
            style={styles.calendarButton}
            onPress={() => navigation.navigate('ViewSingleCalendar')}
          >
            <Text style={styles.calendarName}>{item.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => console.log(`Share ${item.name}`)}
          >
            <Icon name="share-variant" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </Swipeable>
    )
  };

  /* TODO: create calendar object instance and send it to the database*/
  const addNewCalendar = () => {
    const newCalendar = {
      id: (calendars.length + 1).toString(),
      name: 'New Calendar',
    };
    setCalendars([...calendars, newCalendar]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={calendars}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}

      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={addNewCalendar}
      >
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingBottom: 100, // Add space for the add button
  },
  calendarTile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    elevation: 2, // Add shadow for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4, // Add shadow for iOS
  },
  calendarButton: {
    flex: 1, // Take up the remaining space
    backgroundColor: 'purple',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
  },
  calendarName: {
    fontSize: 18,
    color: '#fff',
  },
  shareButton: {
    marginLeft: 10,
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 82,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 15,
  },
  deleteText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'purple',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewCalendars;



  /*const getCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      console.log('User Info:', user);
      const userId = user.attributes.sub; // This is typically the unique user ID
      console.log('User ID:', userId);
      return { user, userId };
    } catch (error) {
      console.error('Error getting user:', error);
    }
  };
  const [ownerID, setOwnerID] = useState('');
  const [createdCalendar, setCreatedCalendar] = useState(null);*/