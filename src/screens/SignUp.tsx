import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import PasswordInput from '../components/PasswordInput'
import MainInput from '../components/MainInput'
import MainButton from '../components/MainButton'



const SignUp = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");



    const hasMinLength = password.length >= 6
    const hasNum = /\d/.test(password)

    const isPassowrdValid = hasMinLength && hasNum;
    const isFormValid = email.trim().length > 0 && isPassowrdValid
    return (



        //  HEADER
        <View style={styles.container}>
            <Text style={styles.heading}>Welcome!</Text>
            <Text style={styles.para}>Please enter your account here</Text>

            {/* INPUT FEILDS */}
            <MainInput
                source={require('../assets/images/login/mail.png')}
                placeholder="Email or phone number"
                value={email}
                onChangeText={setEmail}
            />

            <PasswordInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
            />

            {/* SIGN UP BUTTON */}
            <MainButton
                styleBtn={{ marginTop: 20, }}
                title="Sign Up"
                onPress={() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'DashboardTabs' }]
                    })
                }}
            />




        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#050E07'
    },
    heading: {
        fontSize: 24,
        color: '#7FFE8C',
        fontFamily: 'Geist-Bold',
        marginBottom: 10,
        marginTop: 60,
    },
    para: {
        fontSize: 16,
        color: '#A3BFA5',
        fontFamily: 'Geist-Regular',
        marginBottom: 30,
    },
})