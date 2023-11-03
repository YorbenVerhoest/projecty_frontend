import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';


const Login =  (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    return (
        <View>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/images/test.svg')} // Import your image file
                    style={styles.image}
                />
            </View>
            <View style={styles.container}>
                <View style={styles.inputWrapper}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputText}>Username</Text>
                        <TextInput
                            placeholder="Username"
                            onChangeText={text => setUsername(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputText}>Password</Text>
                        <TextInput
                            placeholder="Password"
                            secureTextEntry={true}
                            onChangeText={text => setPassword(text)}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => props.handleLogin(username, password)}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%', // Take the full width of the screen
        height: '30%', // Cover approximately 30% of the screen's height
        position: 'absolute',
        top: 0, // Stick to the top of the screen
      },
      image: {
        width: '100%', // Take the full width of the container
        height: '100%', // Take the full height of the container
      },
    container: {
        // flex: 1,
        justifyContent: 'flex-end'
    },
    inputWrapper: {
        padding: 20,
    },
    inputContainer: {
        margin: 5,
        borderBottomWidth: 0.5,
        borderColor: '#EED09C',
    },
    inputText: {
        color: '#EED09C',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#EED09C',
        borderRadius: 5,
        margin: 10,
        marginLeft: 0,
        marginRight: 0,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    buttonText: {
        color: 'white',
        fontSize: 25,
    },
});

export default Login;
