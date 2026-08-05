import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MainInput from '../components/MainInput'
import MainButton from '../components/MainButton'
import PasswordInput from '../components/PasswordInput'
import { Blur, Canvas, Circle, RadialGradient, vec, BoxShadow, RoundedRect, rrect, rect, TwoPointConicalGradient, Rect, Skia, Path, LinearGradient } from '@shopify/react-native-skia'

const { width, height } = Dimensions.get('window');
const leftRightCard = rrect(rect(0, 0, 58, 58), 18, 18);
const centerCard = rrect(rect(0, 0, 76, 76), 24, 24);
const spotlightPath = Skia.Path.Make();
spotlightPath.moveTo(width / 2 - 20, 0);          // Top left of beam origin
spotlightPath.lineTo(width / 2 + 20, 0);          // Top right of beam origin
spotlightPath.lineTo(width / 2 + 140, 220);       // Bottom right expansion
spotlightPath.lineTo(width / 2 - 140, 220);       // Bottom left expansion
spotlightPath.close();



const Login = () => {

    const [boxLayout, setBoxLayout] = useState({ width: 0, height: 0 });

    return (
        <View style={styles.container}>


            {/* UPPER THREE ICONS */}
            {/* BG BLUR */}
            <Canvas style={[StyleSheet.absoluteFill, { flex: 1 }]} pointerEvents="none">
                <Path path={spotlightPath}>
                    <LinearGradient
                        start={vec(width, 100)}     // Start at top center
                        end={vec(width, 260)}       // Direct downward beam travel
                        colors={[
                            'rgba(74, 222, 128, 0.75)',  // Bright vivid neon source at top
                            'rgba(34, 197, 94, 0.35)',   // Mid-beam glow
                            'rgba(21, 128, 61, 0.08)',   // Fading beam tail
                            'transparent',               // Clean falloff
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
                onLayout={(e) => setBoxLayout(e.nativeEvent.layout)}
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




                <MainInput
                    placeholder="Enter your email"
                    source={require('../assets/images/login/mail.png')}

                />

                <PasswordInput />

                <TouchableOpacity style={styles.forgotPassBtn}>
                    <Text style={styles.forgotPassTxt}>Forgot password?</Text>
                </TouchableOpacity>

                <MainButton
                    title="Login"
                />

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
                <TouchableOpacity style={styles.footerBtn}>
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
        width: '93%',
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
    }

})