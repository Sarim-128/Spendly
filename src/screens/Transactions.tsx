import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTransactions } from './TransactionContext'
import { FormatCurrency } from '../components/FormatCurrency';

const Transactions = ({ navigation }: any) => {

  const { transactions, deleteTransaction, clearAllTransactions } = useTransactions();

  const handleDeletePrompot = (id: string, title: string) => {
    Alert.alert(
      'Delete Transaction',
      `Are you sure you want to delete "${title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteTransaction(id) },
      ]
    )
  }

  const handleClearAll = () => {
    Alert.alert(
      'Clear All ',
      'Are you sure you want to clear all transactios?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', style: 'default', onPress: clearAllTransactions }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>

        <Text style={styles.heading}>All Transactions</Text>

        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 8 }}>
          <Text style={styles.subHeading}>{transactions.length} Total Recorded</Text>
          <TouchableOpacity onPress={handleClearAll} style={styles.clearBtn}>
            <Text style={styles.clearBtnTxt}>Clear All</Text>
          </TouchableOpacity>
        </View>

      </View>


      <View style={styles.listBox}>
        <View style={styles.sheetHandle} />
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.transactionCard}>
              <View style={styles.leftColumn}>
                <Text style={styles.txTitle}>{item.title}</Text>
                <Text style={styles.txDate}>{item.date}</Text>
              </View>


              <View style={styles.rightColumn}>

                <Text style={item.type === 'income' ? styles.txIncome : styles.txExpenses}>
                  {item.type === 'income' ? `+${FormatCurrency(item.amount)}` : `-${FormatCurrency(item.amount)}`}
                </Text>

                <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} onPress={() => handleDeletePrompot(item.id, item.title)} style={styles.deleteBtn}>
                  <Image style={styles.deleteIcon} source={require('../assets/images/dashboard/delete.png')} />
                </TouchableOpacity>
              </View>
            </View>


          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No transactions added yet.</Text>
          }
        />

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => {
            navigation.navigate('AddTransaction')
          }}

          style={styles.fabButton}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>

      </View>
    </View >
  )
}

export default Transactions

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050E07',
  },
  headerContainer: {
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    fontFamily: 'Geist-Bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  subHeading: {
    fontSize: 12,
    fontFamily: 'Geist-Regular',
    color: '#A3BFA5',
  },
  clearBtn: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  clearBtnTxt: {
    color: 'red',
    fontFamily: 'Geist-Regular',
    fontSize: 12,
  },
  listBox: {
    backgroundColor: '#0B1C10',
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    borderWidth: 1,
    borderColor: '#113C1B',
    flex: 1
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#1E4D27',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 15,

  },
  listContainer: {
    paddingBottom: 40,
  },
  transactionCard: {
    backgroundColor: '#050E07',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#113C1B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  leftColumn: {
    flex: 1,
    marginRight: 12,
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
  rightColumn: {
    gap: 10,
    alignItems: 'flex-end'
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
  deleteBtn: {

  },
  deleteIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  emptyText: {
    color: '#8d998d',
    textAlign: 'center',
    marginTop: 20,
  },
  fabButton: {
    position: 'absolute',
    bottom: '15%',
    alignSelf: 'center',
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#7FFE8C',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fabText: {
    fontSize: 32,
    color: '#050E07',
    fontFamily: 'Geist-Bold',
    lineHeight: 40,
    marginBottom: 10,
  },
})