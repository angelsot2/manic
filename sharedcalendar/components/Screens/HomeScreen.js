import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import { Calendar } from 'react-native-calendars';


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
}


const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Calendar
        current={Date()}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={'2022-05-10'}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={'2024-12-31'}
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
        hideExtraDays={true}
        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={true}
        hideDayNames={false}
        showWeekNumbers={false}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
        disableArrowLeft={false}
        disableArrowRight={false}
        disableAllTouchEventsForDisabledDays={true}
        // Replace default month and year title with custom one. the function receive a date as parameter
        renderHeader={(date) => {
          /*Return JSX*/
          return <Text>{date.toString()}</Text>;
        }}
        enableSwipeMonths={true}
      />
      <CreateNewEventButton navigation={navigation}/>
      <CreateNewWorkPostButton navigation={navigation}/>
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
  homescreen: {
      alignItems: 'center',
      justifyContent: 'center',
  },
});

export default HomeScreen;
