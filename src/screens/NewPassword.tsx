import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MainButton from '../components/MainButton'
import PasswordInput from '../components/PasswordInput';



const NewPassword = ({ navigation }: any) => {
    const [password, setPassword] = useState("");





    const hasMinLength = password.length >= 6
    const hasNum = /\d/.test(password)

    const isPassowrdValid = hasMinLength && hasNum;
    const isFormValid = isPassowrdValid
    return (



        //  HEADER
        <View style={styles.container}>
            <Text style={styles.heading}>Reset your password</Text>
            <Text style={styles.para}>Please enter your new password</Text>

            {/* INPUT FEILDS */}


            <PasswordInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
            />






            {/* SIGN UP BUTTON */}
            <MainButton
                styleBtn={{ marginTop: 20, }}
                title="Log In"
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

export default NewPassword

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
        flex: 1,
        backgroundColor: '#050E07'
    },
    heading: {
        marginTop: 30,
        fontSize: 24,
        color: '#7FFE8C',
        fontFamily: 'Geist-Bold',
        marginBottom: 10,
    },
    para: {
        fontSize: 16,
        color: '#9FA5C0',
        fontFamily: 'Geist-Regular',
        marginBottom: 30,
    },


})