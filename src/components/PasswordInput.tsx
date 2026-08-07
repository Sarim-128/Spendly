import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const PasswordInput = ({ value, onChangeText, style, source }: any) => {

    const [show, setShow] = useState(false);

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/images/login/lock.png')} />
            <TextInput
                onChangeText={onChangeText}
                value={value}
                placeholderTextColor="#acb0ac"
                placeholder='Enter your password'
                style={[styles.input, style]}
                secureTextEntry={!show}
            />
            <TouchableOpacity onPress={() => setShow(prev => !prev)}>
                <Image style={styles.image} source={require('../assets/images/login/visible.png')} />
            </TouchableOpacity>
        </View>
    )
}

export default PasswordInput

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0D1B10',
        borderRadius: 50,
        paddingHorizontal: 16,
        height: 50,
        marginVertical: 12,
        width: "95%",
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'rgba(74, 222, 128, 0.5)',
        justifyContent: 'center',
    },
    image: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginRight: 12,

    },
    input: {
        flex: 1,
        color: '#A3BFA5',
        fontFamily: 'Geist-Regular',

    },
})