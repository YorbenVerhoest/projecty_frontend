import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import SelectBox from '../../Components/SelectBox';
import BreastFeed from './Breastfeed';
import Sleep from './Sleep';
import Measurements from './Measurements';
import Diaper from './Diaper';
import Contractions from './Contractions';

export default function HomeScreen({ navigation }) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#333333',
            },
            headerTintColor: '#FFFFFF'
        });
    }, [navigation]);

    


    const options = ['Breastfeed', 'Sleep', 'Measurements', 'Diaper', 'Contractions'];
    const [selectedValue, setSelectedValue] = React.useState(options[0]);

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{flex: 1, alignItems: "center", position: 'relative'}}>
                <SelectBox
                    options={options}
                    selectedValue={selectedValue}
                    onValueChange={setSelectedValue}
                    style={styles.HeaderSelectBox}
                />
                <View style={styles.HeaderImageContainer} >
                    <Image source={require('../../assets/images/breastfeed.jpg')} style={styles.HeaderImage} />
                </View>
            </View>
            {
                selectedValue === 'Breastfeed' ? <BreastFeed />
                    : selectedValue === 'Sleep' ? <Sleep />
                        : selectedValue === 'Measurements' ? <Measurements />
                            : selectedValue === 'Diaper' ? <Diaper />
                                : <Contractions />
            }
        </View>
    );
}


const styles = StyleSheet.create({
    HeaderImageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        position: 'absolute',
        top: 0,
        zIndex: -1,
        opacity: .9,
        backgroundColor: '#333333'
      },
      HeaderImage: {
        height: '100%', 
      },
})