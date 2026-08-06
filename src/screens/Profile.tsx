import { Image, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const Profile = ({ navigation }: any) => {

  const [activeTab, setActiveTab] = useState<'recipes' | 'likes'>('recipes')

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
            <Image style={styles.headerImage} source={require('../../assets/images/Profile/shar.png')} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] })}>
            <Image style={styles.headerImage} source={require('../../assets/images/Profile/logout.png')} />
          </TouchableOpacity>

        </View>



        <Image style={styles.profilePic} source={require('../../assets/images/Profile/pfp4.png')} />


        <Text style={styles.name}>John Steve</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.dataCount} >32</Text>
            <Text style={styles.dataText}>Recipes</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.dataCount}>782</Text>
            <Text style={styles.dataText}>Following</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.dataCount}>1289</Text>
            <Text style={styles.dataText}>Followers</Text>

          </View>
        </View>

      </View>

      <View style={styles.tabContainer}>

        <TouchableOpacity
          onPress={() => setActiveTab('recipes')}
          style={[styles.tabButton, activeTab === 'recipes' && styles.activeTabButton]}
        >
          <Text style={activeTab === 'recipes' ? styles.btnTextActive : styles.btnTextInactive}>Recipes</Text>


        </TouchableOpacity>



        <TouchableOpacity
          onPress={() => setActiveTab('likes')}
          style={[styles.tabButton, activeTab === 'likes' && styles.activeTabButton]}
        >
          <Text style={activeTab === 'likes' ? styles.btnTextActive : styles.btnTextInactive}>Likes</Text>
        </TouchableOpacity>

      </View>


      <View style={styles.emptyStateContainer}>
        <Image style={styles.notFoundImage}
          source={activeTab === 'recipes' ?
            require('../../assets/images/Profile/book.png')
            :
            require('../../assets/images/Profile/heart.png')
          } />

        <Text style={styles.emptyTitle}>
          {activeTab === 'recipes' ? "No Recipes Yet ! " : "No Liked Recipe"}
        </Text>

        <Text style={styles.emptySubTitle}>
          {activeTab === 'recipes' ?
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
    backgroundColor: '#FFFFFF',
    padding: 25,
    alignItems: 'center',
    marginBottom: 10,
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
    borderColor: '#3E5481'
  },
  name: {
    color: '#3E5481',
    fontSize: 16,
    fontFamily: 'Inter_24pt-Bold',
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
    color: '#3E5481',
    fontSize: 16,
    fontFamily: 'Inter_24pt-Bold'
  },
  dataText: {
    color: '#9FA5C0',
    fontSize: 12,
    fontFamily: 'Inter_24pt-Medium'
  },
  lowerContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tabContainer: {
    backgroundColor: "#FFFFFF",
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
    borderBottomColor: '#1FCC79'
  },
  btnTextActive: {
    color: '#2E3E5C',
    fontSize: 16,
    fontFamily: 'Inter_24pt-Bold',
  },
  btnTextInactive: {
    color: '#9FA5C0',
    fontSize: 16,
    fontFamily: 'Inter_24pt-Bold',
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
    fontFamily: 'Inter_24pt-Bold',
    color: '#3E5481',
    marginBottom: 6,
  },
  emptySubTitle: {
    fontSize: 14,
    fontFamily: 'Inter_24pt-Medium',
    color: '#9FA5C0',
    textAlign: 'center',
  },

})