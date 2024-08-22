import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, StyleSheet } from 'react-native';

const OpenChatViewScreen = ({ route }) => {
  const navigation = useNavigation(); 
  const { chatId, title } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello!', sender: 'other' },
    { id: '2', text: 'How are you?', sender: 'user' },
  ]);

  useEffect(() => {
    navigation.setOptions({ title: title });
  }, [navigation, title]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages(prevMessages => [
        ...prevMessages,
        { id: Date.now().toString(), text: message, sender: 'user' },
      ]);
      setMessage('');
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === 'user' ? styles.userBubble : styles.otherBubble,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 125 : 60} // Adjust this value as needed
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={styles.messageList}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
            />
            <Button title="Send" onPress={sendMessage} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  messageList: {
    flex: 1,
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: '#007aff',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  otherBubble: {
    backgroundColor: '#e5e5ea',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
    color: 'black'
  },
  messageText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10, // Added padding to avoid overlap
    backgroundColor: '#f8f8f8', // Added background color to make the input container stand out
  },
  textInput: {
    flex: 1,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
  },
});

export default OpenChatViewScreen;