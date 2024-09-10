import * as React from 'react';
import { useEffect } from 'react';
import { GestureHandlerRootView} from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../components/Screens/HomeScreen'; 
import CreateCalendarEventForm from '../components/Screens/CreateEventForm';
import CreateWorkPostForm from '../components/Screens/WorkPostForm';
import ViewCalendars from '../components/Screens/ViewCalendars';
import ViewSingleCalendar from '../components/Screens/SingleCalendar';
import ViewMessages from '../components/Screens/ViewMessages';
import MoreOptions from '../components/Screens/MoreOptions';
import OpenChatViewScreen from '../components/Screens/ChatView';

//--------------------- AWS Amplify imports & calls ---------------------
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);
import { withAuthenticator } from '@aws-amplify/ui-react-native';
//-----------------------------------------------------------------------

import {useAuthenticator} from '@aws-amplify/ui-react-native';
import {getUser} from '../src/graphql/queries';
import {createUser} from '../src/graphql/mutations';
import { generateClient } from 'aws-amplify/api';
const client = generateClient();


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator for the Home tab
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="CreateWorkPost" component={CreateWorkPostForm} options={{ title: 'New Work Post' }} />
  </Stack.Navigator>
);

// Stack Navigator for the Calendars tab
const CalendarsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ViewCalendars" component={ViewCalendars} options={{headerShown: false}} />
    <Stack.Screen name="ViewSingleCalendar" component={ViewSingleCalendar} options={{title: 'Calendar Details' }}/>
    <Stack.Screen name="CreateCalendarEvent" component={CreateCalendarEventForm} options={{ title: 'New Event' }} />
  </Stack.Navigator>
);

// Stack Navigator for the Messages tab
const MessagesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ViewMessages" component={ViewMessages} options={{headerShown: false}} />
    <Stack.Screen name="OpenChatViewScreen" component={OpenChatViewScreen} options={{ title: 'Chat' }} />
  </Stack.Navigator>
);

const MoreStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MoreOptions" component={MoreOptions} options={{headerShown: false}}/>
  </Stack.Navigator>
);

const App = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  useEffect(() => {
    console.log("Checking if current user exists in database...")
    const checkAndCreateUser = async () => {
      try {
        // Query the backend to check if the user already exists
        const userData = await client.graphql(
          {query:getUser,
            variables: {
              id: user.userId
            }
          }) // Pass variables inside the graphqlOperation
  
        if (!userData.data.getUser) {
          console.log("USER DOESNT EXIST")
          // If user doesn't exist, create the user in the backend
          await client.graphql(
            {query: createUser, 
              variables: {
                input: {
                  id: user.userId, // Use username as ID or you can use `sub` from `user.attributes.sub`
                  name: user.signInDetails.loginId, // Set the user name, or use additional fields like email
                }
              }
            })
          console.log('User created in backend');
        }
      } catch (error) {
        console.log('Error checking/creating user in backend: ', error);
      }
    };
  
    checkAndCreateUser(); // Call the function when the app mounts to check and create the user
  }, [user]);
  return(
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Tab.Navigator
          initialRouteName="HomeStack"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'HomeStack') {
                iconName = 'home';
              } else if (route.name === 'CalendarsStack') {
                iconName = 'calendar';
              } else if (route.name === 'MessagesStack') {
                iconName = 'message-text';
              }else if (route.name ==='MoreStack') {
                iconName = 'more';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'purple',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              height: 70
            },
            headerStyle: {
              height: 40, 
              backgroundColor: '#fff',
            },
            headerTitleStyle: {
              fontSize: 18, 
              marginTop: -50,
            }

          })}
        >
          <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: 'Home' }} />
          <Tab.Screen name="CalendarsStack" component={CalendarsStack} options={{ title: 'Calendars'}} />
          <Tab.Screen name="MessagesStack" component={MessagesStack} options={{ title: 'Messages' }} />
          <Tab.Screen name="MoreStack" component={MoreStack} options={{title: 'More'}}/>
        </Tab.Navigator>
    </GestureHandlerRootView>)
};

export default withAuthenticator(App);