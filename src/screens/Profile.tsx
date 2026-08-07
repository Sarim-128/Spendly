import { Image, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const Profile = ({ navigation }: any) => {

  const [activeTab, setActiveTab] = useState<'income' | 'expenses'>('income')

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
  return (
    <View>



      <View style={styles.upperContainer}>

        <View style={styles.headerContainer}>

          <TouchableOpacity onPress={onShare}>
            <Image style={styles.headerImage} source={require('../assets/images/profile/share.png')} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] })}>
            <Image style={styles.headerImage} source={require('../assets/images/profile/logout.png')} />
          </TouchableOpacity>

        </View>



        <Image style={styles.profilePic} source={require('../assets/images/dashboard/pfp6.jpg')} />


        <Text style={styles.name}>John Steve</Text>

        <View style={styles.statsContainer}>

          <View style={styles.statBox}>
            <Text style={styles.dataCount}>Balance</Text>
            <Text style={styles.dataText}>$12441</Text>
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


      <View style={styles.emptyStateContainer}>
        <Image style={styles.notFoundImage}
        />

        <Text style={styles.emptyTitle}>
          {activeTab === 'income' ? "No Recipes Yet ! " : "No Liked Recipe"}
        </Text>

        <Text style={styles.emptySubTitle}>
          {activeTab === 'expenses' ?
            "Recipes You upload will be saved here."
            :
            "Recipes you like will be saved here."
          }

        </Text>
      </View>

    </View >
  )
}

export default Profile

const styles = StyleSheet.create({
  upperContainer: {
    backgroundColor: '#050E07',
    padding: 25,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#7FFE8C'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,

  },
  headerImage: {
    width: 25,
    height: 25,
    marginBottom: 15,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#7FFE8C'
  },
  name: {
    color: '#7FFE8C',
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    marginTop: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
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
    fontSize: 18,
    fontFamily: 'Geist-Bold'

  },
  lowerContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tabContainer: {
    backgroundColor: "#050E07",
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: '#A3BFA5'
  },
  btnTextActive: {
    color: '#A3BFA5',
    fontSize: 16,
    fontFamily: 'Geist-Bold',
  },
  btnTextInactive: {
    color: '#9FA5C0',
    fontSize: 16,
    fontFamily: 'Geist-Bold',
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingBottom: 70,
    backgroundColor: 'white'
  },
  notFoundImage: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#3E5481',
    marginBottom: 6,
  },
  emptySubTitle: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#9FA5C0',
    textAlign: 'center',
  },

})