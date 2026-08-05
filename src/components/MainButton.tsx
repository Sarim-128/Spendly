import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'

const MainButton = ({ onPress, styleBtn, title }: any) => {
    return (
        <View>
            <TouchableOpacity onPress={onPress} style={[styles.button, styleBtn]}>
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MainButton

const styles = StyleSheet.create({
    button: {
        width: '93%',
        backgroundColor: '#7FFE8C',
        padding: 12,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12,
        alignSelf:'center'
    },
    text: {
        fontFamily: 'Geist-Bold',
        color: "#020503",
        fontSize: 15,
    }
})