import React, { useState, useF } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Pressable } from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import {createEvent} from '../Event.js';


//Helper function displaying a checkbox used to determine 
//if the duration of an event is to be specified
const DurationCheckbox = ({ checked, onChange }) => {
  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={onChange}>
      {checked && <Ionicons name="checkmark" size={24} color="white" />}
    </Pressable>
  );
};


const CreateCalendarEventForm = ({ onCancel}) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('event');
  const [startDate, setStartDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [isDurationVisible, setIsDurationVisible] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const offset = selectedDate.getTimezoneOffset() * 60000;
      setStartDate(new Date(selectedDate.getTime() - offset));
    }
  };

  const handleSubmit = () => {
    createEvent(title, type, startDate, duration, notes)
    console.log('--------')
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setType('event');
    setStartDate(new Date());
    setDuration('');
    setNotes('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={text => setTitle(text)}
        style={styles.input}
      />

      <Text style={styles.label}>Type</Text>
      <RadioButton.Group onValueChange={newValue => setType(newValue)} value={type}>
        <View style={styles.radioContainer}>
          <RadioButton value="event"/>
          <Text>Event</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton value="appointment" />
          <Text>Appointment</Text>
        </View>
      </RadioButton.Group>

      <Text style={styles.label}>Start Date</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <View pointerEvents="none">
          <TextInput
            label="Start Date"
            value={startDate.toDateString()}
            style={styles.input}
            editable={false}
          />
        </View>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Duration</Text>
      <DurationCheckbox checked={isDurationVisible} onChange={() => setIsDurationVisible(!isDurationVisible)} />
      {isDurationVisible && (
        <Picker
          selectedValue={duration}
          onValueChange={itemValue => setDuration(itemValue)}
          style={styles.input}
        >

          <Picker.Item label="15 minutes" value="15" />
          <Picker.Item label="30 minutes" value="30" />
          <Picker.Item label="45 minutes" value="45" />
          <Picker.Item label="1 hour" value="60" />
          <Picker.Item label="1.5 hours" value="90" />
          <Picker.Item label="2 hours" value="120" />
          <Picker.Item label="3 hours" value="180" />
          <Picker.Item label="4 hours" value="240" />
        </Picker>
      )}

      <TextInput
        label="Notes"
        value={notes}
        onChangeText={text => setNotes(text)}
        style={styles.input}
        multiline
      />

      <Button style={styles.input} mode="contained" onPress={handleSubmit}>
        Create Event
      </Button>

      <Button mode="contained" onPress={onCancel}>
        Cancel
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 8,
  },
  label: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'purple',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: 'purple',
  },
});

export default CreateCalendarEventForm;
