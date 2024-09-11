import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers, getUser } from '../src/graphql/queries';
import { createFriendship } from '../src/graphql/mutations'; // Mutation to send friend request
import { listFriendships, updateFriendship } from '../src/graphql/queries';

import { generateClient } from 'aws-amplify/api';
import { createTextChangeRange } from 'typescript';
const client = generateClient();



const FriendsScreen = () => {
  console.log("--------------------------------------------")
  const { user } = useAuthenticator((context) => [context.user]);
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    fetchFriendsAndRequests();
    fetchAllUsers();
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const currentlyUser = await client.graphql({
        query: getUser,
        variables: {
          id: user.userId,
        }
      });
      setCurrentUser(currentlyUser);
    }catch(error) {
      console.log("Unable to get current user", error)
    }

  }

  const fetchFriendsAndRequests = async () => {
    try {
        console.log("getting friendships")
        const allFriendships = await client.graphql({ query: listFriendships });
        console.log(allFriendships)
        const friendsList = allFriendships.data.listFriendships.items.filter(
            (friendship) => friendship.status === 'ACCEPTED'
        );
        console.log("Friends List: ", friendsList);
        const friendsRequestsList = allFriendships.data.listFriendships.items.filter(
            (friendship) => friendship.status === 'PENDING'
        );
        console.log("Friends requests: ", friendsRequestsList);
    } catch (error) {
      console.error("Error fetching friends and requests: ", error);
    }

  };

  const fetchAllUsers = async () => {
    try {
      const allUsers = await client.graphql({ query: listUsers });

      const filteredUsers = allUsers.data.listUsers.items.filter(
        (listedUser) => listedUser.id !== user.userId
      );
      setAllUsers(filteredUsers);
      setFilteredUsers(filteredUsers);
    } catch (error) {
      console.error('Error fetching users: ', error);
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

  const sendFriendRequest = async (requesteeId) => {
    try {
      const sentFriendRequest = await client.graphql({
        query: createFriendship, 
        variables: {
          input: {
            requester: currentUser,
            requesterId: user.userId,
            requesteeId,
            status: 'PENDING',
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
      await client.graphql({
        query:updateFriendship, 
        variables: {
          input: {
            id: requestId,
            status: 'ACCEPTED',
          },
        }
      });
      fetchFriendsAndRequests(); // Refresh the list
    } catch (error) {
      console.error('Error accepting friend request: ', error);
    }
  };

  const rejectFriendRequest = async (requestId) => {
    try {
      await client.graphql({
        query: updateFriendship, 
        variables: {
          input: {
            id: requestId,
            status: 'REJECTED',
          },
        }
      });
      fetchFriendsAndRequests(); // Refresh the list
    } catch (error) {
      console.error('Error rejecting friend request: ', error);
    }
  };

  const renderFriend = ({ item }) => (
    <View style={styles.friendContainer}>
      <Text style={styles.friendName}>{item.requestee.name}</Text>
    </View>
  );

  const renderFriendRequest = ({ item }) => (
    <View style={styles.friendRequestContainer}>
      <Text style={styles.friendRequestName}>{item.requester.name}</Text>
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
        onPress={() => sendFriendRequest(item.id)}
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



/*import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers } from '../src/graphql/queries'; // You would query the User model to get the friends and requests
import { listFriendships } from '../src/graphql/queries';
import { updateFriendship } from '../src/graphql/mutations'; // Mutation for accepting or rejecting friend requests

import { generateClient } from 'aws-amplify/api';
const client = generateClient();


const FriendsScreen = () => {
  const { user } = useAuthenticator((context) => [context.user]);

  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    fetchFriendsAndRequests();
  }, []);

  const fetchFriendsAndRequests = async () => {
    try {
        console.log("getting freindships")
        const allFriendships = await client.graphql({ query: listFriendships });
        console.log(allFriendships)
        const friendsList = allFriendships.data.listFriendships.items.filter(
            (friendship) => friendship.status === 'ACCEPTED'
        );
        console.log("Friends List: ", friendsList);
        const friendsRequestsList = allFriendships.data.listFriendships.items.filter(
            (friendship) => friendship.status === 'PENDiNG'
        );
        console.log("Friends requests: ", friendsRequestsList);
    } catch (error) {
      console.error("Error fetching friends and requests: ", error);
    }
  };

  const acceptFriendRequest = async (requestId) => {
    try {
      await client.graphql(graphqlOperation(updateFriendship, {
        input: {
          id: requestId,
          status: 'ACCEPTED',
        },
      }));
      fetchFriendsAndRequests(); // Refresh the list
    } catch (error) {
      console.error("Error accepting friend request: ", error);
    }
  };

  const rejectFriendRequest = async (requestId) => {
    try {
      await API.graphql(graphqlOperation(updateFriendship, {
        input: {
          id: requestId,
          status: 'REJECTED',
        },
      }));
      fetchFriendsAndRequests(); // Refresh the list
    } catch (error) {
      console.error("Error rejecting friend request: ", error);
    }
  };

  const renderFriend = ({ item }) => (
    <View style={styles.friendContainer}>
      <Text style={styles.friendName}>{item.requestee.name}</Text>
    </View>
  );

  const renderFriendRequest = ({ item }) => (
    <View style={styles.friendRequestContainer}>
      <Text style={styles.friendRequestName}>{item.requester.name}</Text>
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

  return (
    <View style={styles.container}>
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
    backgroundColor: 'purple',
    flex: 1,
    width: 300,
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
});

export default FriendsScreen;*/