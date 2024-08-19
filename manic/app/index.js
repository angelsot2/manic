import * as React from 'react';
import {Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/Screens/HomeScreen'; 
import CreateCalendarEventForm from '../components/Screens/CreateEventForm';
import CreateWorkPostForm from '../components/Screens/WorkPostForm';
import ViewCalendars from '../components/Screens/ViewCalendars';
import ViewMessages from '../components/Screens/ViewMessages';
import ViewSingleCalendar from '../components/Screens/SingleCalendar';
import ViewMoreOptions from '../components/Screens/MoreOptions';
import OpenChatViewScreen from '../components/Screens/ChatView';

//--------------------- AWS Amplify imports & calls ---------------------
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import amplifyconfig from '../src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);
import { withAuthenticator, useAuthenticator} from '@aws-amplify/ui-react-native';
//-----------------------------------------------------------------------

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

const ViewCalendarsScreen =({navigation}) => {
  return(
    <ViewCalendars onCancel={() => navigation.goBack()}/>
  )
};

const ViewSingleCalendarScreen = ({navigation}) => {
  return (
    <ViewSingleCalendar onCancel={() => navigation.goBack()}/>
  )
}

const ViewMessagesScreen = ({navigation}) => {
  return (
    <ViewMessages onCancel = {() => navigation.goBack()}/>
  )
};

const ViewMoreOptionsScreen= ({navigation}) => {
  return (
    <ViewMoreOptions onCancel = {() => navigation.goBack()}/>
  )
}

const OpenChatView = ({route, navigation}) => {
  return (
    <OpenChatViewScreen route={route} onCancel = {() => navigation.goBack()}/>
  )
}

const App = () => {
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
      <Stack.Screen name="CreateCalendarEvent" component={CreateCalendarEventScreen} options={{ title: 'New Event' }} />
      <Stack.Screen name="CreateWorkPost" component={CreateWorkPostScreen} options= {{title: 'New Work Post'}} />
      <Stack.Screen name='ViewCalendars' component={ViewCalendarsScreen} options={{title: 'All Calendars'}}/>
      <Stack.Screen name='ViewSingleCalendar' component={ViewSingleCalendarScreen} options={{title: 'Calendar'}}/>
      <Stack.Screen name='ViewMessages' component={ViewMessagesScreen} options={{title: 'All Messages'}}/>
      <Stack.Screen name='ViewMoreOptions' component={ViewMoreOptionsScreen} options={{title: 'More Options'}}/>
      <Stack.Screen name='ChatViewScreen' component={OpenChatView} options={{title: 'chat'}}/>
    </Stack.Navigator>
  
  );
}

export default withAuthenticator(App);