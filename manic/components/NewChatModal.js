import React, { useEffect, useState, Auth} from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { listFriendships } from '../src/graphql/queries';
import {useAuthenticator} from '@aws-amplify/ui-react-native';
import {createConversation} from '../src/graphql/mutations';

import { generateClient } from 'aws-amplify/api';
const client = generateClient();

const NewChatModal = ({ visible, onClose, onSave }) => {
  const {user} = useAuthenticator((context) => [context.user]);
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(null);

  useEffect(() => {
    if(visible) {
      getFriends();
    }
  }, [visible]);


  const handleCreateNewConversation = async () => {
    try {
      const participants = [user.username, selectedFriend.name];
      console.log(participants)

      const conversationInput = {
        participants: participants,
        lastMessageAt: new Date().toISOString(),
      };

      const convoResponse = await client.graphql({
        query: createConversation, 
        variables: {
          input: conversationInput
        }
      });

      const conversation = convoResponse.data.createConversation;
      console.log(conversation)

      onSave(conversation);
      onClose();
    } catch (error) {
      console.log("Error Creating New Conversation: ", error);
    }
  };

  const getFriends = async() => {
    try {
      const fetchedFriends = await client.graphql({ query: listFriendships });  
      const friendsList = fetchedFriends.data.listFriendships.items.filter(friendship =>
        friendship.status === 'ACCEPTED'
      ).map(friendship => {
        return {
          id: friendship.requesterId === user.userId ? friendship.requesteeId : friendship.requesterId,
          name: friendship.requesterId === user.userId ? friendship.requestee : friendship.requester
        };
      });

      setFriends(friendsList);
      console.log(friends)
    
    } catch (error){
      console.log("Error fetching friends (newChat): ", error);
    }
  };
  // Handle the search query and filter friends
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = friends.filter(friend => 
        friend.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFriends(filtered);
    } else {
      setFilteredFriends(friends);
    }
  };

  // Handle selecting a friend
  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Start a New Chat</Text>

              {/* Search Bar */}
              <TextInput
                label="Search Friend"
                value={searchQuery}
                onChangeText={handleSearch}
                style={styles.input}
                placeholder="Type a friend's name"
              />

              {/* Friend List */}
              <FlatList
                data={friends}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.friendItem,
                      selectedFriend?.id === item.id && styles.selectedFriendItem,
                    ]}
                    onPress={() => handleSelectFriend(item)}
                  >
                    <Text style={styles.friendName}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />

              {/* Save Button */}
              <Button
                mode="contained"
                onPress={() => {handleCreateNewConversation()}}
                disabled={!selectedFriend} // Disable button until a friend is selected
                style={styles.saveButton}
              >
                Start Chat
              </Button>

              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '50%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    marginBottom: 15,
  },
  friendItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  selectedFriendItem: {
    backgroundColor: '#a0a0d0', // Highlight selected friend
  },
  friendName: {
    fontSize: 16,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: 'purple',
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButtonText: {
    color: 'purple',
    fontSize: 16,
  },
});

export default NewChatModal;