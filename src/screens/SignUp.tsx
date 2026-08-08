import { Alert, Image, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import PasswordInput from '../components/PasswordInput'
import MainInput from '../components/MainInput'
import MainButton from '../components/MainButton'
import { storage } from '../utils/storage'
import * as yup from 'yup'
import { Formik } from 'formik'


const LoginSchema = yup.object().shape({
    email: yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
})

const SignUp = ({ navigation }: any) => {


    const handleLogin = () => {
        storage.set('isLoggedIn', true)
        Keyboard.dismiss()
        navigation.reset({
            index: 0,
            routes: [{ name: 'DashboardTabs' }]
        })

    }

    return (



        //  HEADER
        <View style={styles.container}>
            <Text style={styles.heading}>Welcome!</Text>
            <Text style={styles.para}>Please enter your account here</Text>

            <Formik
                initialValues={{ email: "", password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={{ alignSelf: 'stretch' }}>
                        {/* INPUT FEILDS */}
                        <MainInput
                            source={require('../assets/images/login/mail.png')}
                            placeholder="Email or phone number"
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                        {touched.email && errors.email && (
                            <Text style={styles.errorTxt}>{errors.email}</Text>
                        )}

                        <PasswordInput
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                        />
                        {touched.password && errors.password && (
                            <Text style={styles.errorTxt}>{errors.password}</Text>
                        )}

                        {/* SIGN UP BUTTON */}
                        <MainButton
                            styleBtn={{ marginTop: 20, }}
                            title="Sign Up"
                            onPress={handleSubmit}
                        />
                    </View>
                )}
            </Formik>




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
    errorTxt: {
        fontFamily: 'Geist-Regular',
        color: '#FF6B6B',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    }
})