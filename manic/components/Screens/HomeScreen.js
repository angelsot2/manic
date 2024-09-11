import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);
import { generateClient } from 'aws-amplify/api';
import { listCalendars, listPosts } from '../../src/graphql/queries';
const client = generateClient();

const truncateText = (text, limit) => {
  return text.length > limit? text.substring(0, limit) + '...' : text
}


const RenderPostTile = ({ item }) => {
  return (
    <View style={styles.postTile}>
      {/* Header Section with Title */}
      <View style={styles.postHeader}>
        <Text style={styles.postTitle}>{item.desiredPosition}</Text>
        <Text style={styles.postDate}>
          Posted on: {new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
        </Text>
      </View>
      
      {/* Body Section with Description */}
      <View style={styles.postBody}>
        <Text style={styles.postDescription}>{truncateText(item.description, 48)}</Text>
        <View style={styles.detailsRow}>
          <Icon name="map-marker" size={20} color="#555" />
          <Text style={styles.detailText}>{item.location}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Icon name="clock-outline" size={20} color="#555" />
          <Text style={styles.detailText}>{item.duration}</Text>
        </View>
      </View>

      {/* Footer Section with Action Buttons */}
      <View style={styles.postFooter}>
        <TouchableOpacity style={styles.shareButton}>
          <Icon name="share-variant" size={20} color="#fff" />
          <Text style={styles.postButtonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CreateNewWorkPostButton = ({ navigation }) => {
  return (
    <View style={styles.createPostButtonContainer}>
      <Button
        title="Create New Work Post"
        mode="contained"
        onPress={() => navigation.navigate('CreateWorkPost')}
        style={styles.createPostButton}
        labelStyle={styles.postButtonText}
      >
        Create New Work Post
      </Button>
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const [workPosts, setWorkPosts] = useState([]);

  const FetchAllWorkPosts = async() => {
    try {
      const workPosts = await client.graphql({query: listPosts});
      const workPostsList = workPosts.data.listPosts.items;
      setWorkPosts(workPostsList);
    } catch (error) {
      console.log("Error fetchng all work posts: ", error);
    };
  };

  console.log('Fetching all work posts...');
  useEffect(() => {
    FetchAllWorkPosts();
  }, []);


  return (
    <View style={styles.container}>
      <CreateNewWorkPostButton navigation={navigation} />
        <Button
        label="get posts"
        onPress={() => FetchAllWorkPosts()}
        >
          Refresh Posts
        </Button>
      <FlatList
        data={workPosts}
        renderItem={RenderPostTile}
        keyExtractor={item => item.id}  // Ensure each item has a unique key
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  createPostButtonContainer: {
    width: 250,
    height: 50,
    marginHorizontal: 55,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderRadius: 5,
    marginTop: 20,
  },
  createPostButton: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'purple',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 15,
  },
  postTile: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    height: 160
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: -8
  },
  postDate: {
    fontSize: 12,
    color: '#999',
  },
  postBody: {
    marginBottom: 10,
  },
  postDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    flexWrap:'wrap',
    maxHeight: 60,
    overflow: 'hidden',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 5,
    fontSize: 13,
    color: '#555',
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6b52ae',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  detailsButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#4caf50',
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  listContainer: {
    paddingBottom: 100, // Add space for the add button
  },
});

export default HomeScreen;