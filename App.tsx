import { BlurView } from '@sbaiahmed1/react-native-blur'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Login from './src/screens/Login';
import Dashboard from './src/screens/Dashboard';
import Transactions from './src/screens/Transactions';
import Profile from './src/screens/Profile';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TabIcon from './src/components/TabIcon';
import Addtransaction from './src/screens/Addtransaction';
import { TransactionProvider } from './src/screens/TransactionContext';
import PasswordRecovery from './src/screens/PasswordRecovery';
import Verification from './src/screens/Verification';




const Tabs = createBottomTabNavigator();
const DashboardTabs = () => {
  return (

    <Tabs.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        position: 'absolute',
        bottom: 10,
        marginHorizontal: 20,
        height: 65,
        borderRadius: 25,
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,

      },
      tabBarItemStyle: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      tabBarIconStyle: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      tabBarLabelStyle: {
        fontSize: 11,
        fontFamily: 'Geist-Regular',
        marginBottom: 5,
      },
      tabBarBackground: () => (
        <BlurView blurType='light' blurAmount={30} style={[StyleSheet.absoluteFill, { borderRadius: 25, overflow: 'hidden' }]}></BlurView>
      )
    }}

    >
      <Tabs.Screen name='Dashboard' component={Dashboard} options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon
            focused={focused}
            source={focused ?
              require('./src/assets/images/dashboard/homeActive.png')
              :
              require('./src/assets/images/dashboard/home.png')
            }
          />
        )
      }} />


      <Tabs.Screen name='Transactions' component={Transactions} options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon
            focused={focused}
            source={focused ?
              require('./src/assets/images/dashboard/transactionActive.png')
              :
              require('./src/assets/images/dashboard/transaction.png')
            }
          />
        )
      }} />


      <Tabs.Screen name='Profile' component={Profile} options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon
            focused={focused}
            source={focused ?
              require('./src/assets/images/dashboard/profileActive.png')
              :
              require('./src/assets/images/dashboard/profile.png')
            }
          />
        )
      }} />



    </Tabs.Navigator>


  )
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <TransactionProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name='Login' component={Login} /> */}
          {/* <Stack.Screen name='PasswordRecovery' component={PasswordRecovery} /> */}
          <Stack.Screen name='Verification' component={Verification} />
          <Stack.Screen name='DashboardTabs' component={DashboardTabs} />
          <Stack.Screen name='AddTransaction' component={Addtransaction} />
        </Stack.Navigator>
      </NavigationContainer>
    </TransactionProvider>
  )
}

const styles = StyleSheet.create({

})

export default App