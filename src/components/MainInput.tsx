import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const MainInput = ({ placeholder, value, onChangeText, style, source }: any) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={source} />
            <TextInput
                onChangeText={onChangeText}
                value={value}
                placeholderTextColor="#acb0ac"
                placeholder={placeholder}
                style={[styles.input, style]}
            />
        </View>
    )
}

export default MainInput

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
        borderColor: 'rgba(74, 222, 128, 0.5)'
    },
    image: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginRight: 12,

    },
    input: {
        flex: 1,
        height: '100%',
        color: '#A3BFA5',
        fontFamily: 'Geist-Regular'
    },
})