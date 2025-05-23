import * as React from 'react';
import {Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/Screens/HomeScreen'; // Adjust the import path as needed
import CreateCalendarEventForm from '../components/Screens/CreateEventForm'; // Adjust the import path as needed
import CreateWorkPostForm from '../components/Screens/WorkPostForm';
import LogInForm from '../components/Screens/LogInForm';

const Stack = createStackNavigator();

const CreateCalendarEventScreen = ({ navigation }) => {
  return (
    <CreateCalendarEventForm onCancel={() => navigation.goBack()} />
  );
};

const CreateWorkPostScreen = ({navigation}) => {
  return (
    <CreateWorkPostForm onCancel={() => navigation.goBack()} />
  );
};

const LogInScreen = ({navigation}) => {
  return (
    <LogInForm onCancel={() => navigation.goBack()}/>
  )
};



export default function App() {
  return (
    <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'purple',
        },
        headerTitleStyle: {
          fontSize: 25,
          fontWeight: 'bold',
          textAlign: 'left',
        },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="LogIn" component={LogInScreen} options={{title: 'Welcome. Log In'}}/>
      <Stack.Screen name="CreateCalendarEvent" component={CreateCalendarEventScreen} options={{ title: 'New Event' }} />
      <Stack.Screen name="CreateWorkPost" component={CreateWorkPostScreen} options= {{title: 'New Work Post'}} />
    </Stack.Navigator>
  
  );
}
