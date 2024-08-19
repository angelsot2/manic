import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Pressable } from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';

const CreateWorkPostForm = ({onCancel}) => {
    const[title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [duration, setDuration] = useState('');
    const [CompOrigin, setCompOrigin] = useState('');
    const [contactInfo, setContactInfo] = useState([]);
    const [datePosted, setDatePosted] = useState(new Date())
    

    return (
        <ScrollView contentContainerStyle={styles.container}>

            {/*Ask the user for name of work post*/}
            <TextInput
                label="Title"
                value={title}
                onChangeText={text => setTitle(text)}
                style={styles.input}
            />
            <TextInput
                label="Location"
                value={location}
                onChangeText={text=>setLocation(text)}
                style={styles.input}
            />

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
});


export default CreateWorkPostForm;