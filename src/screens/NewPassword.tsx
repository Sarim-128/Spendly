import { Keyboard, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainButton from '../components/MainButton'
import PasswordInput from '../components/PasswordInput';
import * as yup from 'yup'
import { Formik } from "formik"


const newPassSchema = yup.object().shape({
    password: yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
})

const NewPassword = ({ navigation }: any) => {

    const handleLogin = () => {
        Keyboard.dismiss()

        navigation.reset({
            index: 0,
            routes: [{ name: 'DashboardTabs' }]
        })
    }

    return (

        //  HEADER
        <View style={styles.container}>
            <Text style={styles.heading}>Reset your password</Text>
            <Text style={styles.para}>Please enter your new password</Text>


            <Formik
                initialValues={{ password: '' }}
                validationSchema={newPassSchema}
                onSubmit={handleLogin}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={{ alignSelf: 'stretch' }}>
                        {/* INPUT FEILDS */}
                        <PasswordInput
                            placeholder="Password"
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
                            title="Log In"
                            onPress={handleSubmit}
                        />
                    </View>
                )}
            </Formik>


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
        marginTop: 60,
        fontSize: 24,
        color: '#7FFE8C',
        fontFamily: 'Geist-Bold',
        marginBottom: 10,
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
    },


})