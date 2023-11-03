import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker'

const SelectBox = ({ options, selectedValue, onValueChange }) => {
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => onValueChange(itemValue)}
          style={styles.picker}
        >
          {options.map((option) => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 20,
      width: 300,
      margin: 10,
      justifyContent: 'center',
      backgroundColor: 'white'
    },
    picker: {
      height: 40,
    },
  });
  
  export default SelectBox;
  