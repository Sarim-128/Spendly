import { Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MainButton from '../components/MainButton'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { useTransactions } from './TransactionContext'
import { Screen } from 'react-native-screens'

const Addtransaction = ({ navigation }: any) => {

    const { addTransaction } = useTransactions()

    const [amount, setAmount] = useState('')
    const [title, setTitle] = useState('')
    const [transactionType, setTransactionType] = useState<'income' | 'expenses'>('income')

    const [date, setDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false)
    const [isDateSelected, setIsDateSelected] = useState(false)

    const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            setShowPicker(false)
        }
        if (event.type === 'dismissed') {
            setShowPicker(false)
            return
        }
        if (selectedDate) {
            setDate(selectedDate)
            setIsDateSelected(true)
        }
    }

    const handleSave = () => {
        addTransaction({
            amount: parseFloat(amount) || 0,
            title: title || 'untitled',
            type: transactionType,
            date: isDateSelected ? date.toLocaleDateString() : new Date().toLocaleDateString(),
        })



        navigation.navigate('DashboardTabs',{screen:'Dashboard'})
    }
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Add transaction</Text>

            <View style={styles.cardContainer}>

                <Text style={styles.cardHeading}>TOTAL BALANCE</Text>
                <TextInput keyboardType='numeric' onChangeText={setAmount} value={amount} placeholderTextColor="#8d998d" placeholder='0.00' style={styles.cardAmount} />

                <View style={styles.cardBtnsContainer}>

                    <TouchableOpacity
                        onPress={() => setTransactionType('income')}
                        style={transactionType === 'income' ? styles.cardBtnActive : styles.cardBtnUnActive}>
                        <Text style={transactionType === 'income' ? styles.cardBtnTxtActive : styles.cardBtnTxtUnActive}>Income</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setTransactionType('expenses')}
                        style={transactionType === 'expenses' ? styles.cardBtnActive : styles.cardBtnUnActive}>
                        <Text style={transactionType === 'expenses' ? styles.cardBtnTxtActive : styles.cardBtnTxtUnActive}>Expenses</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputHeading}>Title</Text>
                <TextInput onChangeText={setTitle} value={title} placeholderTextColor="#8d998d" placeholder='Enter Title' style={styles.input} />
            </View>


            <View style={styles.inputContainer}>
                <Text style={styles.inputHeading}>Date</Text>
                <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowPicker(true)}>
                    <Text style={[styles.dateText, !isDateSelected && styles.placeholderText]}>
                        {isDateSelected ? date.toLocaleDateString() : 'Select Date'}
                    </Text>
                </TouchableOpacity>
            </View>

            {showPicker && (
                Platform.OS === 'ios' ? (
                    <Modal transparent animationType="slide">
                        <View style={styles.iosModalContainer}>
                            <View style={styles.iosPickerCard}>
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="spinner"
                                    onChange={onChangeDate}
                                    maximumDate={new Date()}
                                    textColor="#FFFFFF"
                                />
                                <TouchableOpacity
                                    style={styles.iosDoneBtn}
                                    onPress={() => setShowPicker(false)}>
                                    <Text style={styles.iosDoneBtnText}>Done</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                ) : (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                        maximumDate={new Date()}
                    />
                )
            )}

            <MainButton onPress={handleSave} styleBtn={styles.saveBtn} title="Save Transaction" />


        </View>
    )
}

export default Addtransaction

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#050E07',

    },
    heading: {
        fontSize: 20,
        fontFamily: 'Geist-Bold',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    cardContainer: {
        backgroundColor: '#000',
        borderWidth: 1,
        borderColor: 'green',
        padding: 20,
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 20,
    },
    cardHeading: {
        fontFamily: 'Geist-Regular',
        color: '#7FFE8C',
    },
    cardAmount: {
        fontSize: 30,
        fontFamily: 'Geist-Bold',
        color: '#FFFFFF',
        marginBottom: 30,
    },
    cardBtnsContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
    },
    cardBtnUnActive: {
        width: 120,
        height: 45,
        backgroundColor: '#000',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#7FFE8C'
    },
    cardBtnActive: {
        width: 120,
        height: 45,
        backgroundColor: '#7FFE8C',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',

    },
    cardBtnTxtUnActive: {
        fontFamily: 'Geist-Bold',
        color: '#7FFE8C',
    },
    cardBtnTxtActive: {
        fontFamily: 'Geist-Bold',
        color: '#000',
    },
    inputContainer: {
        backgroundColor: '#000',
        borderRadius: 20,
        padding: 16,
        width: '90%',
        marginVertical: 10,
        alignItems: 'flex-start',
        borderColor: 'green',
        borderWidth: 1,
    },
    inputHeading: {
        fontFamily: 'Geist-Regular',
        color: '#A3BFA5',
    },
    input: {
        fontSize: 14,
        fontFamily: 'Geist-Bold',
        color: '#FFFFFF',
        borderWidth: 1,
        borderColor: 'green',
        marginVertical: 12,
        borderRadius: 12,
        width: '95%',
        alignSelf: 'center',
        paddingHorizontal: 8,
    },
    datePickerButton: {
        borderWidth: 1,
        borderColor: 'green',
        marginVertical: 12,
        borderRadius: 12,
        width: '95%',
        alignSelf: 'center',
        paddingHorizontal: 12,
        height: 40,
        justifyContent: 'center',
    },
    dateText: {
        fontSize: 14,
        fontFamily: 'Geist-Bold',
        color: '#FFFFFF',
    },
    placeholderText: {
        color: '#8d998d',
    },
    iosModalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    iosPickerCard: {
        backgroundColor: '#112215',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    iosDoneBtn: {
        backgroundColor: '#7FFE8C',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    iosDoneBtnText: {
        color: '#000',
        fontFamily: 'Geist-Bold',
    },
    saveBtn: {
        alignSelf: 'center',
        marginTop: 20,
    }
})