import { Keyboard, StyleSheet, Text, View } from "react-native"

import { useState } from "react"
import MainInput from "../components/MainInput"
import PasswordInput from "../components/PasswordInput"
import MainButton from "../components/MainButton"




const PasswordRecovery = ({ navigation }: any) => {




    return (
        <View style={styles.container}>

            <Text style={styles.heading}>Password recovery</Text>

            <Text style={styles.subHeading}>Enter your email to recover your password</Text>

            <MainInput
                source={require('../assets/images/login/mail.png')}
                placeholder="Email"
                style={styles.input}

            />




            <MainButton
                title="Continue"
                styleBtn={{ marginTop: 15, }}
                onPress={() => navigation.navigate('Verification')}
            />
        </View>
    )
}


export default PasswordRecovery

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#050E07',
        alignItems: 'center',
        flex: 1,
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontFamily: 'Geist-Bold',
        color: '#7FFE8C',
        marginTop: 60
    },
    subHeading: {
        color: '#A3BFA5',
        fontFamily: 'Geist-Regular',
        marginBottom: 32,
        textAlign: 'center',
        marginTop: 7
    },
    input: {
        marginBottom: 0,
    },
})