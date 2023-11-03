import * as React from 'react';
import Home from './Pages/Home';
import Login from './Pages/Login';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native';

function App() {

  const [loggedIn, setLoggedIn] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  const handleLogin = (username, password) => {
    const loginData = {
      username: username,
      password: password,
    };

    axios.post('https://yorbenv.pythonanywhere.com/core/api/login/', loginData)
      .then(async (res) => {
        await AsyncStorage.setItem('access_token', res.data.access);
        await AsyncStorage.setItem('refresh_token', res.data.refresh);
        setLoggedIn(true)
      })
      .catch((error) => {
        console.error('Authentication Error:', error);
      });
  }

  React.useEffect(() => {
    const getTokens = async () => {
      const accessToken = await AsyncStorage.getItem('access_token');
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      if (accessToken && refreshToken) { setLoading(false), setLoggedIn(true) }
      else { setLoggedIn(false) }


      const response = await axios.post('https://yorbenv.pythonanywhere.com/api/token/refresh/', {
        refresh: refreshToken,
      })
      console.log(response)
    }

    getTokens()


  }, [])


  return (
    loading ?
      <Text>Loading</Text>
      : loggedIn === true ?
        <Home logout={() => setLoggedIn(false)} />
        :
        <Login handleLogin={handleLogin} />
  );
}

export default App;