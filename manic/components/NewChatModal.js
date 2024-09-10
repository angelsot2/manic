import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const friendsList = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
  { id: '3', name: 'Charlie' },
  { id: '4', name: 'David' },
  { id: '5', name: 'Eve' },
];

const NewChatModal = ({ visible, onClose, onSave }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFriends, setFilteredFriends] = useState(friendsList);
  const [selectedFriend, setSelectedFriend] = useState(null);

  // Handle the search query and filter friends
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = friendsList.filter(friend => 
        friend.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFriends(filtered);
    } else {
      setFilteredFriends(friendsList);
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
                data={filteredFriends}
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
                onPress={() => {onSave(selectedFriend);onClose()}}
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