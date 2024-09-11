import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

import { generateClient } from 'aws-amplify/api';
import { createEvent } from '../../src/graphql/mutations';
import { listEvents } from '../../src/graphql/queries';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);
const client = generateClient();

const DurationCheckbox = ({ checked, onChange }) => {
  return (
    <TouchableOpacity
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={onChange}>
      {checked && <Ionicons name="checkmark" size={24} color="white" />}
    </TouchableOpacity>
  );
};

const CreateCalendarEventForm = ({ route, onCancel }) => {
  passedDay = route.params.selectedDate;
  const initialStartDate = passedDay ? new Date(`${passedDay}T00:00:00`) : new Date();

  console.log(initialStartDate);

  const [title, setTitle] = useState('');
  const [type, setType] = useState('event');
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [eventCalendarId, setCalendarId] = useState('');
  const [isDurationVisible, setIsDurationVisible] = useState(false);


  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      const offset = selectedDate.getTimezoneOffset() * 60000;
      setStartDate(new Date(selectedDate.getTime() - offset));
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      const offset = selectedDate.getTimezoneOffset() * 60000;
      setEndDate(new Date(selectedDate.getTime() - offset));
    }
  };

  const handleTypeChange = (value) => {
    const selectedType = value === 0 ? 'event' : 'appointment';
    setType(selectedType);
  };


  const handleSubmit = async () => {
    try {
      const event = {
        title,
        type,
        startDate,
        endDate,
        duration,
        notes,
        eventCalendarId,
      };

      await client.graphql({
        query: createEvent,
        variables: { input: event },
      });

      resetForm();
    } catch (err) {
      console.log('Error Creating Event:', err);
    }
  };

  const resetForm = () => {
    setTitle('');
    setType('event');
    setStartDate(new Date());
    setEndDate(new Date());
    setDuration('');
    setNotes('');
    setIsDurationVisible(false);
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
      <SegmentedControl
        values={['Event', 'Appointment']}
        selectedIndex={type === 'event' ? 0 : 1}
        onChange={(event) => handleTypeChange(event.nativeEvent.selectedSegmentIndex)}
        tintColor="purple"
      />

      <Text style={styles.label}>Start Date</Text>
      <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
        <View pointerEvents="none">
          <TextInput
            label="Start Date"
            value={startDate.toDateString()}
            style={styles.input}
            editable={false}
          />
        </View>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={handleStartDateChange}
        />
      )}

      <Text style={styles.label}>End Date</Text>
      <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
        <View pointerEvents="none">
          <TextInput
            label="End Date"
            value={startDate.toDateString()}
            style={styles.input}
            editable={false}
          />
        </View>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={handleEndDateChange}
        />
      )}

      <Text style={styles.label}>Duration</Text>
      <DurationCheckbox style={styles.checkBox}checked={isDurationVisible} onChange={() => setIsDurationVisible(!isDurationVisible)} />
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

      <Button style={styles.input} mode="contained" onPress={onCancel}>
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
  checkBox: {
    paddingBottom: 50,
  },  
  checkboxChecked: {
    backgroundColor: 'purple',
  },
});

export default CreateCalendarEventForm;