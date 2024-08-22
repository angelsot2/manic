import React, {useState} from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const MessageTile = ({ item, onDelete, onMute}) => {
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
  );

  const navigation = useNavigation();
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        style={styles.messageTile}
        onPress={() => navigation.navigate('ChatViewScreen', { chatId: item.id, title: item.title })}
      >
        <Text style={styles.messageTitle}>{item.title}</Text>
        <Text style={styles.messagePreview}>{item.preview}</Text>
      </TouchableOpacity>
    </Swipeable>
  );
};

const MessagesPage = ({ navigation }) => {
  const [messages, setMessages] = useState([
    { id: '1', title: 'John Doe', preview: 'Hey, how are you?' },
    { id: '2', title: 'Jane Smith', preview: 'Meeting at 3 PM?' },
    { id: '3', title: 'Bob Johnson', preview: 'Check out this link.' },
    // Add more messages as needed
  ]);

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Chat',
      'Are you sure you want to delete this chat?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => setMessages(messages.filter(msg => msg.id !== id)) },
      ]
    );
  };

  const handleMute = (id) => {
    Alert.alert('Muted Chat', 'You have muted this chat.');
    // Implement your mute logic here, e.g., updating the state or sending a request to the server
  };

  const addNewChat = () => {
    const newChat = {
        id: (messages.length+1).toString(),
        title: 'New Chat',
        Preview: ''
    };
    setMessages([...messages, newChat]);
  };

  return (
    <View style={styles.container}>
        <FlatList
        data={messages}
        renderItem={({ item }) => (
            <MessageTile item={item} onDelete={handleDelete} onMute={handleMute} navigation={navigation} />
        )}
        keyExtractor={item => item.id}
        />
        <TouchableOpacity
            style={styles.addButton}
            onPress={addNewChat}
        >
            <Icon name="chat-plus" size={24} color="#fff"/>
        </TouchableOpacity>
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
  }
});

export default MessagesPage;