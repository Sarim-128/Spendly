import { View, Text, ScrollView, Image, StyleSheet, Touchable, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'

const Dashboard = () => {
    return (
        <View style={styles.screenWrapper}>

            <View>

                {/* HEADER SECTION */}

                <View style={styles.headerContainer}>
                    <View>
                        <Text style={styles.greetings}>Welcome Back!</Text>
                        <Text style={styles.username}>Sarim Hussain</Text>
                    </View>
                    <Image style={styles.profilePic} source={require('../assets/images/dashboard/pfp6.jpg')} />
                </View>


                {/* BALANCE CARD SECTION */}

                <View style={styles.balanceCardContainer}>
                    <Text style={styles.totalBalanceHeading}>Total Balance</Text>
                    <Text style={styles.totalBalanceValue}>$21414</Text>

                    <View style={styles.secondaryCardsContainer}>

                        <View style={styles.incomeContainer}>

                            <View style={[styles.secondaryCardsIconContainer, { backgroundColor: '#113C1B' }]}>
                                <Image style={[styles.secondaryCardsIcon, { transform: [{ rotate: '45deg' }] }]} source={require('../assets/images/dashboard/greenArrow.png')} />
                            </View>
                            <View>
                                <Text style={styles.incomeHeading}>Income</Text>
                                <Text style={styles.incomeValue}>$2311</Text>
                            </View>

                        </View>

                        <View style={styles.expenseContainer}>

                            <View style={[styles.secondaryCardsIconContainer, { backgroundColor: '#441814' }]}>
                                <Image style={[styles.secondaryCardsIcon, { transform: [{ rotate: '45deg' }] }]} source={require('../assets/images/dashboard/redArrow.png')} />
                            </View>
                            <View>
                                <Text style={styles.expenseHeading}>Expenses</Text>
                                <Text style={styles.expenseValue}>$212</Text>
                            </View>

                        </View>
                    </View>
                </View>



                {/* TRANSACTION SECTION */}
                <View style={styles.transactionContainer}>
                    <Text style={styles.transactionHeading}>Transactions</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllBtn}>See all ➔</Text>
                    </TouchableOpacity>

                    {/* <FlatList /> */}
                </View>

            </View>

            <View style={styles.addBtnContainer}>
                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => {
                        console.log('Add Button Pressed');
                    }}
                    style={styles.addButton}
                >
                    <Text style={styles.addText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        backgroundColor: '#050E07',
        padding: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15
    },
    greetings: {
        fontFamily: 'Geist-Regular',
        color: '#A3BFA5'
    },
    username: {
        fontSize: 18,
        fontFamily: 'Geist-Bold',
        color: '#FFFFFF'
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#A3BFA5"
    },
    balanceCardContainer: {
        backgroundColor: '#7FFE8C',
        padding: 15,
        borderRadius: 25,
        marginVertical: 30,
    },
    totalBalanceHeading: {
        color: '#000',
        fontSize: 14,
        fontFamily: 'Geist-Regular'
    },
    totalBalanceValue: {
        color: '#000',
        fontFamily: 'Geist-Bold',
        fontSize: 30,
        marginBottom: 50,
    },
    secondaryCardsContainer: {
        flexDirection: 'row',
        gap: 10,
        alignSelf: 'center'
    },
    secondaryCardsIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 32,
        height: 32,
        borderRadius: 16,
        marginHorizontal: 12,
    },
    secondaryCardsIcon: {
        width: 20,
        height: 20,
    },
    incomeContainer: {
        flexDirection: 'row',
        backgroundColor: '#050E07',
        paddingVertical: 12,
        paddingRight: '15%',
        alignItems: 'center',
        borderRadius: 15,
    },
    incomeHeading: {
        color: '#CBF7D0',
        fontSize: 12,
        fontFamily: 'Geist-Regular'
    },
    incomeValue: {
        color: '#FFFFFF',
        fontFamily: 'Geist-Bold'
    },
    expenseContainer: {
        flexDirection: 'row',
        backgroundColor: '#050E07',
        paddingVertical: 12,
        paddingRight: '8%',
        alignItems: 'center',
        borderRadius: 15,
    },
    expenseHeading: {
        color: '#CBF7D0',
        fontSize: 12,
        fontFamily: 'Geist-Regular'
    },
    expenseValue: {
        color: '#FFFFFF',
        fontFamily: 'Geist-Bold'
    },
    transactionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    transactionHeading: {
        color: '#FFFFFF',
        fontFamily: 'Geist-Bold',
        fontSize: 18,
    },
    seeAllBtn: {
        color: '#7FFE8C',
        fontFamily: 'Geist-Bold',
        fontSize: 14,
    },
    addBtnContainer: {
        position: 'absolute',
        bottom: '12%',
        right: '5%',
        zIndex: 10,
        alignItems: 'flex-end',
        verticalAlign: 'bottom'
    },
    addButton: {
        width: 65,
        height: 65,
        backgroundColor: '#7FFE8C',
        borderRadius: 32.5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#7FFE8C',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    addText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000000',
        lineHeight: 34,
    },


})

export default Dashboard