import { Alert, FlatList, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTransactions } from './TransactionContext'

const Transactions = ({ route }: any) => {

  const { transactions, deleteTransaction } = useTransactions();

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

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>All Transactions</Text>
        <Text style={styles.subHeading}>{transactions.length} Total Recorded</Text>
      </View>


      <View style={styles.listBox}>
        <View style={styles.sheetHandle} />
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.transactionCard}>
              <View style={styles.leftColumn}>
                <Text style={styles.txTitle}>{item.title}</Text>
                <Text style={styles.txDate}>{item.date}</Text>
              </View>
              <View style={styles.rightColumn}>
                <Text style={item.type === 'income' ? styles.txIncome : styles.txExpenses}>
                  {item.type === 'income' ? `+Rs.${item.amount}` : `-Rs.${item.amount}`}
                </Text>
                <TouchableOpacity onPress={() => handleDeletePrompot(item.id, item.title)} style={styles.deleteBtn}>
                  <Text style={styles.deleteTxt}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No transactions added yet.</Text>
          }
        />

      </View>
    </View>
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
    marginTop: 4,
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
  deleteTxt: {
    color: 'red',
    fontFamily: 'Geist-Regular',
  },
  emptyText: {
    color: '#8d998d',
    textAlign: 'center',
    marginTop: 20,
  },
})