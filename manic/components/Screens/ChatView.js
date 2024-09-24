import React, { useState, useEffect, useRef} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Button, FlatList, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, StyleSheet, Alert } from 'react-native';
import moment from 'moment'; 
import {useAuthenticator} from '@aws-amplify/ui-react-native';


import {createMessage} from '../../src/graphql/mutations';
import {messagesByConversationIdAndId} from '../../src/graphql/queries';


import { generateClient } from 'aws-amplify/api';
const client = generateClient();

const OpenChatViewScreen = ({ route }) => {
  const {user} = useAuthenticator((context) => [context.user]);
  const navigation = useNavigation(); 
  const {conversationId, title} = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: title });
    fetchAllMessages();
  }, [conversationId,navigation, title]);


  const fetchAllMessages = async() => {
    try {
      const messagesData = await client.graphql({ query: messagesByConversationIdAndId, variables: {conversationId: conversationId}});
      let messagesList = messagesData.data.messagesByConversationIdAndId.items;
      messagesList = messagesList.sort((a,b) => {
        return new Date(a.createdAt) - new Date(b.createdAt)
      })
      setMessages(messagesList);
    } catch (error){
      console.log("Error Fetching All Messages: ", error);
    }
  };

  // Function to determine if a timestamp should be shown
  const shouldShowTimestamp = (currentMessage, previousMessage) => {
    if (!previousMessage) return true; // Show timestamp for the first message
    const currentTime = moment(currentMessage.createdAt);
    const previousTime = moment(previousMessage.createdAt);
    return currentTime.diff(previousTime, 'hours') >= 2; // Show timestamp if 2 or more hours have passed
  };

  const sendMessage = async () => {
    console.log("SENT")
    if (message.trim()) {
      try {
        const result = await client.graphql({
          query: createMessage,
          variables: {
            input: {
              content: message,
              senderId: user.userId,
              conversationId: conversationId,
              createdAt: new Date().toISOString(),
            }
          }
        });
      } catch (error) {
        console.log("Error Sending Message: ", error)
      }
    }
    setMessage('');
  };

  const renderItem = ({ item, index }) => {
    const previousMessage = messages[index - 1]; // Get the previous message
    const showTimestamp = shouldShowTimestamp(item, previousMessage);

    return (
      <View>
        {showTimestamp && (
          <Text style={styles.timestamp}>
            {moment(item.createdAt).format('LT - MMM D, YYYY')}
          </Text> // Show formatted timestamp
        )}
        <View
          style={[
            styles.messageBubble,
            item.senderId === user.userId ? styles.userBubble : styles.otherBubble,
          ]}
        >
          <Text 
            style={[
              styles.messageText,
              item.senderId !== user.userId ? styles.otherMessageText : {},
            ]}
          >
            {item.content}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 125 : 60} // Adjust this value as needed
    >
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
  otherMessageText: {
    color: '#000',
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
  timestamp: {
    alignSelf: 'center',
    marginVertical: 10,
    fontSize: 12,
    color: '#888',
  },
});

export default OpenChatViewScreen;