import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const OpenChatViewScreen = ({ route }) => {
  const { chatId, title } = route.params;
  const navigation = useNavigation();


  useEffect(()=> {
      navigation.setOptions({title: title});
  }, [navigation, title]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat with {title}</Text>
      {/* Here, you would fetch and display the messages for this chat using chatId */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default OpenChatViewScreen;