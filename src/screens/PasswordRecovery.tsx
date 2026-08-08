import { Keyboard, StyleSheet, Text, View } from "react-native"
import MainInput from "../components/MainInput"
import MainButton from "../components/MainButton"
import * as yup from 'yup'
import { Formik } from "formik"


const RecoverySchema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required')
})


const PasswordRecovery = ({ navigation }: any) => {


    const handleContinue = () => {
        Keyboard.dismiss()
        navigation.navigate('Verification')
    }

    return (
        <View style={styles.container}>

            <Text style={styles.heading}>Password recovery</Text>

            <Text style={styles.subHeading}>Enter your email to recover your password</Text>

            <Formik
                initialValues={{ email: '' }}
                validationSchema={RecoverySchema}
                onSubmit={handleContinue}
            >

                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    < View style={{ alignSelf: 'stretch' }}>
                        <MainInput
                            source={require('../assets/images/login/mail.png')}
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />

                        {touched.email && errors.email && (
                            <Text style={styles.errorTxt}>{errors.email}</Text>
                        )}

                        <MainButton
                            title="Continue"
                            styleBtn={styles.button}
                            onPress={() => handleSubmit()}
                        />
                    </View>
                )}

            </Formik >

        </View >
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
    errorTxt: {
        fontFamily: 'Geist-Regular',
        color: '#FF6B6B',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
    button: {
        marginTop: 20,
        width: '100%'
    }
})