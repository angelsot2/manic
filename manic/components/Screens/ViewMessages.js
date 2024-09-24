import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import {useAuthenticator} from '@aws-amplify/ui-react-native';
import NewChatModal from '../NewChatModal';
import { listConversations } from '../../src/graphql/queries';
import { deleteConversation } from '../../src/graphql/mutations';

import { generateClient } from 'aws-amplify/api';
const client = generateClient();


const MessageTile = ({ item, onDelete, onMute}) => {
  const {user} = useAuthenticator((context) => [context.user]);
  const renderRightActions = () => (
    <View style={styles.actionsContainer}>
      <TouchableOpacity style={styles.actionButton} onPress={() => onMute(item.id)}>
        <Icon name="volume-off" size={24} color="#fff" />
        <Text style={styles.actionText}>Mute</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={() => onDelete(item.id)}>
        <Icon name="delete" size={24} color="#fff" />
        <Text style={styles.actionText}>Delete</Text>
      </TouchableOpacity>
    </View>
  )
  const navigation = useNavigation();
  const recipientName = item.participants.filter((id) => id !== user.username)

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        style={styles.messageTile}
        onPress={() => navigation.navigate('OpenChatViewScreen', { conversationId: item.id, title: recipientName })}
      >
        <Text style={styles.messageTitle}>
          {recipientName}
        </Text>
        <Text style={styles.messagePreview}>{item.preview}</Text>
      </TouchableOpacity>
    </Swipeable>
  );
};

const MessagesPage = ({ navigation }) => {
  const {user} = useAuthenticator((context) => [context.user]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChats, setFilteredChats] = useState([]);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async() => {
    try {
    const currentUserId = user.userId;

    const conversationData = await client.graphql({
      query: listConversations, 
        filter: {
          participants: {contains: currentUserId}
        }
      });
      
      setConversations(conversationData.data.listConversations.items);
    }catch(error) {
      console.log("Error Fetching user's conversations: ", error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = conversations.filter(message =>
        message.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredChats(filtered);
    } else {
      setFilteredChats(conversations);
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Conversation',
      'Are you sure you want to delete this conversation?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => {setConversations(conversations.filter(msg => msg.id !== id)),deleteSelectedConversation(id)}},
      ]
    );
  };

  const deleteSelectedConversation = async(id)=> {
    try {
      await client.graphql({
        query: deleteConversation,
        variables: {
          input: {
            id: id
          },
        },
      });
      Alert.alert(
        'Deleted Successfully',
        [{text: 'Okay', style: 'cancel'}]
      )
    } catch (error) {
      console.log("Error Deleting Calendar: ", error)
    }
  };

  const handleMute = (id) => {
    Alert.alert('Muted Chat', 'You have muted this chat.');
    // Implement mute logic here
  };

  const handleAddNewChat = () => {
    setModalVisible(true);
  };

  const addNewChat = (conversation) => {
    if(conversation){
      setConversations([...conversations, conversation]);
    };
  };

  return (
    <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a chat"
          value={searchQuery}
          onChangeText={handleSearch}
        />

        <FlatList
        data={filteredChats.length > 0 ? filteredChats : conversations}
        renderItem={({ item }) => (
            <MessageTile item={item} onDelete={handleDelete} onMute={handleMute} navigation={navigation} />
        )}
        keyExtractor={item => item.id}
        />
        <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddNewChat}
        >
            <Icon name="chat-plus" size={24} color="#fff"/>
        </TouchableOpacity>
        <NewChatModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={addNewChat}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  },
  messageTile: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  messageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messagePreview: {
    fontSize: 14,
    color: '#666',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#d11a2a',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
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
  searchInput: {
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    width: 300,
  },
});

export default MessagesPage;