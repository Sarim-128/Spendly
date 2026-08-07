import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MainButton from '../components/MainButton';




const Verification = ({ navigation }: any) => {

    const INITIAL_TIME = 5;
    const [secondsLeft, setSecondsLeft] = useState(INITIAL_TIME)

    useEffect(() => {
        if (secondsLeft <= 0)
            return;

        const timer = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000)

        return () => clearInterval(timer);
    }, [secondsLeft])

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = totalSeconds % 60;

        const paddedMinutes = String(minutes).padStart(2, '0');
        const paddedSeconds = String(seconds).padStart(2, '0')

        return `${paddedMinutes}:${paddedSeconds}`;
    }

    const handleResend = () => {
        if (secondsLeft > 0)
            return;
        setSecondsLeft(INITIAL_TIME)
        Alert.alert("Resend", "New code has been sent, check your email address")


        setCode(['', '', '', '']);
    }




    const [code, setCode] = useState(['', '', '', '']);

    const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null]);

    const handleChangeText = (text: string, index: number) => {
        const newCode = [...code]
        newCode[index] = text.slice(-1)
        setCode(newCode)

        if (text && index < 3) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const isCodeComplete = code.every((digit) => digit.trim() !== '');

    const handleVerify = () => {

        if (isCodeComplete) {
            navigation.navigate('NewPassword')
        }

    }
    return (
        <View style={styles.container}>
            {/* HEADER */}
            <Text style={styles.heading}>Check your email</Text>
            <Text style={styles.subHeading}>We've sent the code to your email</Text>


            {/* INPUT FIELDS FOR CODE */}
            <View style={styles.codeContainer}>
                {code.map((digit, index) => {
                    const isFocused = digit !== ''
                    return (
                        <TextInput
                            key={index}
                            ref={(el) => { (inputRefs.current[index] = el) }}
                            style={[styles.boxInput, isFocused && styles.activeBoxInput]}
                            value={digit}
                            onChangeText={(text) => handleChangeText(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            keyboardType='number-pad'
                            maxLength={1}
                            selectTextOnFocus
                        />
                    )
                })}
            </View>


            {/* TIMER */}
            <View style={styles.timerContainer}>
                <Text style={styles.timerLabel}>Code expires in: </Text>
                <Text style={styles.timerValue}>{formatTime(secondsLeft)}</Text>
            </View>


            {/* BUTTONS */}
            <View style={styles.buttonContainer}>
                <MainButton
                    title="Verify"

                    onPress={handleVerify}

                />
                <MainButton
                    title="Send again"
                    style={[styles.secondaryButton,
                    secondsLeft > 0 && styles.disabledSecondaryButton
                    ]}
                    textStyle={{ color: secondsLeft > 0 ? "#9FA5C0" : '#1FCC79' }}
                    onPress={handleResend}
                />
            </View>
        </View>
    )
}

export default Verification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 80,
        backgroundColor: '#050E07',
        paddingHorizontal: 24,
    },
    heading: {
        fontSize: 24,
        color: '#7FFE8C',
        fontFamily: 'Geist-Bold',
        marginBottom: 8,
    },
    subHeading: {
        fontSize: 16,
        color: '#A3BFA5',
        fontFamily: 'Geist-Regular',
        marginBottom: 32,
        textAlign: 'center',
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 12,
        marginBottom: 32,
    },
    boxInput: {
        width: 64,
        height: 72,
        borderWidth: 1.5,
        borderColor: '#7FFE8C',
        borderRadius: 16,
        textAlign: 'center',
        fontSize: 28,
        fontFamily: 'Geist-Regular',
        color: '#1FCC79',
        backgroundColor: '#2E3E5C',
    },
    activeBoxInput: {
        borderColor: '#1FCC79',
    },
    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    timerLabel: {
        fontSize: 15,
        fontFamily: 'Geist-Regular',
        color: '#A3BFA5',
    },
    timerValue: {
        fontSize: 15,
        fontFamily: 'Geist-Regular',
        color: '#FF6464',
    },
    buttonContainer: {
        width: '100%',
        gap: 16,
    },
    secondaryButton: {
        borderColor: '#D0DBEA',
        borderWidth: 1.5,
        backgroundColor: '#FFFFFF',
    },
    disabledSecondaryButton: {
        opacity: 0.6,
    }
})