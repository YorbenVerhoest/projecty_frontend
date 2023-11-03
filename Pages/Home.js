import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import HomeScreen from './screens/HomeScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import ProfileScreen from './screens/ProfileScreen';

//Screen names
const homeName = "Home";
const registrationsName = "Registrations";
const profileName = "Profile";

const Tab = createBottomTabNavigator();

function MainContainer(props) {

  React.useEffect(() => {
    const getTokens = async () => {
      const accessToken = await AsyncStorage.getItem('access_token');
      const refreshToken = await AsyncStorage.getItem('refresh_token');
    }
    
    getTokens()
  }, [])


  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;
            if (rn === homeName) { iconName = focused ? 'home' : 'home-outline'; }
            else if (rn === registrationsName) { iconName = focused ? 'list' : 'list-outline'; }
            else if (rn === profileName) { iconName = focused ? 'settings' : 'settings-outline'; }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarStyle: {
            backgroundColor: '#333333',
          },
        })}
        tabBarOptions={{
          activeTintColor: '#EED09C',
          inactiveTintColor: '#FFFFFF',
          labelStyle: { paddingBottom: 5, fontSize: 10 },
        }}
      >

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={registrationsName} component={RegistrationScreen} />
        {/* <Tab.Screen name={profileName} component={ProfileScreen} /> */}
        <Tab.Screen
          name={profileName}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              const iconName = focused ? 'settings' : 'settings-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          }}
        >
          {(screenProps) => (
            <ProfileScreen
              {...screenProps}
              logout={props.logout} // Pass the logout function to ProfileScreen
            />
          )}
        </Tab.Screen>

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;