/* This file will include all code to view a calendar as well as 
edit its contents*/
import { Calendar } from 'react-native-calendars';
import { View, Text, StyleSheet} from 'react-native';
import {Button, TextInput, Switch} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { updateCalendar } from '../../src/graphql/mutations';
import { getCalendar } from '../../src/graphql/queries';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 


import {generateClient} from 'aws-amplify/api';
import {Amplify} from 'aws-amplify';
import amplifyconfig from '../../src/amplifyconfiguration.json';
import { TouchableOpacity } from 'react-native-gesture-handler';
Amplify.configure(amplifyconfig);
const client = generateClient();


const CreateNewEventButton = ({navigation, calendarId}) => {
    return (
      <View style={styles.buttonContainer}>
        <Button 
          title="Create New Event"
          mode="contained"
          onPress={() => navigation.navigate('CreateCalendarEvent', {calendarId})}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
        Create New Calendar Event
        </Button>
      </View>
    );
}; 

const UpdateCalendarDetails = ({isPrivate, calendarId, initialTitle}) => {
  const [calendarTitle, setCalendarTitle] = useState('');
  const [isCalendarPrivate, setIsCalendarPrivate] = useState();
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);

  useEffect(() => {
    setCalendarTitle(initialTitle);
    setIsCalendarPrivate(isPrivate);    
  }, [initialTitle, isPrivate])

  const HandleUpdateCalendar = async () => {
    console.log(calendarId, calendarTitle, isCalendarPrivate)
    try {
      const calendarData = await client.graphql({
        query: updateCalendar,
        variables:{input:{id: calendarId, name: calendarTitle, isPrivate: isCalendarPrivate}}
      }) 
    } catch(error) {
      console.log('Error updating calendar: ', error);
    }
  };

  return (

    <View>
      <View style={styles.switchContainer}>
        <View style={styles.switchTextContianter}>
          <Text style={styles.textSwitch}>
              {isPrivate ? "Calendar is Private" : "Calendar is Public"}
          </Text>
          <Switch
              onValueChange={() => setIsCalendarPrivate(!isPrivate)}
              value={isCalendarPrivate}
          />
        </View>
      </View>


      <View style={styles.titleInputContainer}>
        <TextInput
          label="Calendar Name"
          value={calendarTitle}
          onChangeText={text => setCalendarTitle(text)}
          style={styles.titleInput}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          title="Update Calendar Details"
          mode="contained"
          onPress={() => HandleUpdateCalendar()}
          disabled={!isButtonEnabled}
          style={[styles.button, { backgroundColor: isButtonEnabled ? 'purple' : 'grey' }]}
          labelStyle={styles.buttonText}
        >
        Update Calendar Details
        </Button>
      </View>
    </View>
  );
};


const ViewSingleCalendar = ({route}) => {
  const {calendarId} = route.params;
  const navigation = useNavigation();
  const [calendarName, setCalendarName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);


  useEffect(() => {
    const fetchCalendarDetails = async() => {
      try {
        const calendarData = await client.graphql({
          query: getCalendar,
          variables:{id: calendarId},
        }); 
        setCalendarName(calendarData.data.getCalendar.name);
        setIsPrivate(calendarData.data.getCalendar.isPrivate);
        //navigation.setOptions({title: calendarData.data.getCalendar.name}) 
        //^^^ this sets the calendarStack title in the header. NOT in the tab navigator 

      }catch (error) {
        console.log('Error fetching calendar details: ', error);
      }
    };
    fetchCalendarDetails();
  }, [calendarId, navigation]);


  const RenderDay = ({date, state}) => {
    return (
        <TouchableOpacity 
          style={styles.dayContainer}
          onPress= {() => {
            navigation.navigate('CreateCalendarEvent', {
              calendarId, 
              selectedDate: date.dateString,
            });
          }}  
        >
          <Text style={[styles.dayText, state === 'disabled' && styles.disabledText]}>
            {date.day}
          </Text>
        </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}>
        <UpdateCalendarDetails
          isPrivate={isPrivate}
          calendarId={calendarId}
          initialTitle={calendarName}
          onTitleChange={setCalendarName}
        />

        <Calendar
        current={Date()} minDate={'2022-05-10'} maxDate={'2024-12-31'}
        onDayPress={(day) => {
            navigation.navigate('CreateCalendarEvent', {calendarId, day});
        }}
        monthFormat={'MMMM yyyy'}
        onMonthChange={(month) => {
            console.log('month changed', month);
        }}
        hideArrows={false}
        renderArrow={(direction) => (
            <Text>{direction === 'left' ? '<' : '>'}</Text>
        )}
        hideExtraDays={true} disableMonthChange={true} hideDayNames={false}
        showWeekNumbers={false} onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
        disableArrowLeft={false} disableArrowRight={false}
        disableAllTouchEventsForDisabledDays={true}
        // Replace default month and year title with custom one. the function receive a date as parameter
        renderHeader={(date) => {
            return <Text>{date.toString()}</Text>;
        }}
        enableSwipeMonths={true}
        dayComponent={RenderDay}
        />
        <CreateNewEventButton navigation={navigation} calendarId={calendarId}/>
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
      dayContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#cccccc',
      },
      dayText: {
        fontSize: 16,
        color: "#000000",
      },
      disabledText: {
        color: '#cccccc',
      },
      titleInputContainer: {
        flexDirection: 'row',
        margin: 20,
        alignItems: 'center',
        width: 250,
        marginBottom: 0,
      },
      titleInput: {
        flex: 1,
        marginRight: 10,
      },
      updateButton: {
        justifyContent: 'center',
        backgroundColor: 'purple',
      },
      title: {
        marginBottom: 10,
        fontSize: 15, 
        fontWeight:'bold',
      },
      switchContainer: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      switchTextContianter: {
        flexDirection: 'row',
        alignItems: 'center',
        right: 5,
      },
      textSwitch: {
        right: 10,
      },
      text: {
          fontSize: 13,
          marginBottom: 20,
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
});

export default ViewSingleCalendar;