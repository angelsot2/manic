import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Text } from 'react-native';
import { TextInput, Button} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { Picker } from '@react-native-picker/picker';


import {generateClient} from 'aws-amplify/api';
import {createPost} from '../../src/graphql/mutations';
import {Amplify} from 'aws-amplify';
import amplifyconfig from '../../src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);
const client = generateClient();
            

const CreateWorkPostForm = ({onCancel}) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [desiredPosition, setDesiredPosition] = useState('');
  const [location, setLocation] = useState(''); 
  const [date, setDate] = useState(new Date());
  const [durationValue, setDurationValue] = useState('');
  const [durationUnit, setDurationUnit] = useState('');
  const [description, setDescription] = useState('');
  const [sourceUser, setSourceUser] = useState('');
  const [viewLevel, setViewLevel] = useState('');

  const [showDatePicker, setShowDatePicker] = useState(false);
    

  
  const [post, setPost] = useState([]);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const offset = selectedDate.getTimezoneOffset() * 60000;
      setDate(new Date(selectedDate.getTime() - offset));
    }
  };

  const resetForm = () => {
    setDesiredPosition('');
    setLocation('');
    setDate(new Date());
    setDurationValue('1');
    setDurationUnit('days');
    setDescription('');
    setSourceUser('');
    setViewLevel('friends_only');
  };


  async function handleSubmit () {
    try {
      if (!desiredPosition || !date || !location) {
            Alert.alert("Error", "Please fill all fields");
            return;
          }

      console.log("duration info:", durationValue, durationUnit);
      const duration = `${durationValue} ${durationUnit}`;
      const postData = {
        desiredPosition,
        location, 
        date, 
        duration,
        description, 
        ownerId: user.userId.toString(),
        viewLevel,
      };
      console.log("postData: ", postData);
      setPost([...post, post]);
      console.log("post: ", post)

      await client.graphql({
        query: createPost,
        variables: {input: postData}
      });
      resetForm();
    } catch(err) {
      console.log('Error Creating post:', err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Desired Position"
        value={desiredPosition}
        onChangeText={text => setDesiredPosition(text)}
        style={styles.input}
      />

      <TextInput
        label="Location"
        value={location}
        onChangeText={text => setLocation(text)}
        style={styles.input}
      />
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <View pointerEvents="none">
          < TextInput
            label="Start Date"
            value={date.toDateString()}
            style={styles.input}
            editable={false}
          />
        </View>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Duration</Text>
      <View style={styles.pickerContainer}>
        {/* Picker for numbers (1-30) */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={durationValue}
            style={styles.picker}
            onValueChange={(itemValue) => setDurationValue(itemValue)}
          >
            {Array.from({ length: 30 }, (_, i) => (i + 1).toString()).map((num) => (
              <Picker.Item key={num} label={num} value={num} />
            ))}
          </Picker>
        </View>

        {/* Picker for units (Days, Weeks, Months, Years, Unknown) */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={durationUnit}
            style={styles.picker}
            onValueChange={(itemValue) => setDurationUnit(itemValue)}
          >
            <Picker.Item label="Days" value="Days" />
            <Picker.Item label="Weeks" value="Weeks" />
            <Picker.Item label="Months" value="Months" />
            <Picker.Item label="Years" value="Years" />
            <Picker.Item label="Unknown" value="Unknown" />
          </Picker>
        </View>
      </View>


      <TextInput
        label="Description"
        value={description}
        onChangeText={text=>setDescription(text)}
        style={styles.input}
      />
 
      <Text style={styles.label}>Select Viewing Level</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={viewLevel}
          style={styles.viewPicker}
          onValueChange={(itemValue) => setViewLevel(itemValue)}
        >
          <Picker.Item label="Friends Only" value="friends_only" />
          <Picker.Item label="Friends of Friends" value="friends_of_friends" />
          <Picker.Item label="Everyone" value="everyone" />
        </Picker>
      </View>

      <Button style={styles.input} mode="contained" onPress={handleSubmit}>
        Create Post
      </Button>
        </ScrollView>
    )
}

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
    pickerContainer: {
      flexDirection: 'row', // Stack horizontally
      alignItems: 'center',
      justifyContent: 'center',
    },
    pickerWrapper: {
      flex: 1, // Ensures the pickers take up equal space
      alignItems: 'center',
    },
    picker: {
      height: 200,
      width: 150, // Adjust width of each picker
    },
    viewPicker: {
      height: 300,
      width: 300,

    },
    selectedValueText: {
      fontSize: 18,
      marginTop: 20,
      fontWeight: 'bold',
    },
});


export default CreateWorkPostForm;