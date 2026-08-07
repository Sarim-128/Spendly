import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useMemo, } from 'react'

import { useTransactions } from './TransactionContext'
import { FormatCurrency } from '../components/FormatCurrency'
import { Shadow } from 'react-native-shadow-2'
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';


const Dashboard = ({ navigation, }: any) => {




    const { transactions } = useTransactions();
    const recentTransactions = transactions.slice(0, 5);

    const { totalBalance, totalIncome, totalExpenses } = useMemo(() => {
        let income = 0;
        let expenses = 0;

        transactions.forEach((tx) => {
            if (tx.type === 'income') {
                income += tx.amount
            }
            else if (tx.type === 'expenses') {
                expenses += tx.amount
            }
        });

        return {
            totalIncome: income,
            totalExpenses: expenses,
            totalBalance: income - expenses
        }
    }, [transactions])





    return (
        <View style={styles.screenWrapper}>

            



            <View style={{ flex: 1 }}>

                {/* HEADER SECTION */}

                <View style={styles.headerContainer}>
                    <View>
                        <Text style={styles.greetings}>Welcome Back!</Text>
                        <Text style={styles.username}>Sarim Hussain</Text>
                    </View>
                    <Image style={styles.profilePic} source={require('../assets/images/dashboard/pfp6.jpg')} />
                </View>


                {/* BALANCE CARD SECTION */}

                <Shadow
                    startColor='rgba(127, 254, 140, 0.35)'
                    endColor="rgba(127, 254, 140, 0.0)"
                    distance={10}
                    containerStyle={{ marginVertical: 30 }}
                >
                    <View style={styles.balanceCardContainer}>


                        <Text style={styles.totalBalanceHeading}>Total Balance</Text>
                        <Text style={styles.totalBalanceValue}>{FormatCurrency(totalBalance)}</Text>

                        <View style={styles.secondaryCardsContainer}>

                            <View style={styles.incomeContainer}>

                                <View style={[styles.secondaryCardsIconContainer, { backgroundColor: '#113C1B' }]}>
                                    <Image style={[styles.secondaryCardsIcon, { transform: [{ rotate: '45deg' }] }]} source={require('../assets/images/dashboard/greenArrow.png')} />
                                </View>
                                <View>
                                    <Text style={styles.incomeHeading}>Income</Text>
                                    <Text style={styles.incomeValue}>{FormatCurrency(totalIncome)}</Text>
                                </View>

                            </View>

                            <View style={styles.expenseContainer}>

                                <View style={[styles.secondaryCardsIconContainer, { backgroundColor: '#441814' }]}>
                                    <Image style={[styles.secondaryCardsIcon, { transform: [{ rotate: '45deg' }] }]} source={require('../assets/images/dashboard/redArrow.png')} />
                                </View>
                                <View>
                                    <Text style={styles.expenseHeading}>Expenses</Text>
                                    <Text style={styles.expenseValue}>{FormatCurrency(totalExpenses)}</Text>
                                </View>

                            </View>
                        </View>
                    </View>
                </Shadow>




                {/* TRANSACTION SECTION */}
                <View style={styles.transactionContainer}>
                    <Text style={styles.transactionHeading}>Transactions</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
                        <Text style={styles.seeAllBtn}>See all ➔</Text>
                    </TouchableOpacity>

                </View>


                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                    keyExtractor={(item, index) => item.id || index.toString()}
                    data={recentTransactions}
                    contentContainerStyle={styles.listContainer}
                    renderItem={({ item }) => (
                        <View style={styles.transactionCard}>
                            <View>
                                <Text style={styles.txTitle}>{item.title}</Text>
                                <Text style={styles.txDate}>{item.date}</Text>
                            </View>
                            <Text style={item.type === 'income' ? styles.txIncome : styles.txExpenses}>
                                {item.type === 'income' ? `+$${item.amount}` : `-$${item.amount}`}
                            </Text>
                        </View>
                    )}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No transactions added yet.</Text>
                    }
                />

            </View>

            <View style={styles.addBtnContainer}>
                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => {
                        navigation.navigate('AddTransaction')
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
        marginBottom: 15,

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
    listContainer: {
        paddingBottom: 80,
    },
    transactionCard: {
        backgroundColor: '#000',
        padding: 16,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#113C1B',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    txTitle: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Geist-Bold',
    },
    txDate: {
        color: '#8d998d',
        fontSize: 12,
        marginTop: 4,
    },
    txIncome: {
        color: '#7FFE8C',
        fontSize: 16,
        fontFamily: 'Geist-Bold',
    },
    txExpenses: {
        color: '#FF6B6B',
        fontSize: 16,
        fontFamily: 'Geist-Bold',
    },
    emptyText: {
        color: '#8d998d',
        textAlign: 'center',
        marginTop: 20,
    },
    addBtnContainer: {
        position: 'absolute',
        bottom: '12%',
        right: '5%',
        zIndex: 10,
        alignItems: 'flex-end',
    },
    addButton: {
        width: 60,
        height: 60,
        backgroundColor: '#7FFE8C',
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#7FFE8C',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    addText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000000',
        lineHeight: 34,
    },



})

export default Dashboard