import * as React from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation, logout }, props) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#333333',
            },
            headerTintColor: '#FFFFFF'
        });
    }, [navigation]);

    const handleLogout = async () => {
        await AsyncStorage.clear();
        logout()

    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text onPress={() => navigation.navigate('Home')} style={{ fontSize: 26, fontWeight: 'bold' }}>Settings Screen</Text>
            <Text onPress={() => handleLogout()}>Logout</Text>
        </View>
    );
}