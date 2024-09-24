import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { listUsers, getUser} from '../src/graphql/queries';
import { createFriendship, updateFriendship } from '../src/graphql/mutations'; // Mutation to send friend request
import { listFriendships } from '../src/graphql/queries';

import { generateClient } from 'aws-amplify/api';
const client = generateClient();



const FriendsScreen = () => {
  console.log("--------------------------------------------")
  const { user } = useAuthenticator((context) => [context.user]);
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchFriendsAndRequests();
    
  }, []);

  useEffect(() =>{
    if (friends.length > 0) {
      fetchAllUsers();
    }
  }, [friends])

  const fetchAllUsers = async () => {
    try {
      const allUsers = await client.graphql({ query: listUsers });
      const friendIds = friends.map(friends => {
        return friends.requesterId === user.userId ? friends.requesteeId : friends.requesterId;
      });

      const nonFriends = allUsers.data.listUsers.items.filter(listedUser => {
        return listedUser.id !== user.userId && !friendIds.includes(listedUser.id);
      });
      console.log("FRIEND IDS: ", friendIds)
      console.log("NON FRIENDS IDS: ", nonFriends);
      setAllUsers(nonFriends);
      setFilteredUsers(nonFriends);
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  };


  const fetchFriendsAndRequests = async () => {
    try {
      console.log("Getting friendships");
      
      // Fetch all friendships
      const allFriendships = await client.graphql({ query: listFriendships });
      const friendsRequestsList = allFriendships.data.listFriendships.items.filter(
        (friendship) => friendship.status === 'PENDING'
      );
      const friendsList = allFriendships.data.listFriendships.items.filter(
        (friendship) => friendship.status === 'ACCEPTED'
      );
      console.log("FRIENDS---: ",friendsList);
      setFriends(friendsList);
      setFriendRequests(friendsRequestsList);
      //fetchAllUsers();
    } catch (error) {
      console.error("Error fetching friends and requests: ", error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = allUsers.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(allUsers);
    }
  };

  const sendFriendRequest = async (requestee) => {
    console.log("REQUESTEE:", requestee)
    try {
      const sentFriendRequest = await client.graphql({
        query: createFriendship, 
        variables: {
          input: {
            requesterId: user.userId,
            requesteeId: requestee.id,
            status: 'PENDING',
            requester: user.username,
            requestee: requestee.name
          }
        }
      });
      setFriendRequests(sentFriendRequest)
      console.log('Friend request sent');
    } catch (error) {
      console.error('Error sending friend request: ', error);
    }
  };

  const acceptFriendRequest = async (requestId) => {
    try {
      // Update the friendship status to 'ACCEPTED'
      const response = await client.graphql({
        query: updateFriendship,
        variables: {
          input: {
            id: requestId,  // The ID of the friendship request
            status: 'ACCEPTED',
          }
        }
      });
  
      console.log('Friend request accepted', response);
      // After accepting, update the local state or refetch data
      fetchFriendsAndRequests();
    } catch (error) {
      console.error('Error accepting friend request: ', error);
    }
  };

  const rejectFriendRequest = async (requestId) => {
    try {
      const response = await client.graphql({
        query: updateFriendship, 
        variables: {
          input: {
            id: requestId,
            status:'REJECTED'
          }
        },
      });
  
      console.log("Friend request rejected:", response);
      fetchFriendsAndRequests(); // Refresh the list
    } catch (error) {
      console.error('Error rejecting friend request: ', error);
    }
  };

  const renderFriend = ({ item }) => {
    const friendName = item.requester === user.username ? item.requestee : item.requester
    return (
      <View style={styles.friendContainer}>
        <Text style={styles.friendName}>{friendName}</Text>
      </View>
    )
  };

  const renderFriendRequest = ({ item }) => (
    <View style={styles.friendRequestContainer}>
      <Text style={styles.friendRequestName}>{item.requester}</Text>
      <View style={styles.requestActions}>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => acceptFriendRequest(item.id)}
        >
          <Text style={styles.acceptText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => rejectFriendRequest(item.id)}
        >
          <Text style={styles.rejectText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderUserSearch = ({ item }) => (
    <View style={styles.userSearchContainer}>
      <Text style={styles.userName}>{item.name}</Text>
      <TouchableOpacity
        style={styles.sendRequestButton}
        onPress={() => sendFriendRequest(item)}
      >
        <Text style={styles.sendRequestText}>Send Request</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a friend"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredUsers}
        renderItem={renderUserSearch}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No users found.</Text>}
      />

      <Text style={styles.header}>Friends</Text>
      <FlatList
        data={friends}
        renderItem={renderFriend}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No friends yet.</Text>}
      />

      <Text style={styles.header}>Friend Requests</Text>
      <FlatList
        data={friendRequests}
        renderItem={renderFriendRequest}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No pending friend requests.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
    width: 340,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  friendContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  friendName: {
    fontSize: 16,
    color: 'black'
  },
  friendRequestContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  friendRequestName: {
    fontSize: 16,
    marginBottom: 8,
  },
  requestActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  acceptButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
  },
  rejectButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
  },
  acceptText: {
    color: '#fff',
  },
  rejectText: {
    color: '#fff',
  },
  searchInput: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  userSearchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    width: 300,
  },
  userName: {
    fontSize: 16,
  },
  sendRequestButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 8,
  },
  sendRequestText: {
    color: '#fff',
  },
});

export default FriendsScreen;