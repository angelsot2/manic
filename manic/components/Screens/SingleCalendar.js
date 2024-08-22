/* This file will include all code to view a calendar as well as 
edit its contents*/
import { Calendar } from 'react-native-calendars';
import { View, Text, StyleSheet, Switch, Pressable} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';



const VisibilityToggle = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return(
        <View style={styles.switchContainer}>
            <Text style={styles.title}>{"Calendar Visibility"}</Text>
            <View style={styles.switchTextContianter}>
                <Text style={styles.textSwitch}>
                    {isEnabled ? "Calendar is Private" : "Calendar is Public"}
                </Text>
                <Switch
                    trackColor={{false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        </View>
    )
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

const ChangeCalendarTitle = () => {
    const [calendarTitle, setCalendarTitle] = useState('');
    return (
        <TextInput
            label="Calendar Name"

        />
    );
};


const ViewSingleCalendar = ({onCancel}) => {
  const navigation = useNavigation();

  const renderDay = ({date, state}) => {
    return (
      <View style={styles.dayContainer}>
        <Text style={[styles.dayText, state === 'disabled' && styles.disabledText]}>
          {date.day}
        </Text>
      </View>
    );
  };


  return (
    <View style={styles.container}>
        <VisibilityToggle/>
        <Calendar
        current={Date()} minDate={'2022-05-10'} maxDate={'2024-12-31'}
        onDayPress={(day) => {
            navigation.navigate('CreateCalendarEvent')
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
            /*Return JSX*/
            return <Text>{date.toString()}</Text>;
        }}
        enableSwipeMonths={true}
        dayComponent={renderDay}
        />
        <CreateNewEventButton navigation={navigation}/>

    </View>
  )
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
      title: {
        marginBottom: 10,
        fontSize: 15, 
        fontWeight:'bold',
      },
      switchContainer: {
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
      buttonText: {
        color:'#fff',
        fontSize: 15,
    },
});

export default ViewSingleCalendar;