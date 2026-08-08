import { Dimensions, Image, Keyboard, LayoutChangeEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MainInput from '../components/MainInput'
import MainButton from '../components/MainButton'
import PasswordInput from '../components/PasswordInput'
import { Blur, Canvas, RadialGradient, vec, BoxShadow, RoundedRect, rrect, rect, Rect, Skia, Path, LinearGradient } from '@shopify/react-native-skia'
import { storage } from '../utils/storage'
import * as yup from 'yup'
import { Formik } from 'formik'


const { width, height } = Dimensions.get('window');

const LoginSchema = yup.object().shape({
    email: yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
})




const Login = ({ navigation }: any) => {



    const handleLogin = () => {
        storage.set('isLoggedIn', true)
        Keyboard.dismiss()
        navigation.reset({
            index: 0,
            routes: [{ name: 'DashboardTabs' }]
        })

    }

    const [boxLayout, setBoxLayout] = useState({ width: 0, height: 0 });

    const leftRightCard = rrect(rect(0, 0, 58, 58), 18, 18);
    const centerCard = rrect(rect(0, 0, 76, 76), 24, 24);
    const builder = Skia.PathBuilder.Make();
    builder.moveTo(width / 2 - 20, 0);          // Top left of beam origin
    builder.lineTo(width / 2 + 20, 0);          // Top right of beam origin
    builder.lineTo(width / 2 + 140, 220);       // Bottom right expansion
    builder.lineTo(width / 2 - 140, 220);       // Bottom left expansion
    builder.close();

    const spotlightPath = builder.build();


    const handleLayout = (e: LayoutChangeEvent) => {
        const { width: w, height: h } = e.nativeEvent.layout;
        if (boxLayout.width !== w || boxLayout.height !== h) {
            setBoxLayout({ width: w, height: h });
        }
    };

    return (
        <View style={styles.container}>


            {/* UPPER THREE ICONS */}
            {/* BG BLUR */}
            <Canvas style={[StyleSheet.absoluteFill, { flex: 1 }]} pointerEvents="none">
                <Path path={spotlightPath}>
                    <LinearGradient
                        start={vec(width / 2, 0)}
                        end={vec(width / 2, 220)}
                        colors={[
                            'rgba(74, 222, 128, 0.75)',
                            'rgba(34, 197, 94, 0.35)',
                            'rgba(21, 128, 61, 0.08)',
                            'transparent',
                        ]}
                        positions={[0, 0.35, 0.75, 1]}
                    />

                    <Blur blur={30} />
                </Path>
            </Canvas>


            {/* ICONS CONTAINER */}
            <View style={styles.iconContainer}>


                {/* LEFT CARD */}
                <View style={styles.leftCard}>
                    <Canvas style={StyleSheet.absoluteFill}>

                        {/* Outer Glow */}
                        <BoxShadow dx={0} dy={0} blur={12} color="rgba(74, 222, 128, 0.3)" />

                        <RoundedRect rect={leftRightCard} color="rgba(12, 34, 20, 0.75)" />

                        {/* Inner Glow */}
                        <BoxShadow dx={0} dy={0} blur={10} color="rgba(134, 239, 172, 0.4)" inner />

                    </Canvas>
                    <Image style={styles.iconSmall} source={require('../assets/images/login/chart.png')} />
                </View>


                {/* CENTER CARD */}
                <View style={styles.centerCard}>
                    <Canvas style={StyleSheet.absoluteFill}>

                        {/* Soft Outer Glow */}
                        <BoxShadow dx={0} dy={0} blur={16} color="rgba(74, 222, 128, 0.4)" />

                        <RoundedRect rect={centerCard} color="rgba(12, 34, 20, 0.75)" />

                        {/* Inner Highlight/Glow Bleed */}
                        <BoxShadow dx={0} dy={0} blur={14} color="rgba(134, 239, 172, 0.5)" inner />

                    </Canvas>
                    <Image style={styles.iconLarge} source={require('../assets/images/login/wallet.png')} />
                </View>


                {/* RIGHT CARD */}
                <View style={styles.rightCard}>
                    <Canvas style={StyleSheet.absoluteFill}>

                        <BoxShadow dx={0} dy={0} blur={12} color="rgba(74, 222, 128, 0.3)" />

                        <RoundedRect rect={leftRightCard} color="rgba(12, 34, 20, 0.75)" />

                        <BoxShadow dx={0} dy={0} blur={10} color="rgba(134, 239, 172, 0.4)" inner />

                    </Canvas>
                    <Image style={styles.iconSmall} source={require('../assets/images/login/loan.png')} />
                </View>
            </View>


            <Text style={styles.title}>Spendly</Text>
            <Text style={styles.subTitle}>Smart money, smarter life</Text>



            <View
                style={styles.box}
                onLayout={handleLayout}
            >
                {/* Background Canvas */}
                {boxLayout.height > 0 && (
                    <Canvas style={StyleSheet.absoluteFill} pointerEvents="none">
                        <Rect
                            x={0}
                            y={0}
                            width={boxLayout.width}
                            height={boxLayout.height}
                            color="#0C2214"
                        />

                        <Rect
                            x={0}
                            y={0}
                            width={boxLayout.width}
                            height={boxLayout.height}
                        >
                            <RadialGradient
                                c={vec(boxLayout.width / 2, 0)}
                                r={boxLayout.width * 0.9}
                                colors={[
                                    'rgba(34, 197, 94, 0.28)',
                                    'rgba(21, 128, 61, 0.10)',
                                    'transparent',
                                ]}
                            />
                        </Rect>
                    </Canvas>
                )}




                <Formik
                    initialValues={{ email: "", password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={handleLogin}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (

                        <View>

                            <MainInput
                                placeholder="Enter your email"
                                source={require('../assets/images/login/mail.png')}
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

                            <TouchableOpacity onPress={() => navigation.navigate("PasswordRecovery")} style={styles.forgotPassBtn}>
                                <Text style={styles.forgotPassTxt}>Forgot password?</Text>
                            </TouchableOpacity>

                            <MainButton
                                onPress={() => handleSubmit()}
                                title="Login"
                            />
                        </View>
                    )}
                </Formik>

                <Text style={styles.continue}> • Or continue with •</Text>

                <TouchableOpacity style={styles.googleBtn}>
                    <View style={styles.googleIconContainer}>
                        <Image style={styles.googleIcon} source={require('../assets/images/login/google.png')} />
                    </View>
                    <Text style={styles.googleText}>Continue with Google</Text>
                </TouchableOpacity>


            </View>

            <View style={styles.footerContainer}>
                <Text style={styles.footerTitle}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.footerBtn}>
                    <Text style={styles.footerText}>Sign Up</Text>
                </TouchableOpacity>
            </View>

        </View>

    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#050E07',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 12,
        width: '100%',
        height: 100,

    },
    leftCard: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '-15deg' }, { translateY: -12 }],
        marginRight: 18,
        borderWidth: 1,
        borderColor: 'rgba(74, 222, 128, 0.5)',
        borderRadius: 18,
        overflow: 'hidden',
    },
    centerCard: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ translateY: 6 }],
        zIndex: 2,
        marginHorizontal: 4,
        borderWidth: 1.5,
        borderColor: 'rgba(74, 222, 128, 0.5)',
        borderRadius: 24,
        overflow: 'hidden',

    },
    rightCard: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '15deg' }, { translateY: -12 }],
        marginLeft: 12,
        borderWidth: 1,
        borderColor: 'rgba(74, 222, 128, 0.5)',
        borderRadius: 18,
        overflow: 'hidden',
    },
    iconLarge: {
        height: 30,
        width: 30,
        tintColor: '#E2FCEF'
    },
    iconSmall: {
        height: 30,
        width: 30,
        tintColor: '#E2FCEF'
    },
    title: {
        fontFamily: 'Geist-Bold',
        fontSize: 24,
        color: 'white',
        marginBottom: '2%'
    },
    subTitle: {
        fontFamily: 'Geist-Regular',
        fontSize: 14,
        color: "#A3BFA5",
        marginBottom: "7%"
    },
    box: {
        width: '100%',
        padding: 20,
        borderRadius: 28,
        borderWidth: 1.5,
        borderColor: 'rgba(74, 222, 128, 0.3)', // Green stroke line
        overflow: 'hidden',
        position: 'relative',
    },
    forgotPassBtn: {
        marginVertical: 14,
        alignSelf: 'flex-end'
    },
    forgotPassTxt: {
        fontFamily: 'Geist-Bold',
        color: '#7FFE8C',
        fontSize: 12,
    },
    continue: {
        fontFamily: 'Geist-Regular',
        color: '#A3BFA5',
        marginVertical: '2%',
        alignSelf: 'center',
    },
    googleBtn: {
        borderWidth: 1,
        borderColor: '#A3BFA5',
        padding: 6,
        height: 50,
        borderRadius: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 16,
        flexDirection: 'row'
    },
    googleIconContainer: {
        backgroundColor: '#0c1c0e',
        padding: 5,
        borderRadius: 40,
        marginRight: 8,
    },
    googleIcon: {
        width: 28,
        height: 28,

    },
    googleText: {
        fontFamily: 'Geist-Bold',
        color: "white",
        fontSize: 15,
        marginRight: '10%',
    },
    footerContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: 22,
    },
    footerTitle: {
        fontFamily: 'Geist-Regular',
        color: '#A3BFA5',
        marginRight: '2%'
    },
    footerBtn: {

    },
    footerText: {
        fontFamily: 'Geist-Bold',
        color: '#7FFE8C',
    },
    errorTxt: {
        fontFamily: 'Geist-Regular',
        color: '#FF6B6B',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    }

})