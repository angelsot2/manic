import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { v4 as uuidv4 } from 'uuid';  // Import UUID library

import { createCalendar } from '../../src/graphql/mutations';
import { listCalendars } from '../../src/graphql/queries';
import { calendarsByOwnerIdAndId } from '../../src/graphql/queries';
import { deleteCalendar } from '../../src/graphql/mutations';
import AddCalendarModal from '../AddCalendarModal';


import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);

import { generateClient } from 'aws-amplify/api';
const client = generateClient();

const ViewCalendars = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const navigation = useNavigation();
  const [calendars, setCalendars] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  
  console.log('Fetching all calendars...');

  const fetchAllCalendars = async () => {
    try {
      const allCalendarData = await client.graphql({ query: calendarsByOwnerIdAndId, variables:{ownerId:user.userId} });
      const calendarsList = allCalendarData.data.calendarsByOwnerIdAndId.items;
      setCalendars(calendarsList);
    } catch (error) {
      console.log('Error Fetching All Calendars: ', error);
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Calendar",
      "Are you sure you want to delete this calendar?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await client.graphql({
                query: deleteCalendar,
                variables: { input: { id } },
              });
              setCalendars(calendars.filter(calendar => calendar.id !== id));
              console.log('Calendar deleted Successfully');
            } catch (error) {
              console.log('Error deleting calendar: ', error);
            }
          },
        },
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

  const renderItem = ({ item }) => {
    return (
      <Swipeable renderRightActions={() => renderRightActions(item.id)}>
        <View style={styles.calendarTile}>
          <TouchableOpacity
            style={styles.calendarButton}
            onPress={() => navigation.navigate('ViewSingleCalendar', { calendarId: item.id })}
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
    );
  };

  const handleAddCalendar = () => {
    setModalVisible(true);
  };

  const handleSaveCalendar = async (calendarData) => {
    const tempId = uuidv4();

    const newCalendarData = {
      id: tempId,  
      name: calendarData.title,
      ownerId: user.userId.toString(),
      isPrivate: calendarData.visibility,
    };

    // Add the new calendar with a temporary ID to the state
    setCalendars([...calendars, newCalendarData]);

    try {
      const result = await client.graphql({
        query: createCalendar,
        variables: { input: newCalendarData }
      });
      const createdCalendar = result.data.createCalendar;

      setCalendars((prevCalendars) => 
        prevCalendars.map(calendar => calendar.id === tempId ? createdCalendar : calendar)
        );
      console.log('Calendar created successfully');
    } catch (error) {
      console.log('Error creating calendar: ', error);
      setCalendars((prevCalendars) => prevCalednars.flter(calendar => calendar.id !== tempId))
    }
  }



  return (
    <View style={styles.container}>
      <Button onPress={() => fetchAllCalendars()}>Refresh Calendars</Button>
      <FlatList
        data={calendars}
        renderItem={renderItem}
        keyExtractor={item => item.id}  // Ensure each item has a unique key
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddCalendar}
      >
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>
      <AddCalendarModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveCalendar}
      />
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