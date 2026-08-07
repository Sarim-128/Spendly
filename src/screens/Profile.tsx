import { FlatList, Image, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useTransactions } from './TransactionContext'

import { FormatCurrency } from '../components/FormatCurrency';
import { storage } from '../utils/storage';

const Profile = ({ navigation }: any) => {

  const handleLogout = () => {
    storage.set('isLoggedIn', false)

    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }]
    })
  }

  const { transactions } = useTransactions();



  const [activeTab, setActiveTab] = useState<'income' | 'expenses'>('income')

  const filteredTransactions = transactions.filter(
    (item) => item.type === activeTab
  )

  const onShare = async () => {
    try {
      await Share.share({
        message: "Check out John Steve's delicious recipe on Recipeo !",
        url: 'https://foodapp.com/profile/johnsteve',
      })
    } catch (error) {
      console.log("Error sharing profile: ", error)
    }
  }


  const totalBalance = useMemo(() => {
    return transactions.reduce((acc, curr) => {
      return curr.type === 'income' ? acc + curr.amount : acc - curr.amount;
    }, 0);
  }, [transactions]);


  return (
    <View style={styles.container}>

      <View style={styles.upperContainer}>

        <View style={styles.headerContainer}>

          <TouchableOpacity onPress={onShare}>
            <Image style={styles.headerImage} source={require('../assets/images/profile/share.png')} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout}>
            <Image style={styles.headerImage} source={require('../assets/images/profile/logout.png')} />
          </TouchableOpacity>

        </View>



        <Image style={styles.profilePic} source={require('../assets/images/dashboard/pfp6.jpg')} />


        <Text style={styles.name}>John Steve</Text>

        <View style={styles.statsContainer}>

          <View style={styles.statBox}>
            <Text style={styles.dataCount}>Balance</Text>
            <Text style={styles.dataText}>{FormatCurrency(totalBalance)}</Text>
          </View>

        </View>

      </View>

      <View style={styles.tabContainer}>

        <TouchableOpacity
          onPress={() => setActiveTab('income')}
          style={[styles.tabButton, activeTab === 'income' && styles.activeTabButton]}
        >
          <Text style={activeTab === 'income' ? styles.btnTextActive : styles.btnTextInactive}>My Income</Text>


        </TouchableOpacity>



        <TouchableOpacity
          onPress={() => setActiveTab('expenses')}
          style={[styles.tabButton, activeTab === 'expenses' && styles.activeTabButton]}
        >
          <Text style={activeTab === 'expenses' ? styles.btnTextActive : styles.btnTextInactive}>My Expenses</Text>
        </TouchableOpacity>

      </View>


      <View style={styles.listSectionContainer}>
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.transactionCard}>

              <Text style={styles.txTitle}>{item.title}</Text>
              <Text style={activeTab === 'income' ? styles.txtIncome : styles.txtExpenses}>
                {item.type === 'income' ? `+${FormatCurrency(item.amount)}` : `-${FormatCurrency(item.amount)}`}
              </Text>

            </View>

          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {activeTab === 'income' ? ' No Income records found.' : 'No expense record found.'}
            </Text>
          }
        />
      </View>

    </View >
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050E07',
  },
  upperContainer: {
    backgroundColor: '#050E07',
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#113C1B',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerImage: {
    width: 24,
    height: 24,
  },
  profilePic: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#7FFE8C',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Geist-Bold',
    marginTop: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 15,
  },
  statBox: {
    alignItems: 'center',
  },
  dataCount: {
    color: '#A3BFA5',
    fontFamily: 'Geist-Regular',
    marginBottom: 2,
  },
  dataText: {
    color: '#7FFE8C',
    fontSize: 22,
    fontFamily: 'Geist-Bold'

  },
  tabContainer: {
    backgroundColor: '#050E07',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#113C1B',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: '#7FFE8C'
  },
  btnTextActive: {
    color: '#7FFE8C',
    fontSize: 15,
    fontFamily: 'Geist-Bold',
  },
  btnTextInactive: {
    color: '#8D998D',
    fontSize: 15,
    fontFamily: 'Geist-Regular',
  },
  listSectionContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
    backgroundColor: '#0B1C10'
  },
  listContainer: {
    paddingBottom: 40,
  },
  transactionCard: {
    backgroundColor: '#0B1C10',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#113C1B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  txTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Geist-Bold',
  },
  txtIncome: {
    color: '#7FFE8C',
    fontSize: 16,
    fontFamily: 'Geist-Bold',
  },
  txtExpenses: {
    color: '#FF6B6B',
    fontSize: 16,
    fontFamily: 'Geist-Bold',
  },
  emptyText: {
    color: '#8D998D',
    textAlign: 'center',
    marginTop: 40,
    fontFamily: 'Geist-Regular',
  },

})