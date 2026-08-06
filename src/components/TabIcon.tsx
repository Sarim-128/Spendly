import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TabIcon = ({ focused, source }: any) => {
    return (
        <View style={[styles.container, focused && styles.activeContainer]}>
            <Image resizeMode="contain" source={source} style={styles.image} />
        </View>
    )
}

export default TabIcon

const styles = StyleSheet.create({
    container: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeContainer: {
        backgroundColor: '#000000',
        borderWidth: 1,
        borderColor: 'green'
    },
    image: {
        width: 22,
        height: 22
    }

})