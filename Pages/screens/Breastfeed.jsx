import axios from 'axios';
import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function Breastfeed({ navigation }) {



    const [data, setData] = React.useState({
        baby: 1,
        id: "",
        breast_side: "LEFT",
        end_time: null,
        id: "",
        start_time: null,
    })

    React.useEffect(() => {
        getData()
    }, [])


    const getData = async () => {
        await axios.get('https://yorbenv.pythonanywhere.com/core/api/registrations/')
            .then((res) => {
                if (res.data.length > 0) {
                    let copy = { ...data }
                    copy = res.data[0]
                    setData(copy)
                }
            })
    }


    const handleData = async () => {
        let copy = { ...data }
        if (copy.start_time === null) {
            const currentStartDateTime = new Date()
            const year = currentStartDateTime.getUTCFullYear();
            const month = String(currentStartDateTime.getUTCMonth() + 1).padStart(2, '0');
            const day = String(currentStartDateTime.getUTCDate()).padStart(2, '0');
            const hours = String(currentStartDateTime.getUTCHours()).padStart(2, '0');
            const minutes = String(currentStartDateTime.getUTCMinutes()).padStart(2, '0');
            const seconds = String(currentStartDateTime.getUTCSeconds()).padStart(2, '0');
            copy.start_time = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
        }
        else if (copy.end_time === null) {
            const currentEndDateTime = new Date()
            const year = currentEndDateTime.getUTCFullYear();
            const month = String(currentEndDateTime.getUTCMonth() + 1).padStart(2, '0');
            const day = String(currentEndDateTime.getUTCDate()).padStart(2, '0');
            const hours = String(currentEndDateTime.getUTCHours()).padStart(2, '0');
            const minutes = String(currentEndDateTime.getUTCMinutes()).padStart(2, '0');
            const seconds = String(currentEndDateTime.getUTCSeconds()).padStart(2, '0');
            copy.end_time = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
        }
        setData(copy)
        let JWT_TOKEN = await AsyncStorage.getItem('access_token')
        if (copy.id) {
            await axios.put(`https://yorbenv.pythonanywhere.com/core/api/registrations/${copy.id}/`, copy, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${JWT_TOKEN}` },
            }).then((res) => {
                setData({ baby: 1, id: "", breast_side: "LEFT", end_time: null, id: "", start_time: null, })
            })
        }
        else {
            await axios.post('https://yorbenv.pythonanywhere.com/core/api/registrations/', copy, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${JWT_TOKEN}` },
            }).then((res) => {
                copy.id = res.data.id
                setData(copy)
            })
        }


    }

    const HandleBreastSide = (e) => {
        let copy = { ...data }
        if (copy.start_time === null && copy.end_time === null) {
            copy.breast_side = e
            setData(copy)
        }
    }

    const resetData = () => {
        let copy = { ...data }
        copy.start_time = null
        copy.end_time = null
        setData(copy)
    }




    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <TouchableOpacity onPress={() => handleData()} style={styles.StartButton}>
                <Text style={styles.StartButtonText}>
                    {data.start_time ? 'End' : 'Start'}
                </Text>
            </TouchableOpacity>
            <View style={styles.BreastFeedContainer}>
                <View style={styles.BreastFeedButtons}>
                    <Text onPress={() => HandleBreastSide('LEFT')} style={[styles.BreastFeedSide, data.breast_side === 'LEFT' ? styles.BreastFeedSideActive : ""]}>Left breast</Text>
                    <Text onPress={() => HandleBreastSide('RIGHT')} style={[styles.BreastFeedSide, data.breast_side === 'RIGHT' ? styles.BreastFeedSideActive : ""]}>Right breast</Text>
                </View>
                <View style={styles.InfoContainer}>
                    <View style={styles.Info}>
                        <Text onPress={() => resetData()} style={styles.InfoTextHeading}>Start</Text>
                        <Text style={styles.InfoText}>{data.start_time ? data.start_time : "..."}</Text>
                    </View>
                    <View style={styles.Info}>
                        <Text style={styles.InfoTextHeading}>End</Text>
                        <Text style={styles.InfoText}>{data.end_time ? data.end_time : '...'}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    StartButton: {
        position: 'absolute',
        top: -125,
        backgroundColor: '#EED09C',
        borderRadius: 200,
        borderColor: "white",
        borderWidth: 30,
        width: 200,
        height: 200,
        justifyContent: "center",
        alignItems: "center"
    },
    StartButtonText: {
        color: 'white',
        fontSize: 30
    },
    BreastFeedContainer: {
        // marginTop: 70,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    BreastFeedButtons: {
        backgroundColor: '#B4D2E6',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%',
        borderRadius: 5,
        height: 40,
    },
    BreastFeedSide: {
        fontSize: 18,
        height: '80%',
        width: '47%',
        textAlign: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    BreastFeedSideActive: {
        backgroundColor: 'white',
    },
    InfoContainer: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
    },
    Info: {
        backgroundColor: '#EED09C',
        width: '45%',
        height: 70,
        borderRadius: 5,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    InfoTextHeading: {
        fontSize: 25,
        color: 'white'
    },
    InfoText: {
        color: 'white'
    }
})