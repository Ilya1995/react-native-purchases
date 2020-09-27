import React from 'react'
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Home from './screens/Home'
import Login from './screens/Login'

const RootStack = createStackNavigator()
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function mainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Assessment"
      tabBarOptions={{
        activeTintColor: '#2A90BA',
        inactiveTintColor: '#999999',
        labelStyle: {
          fontSize: 10,
          fontWeight: '500',
        },
        tabStyle: {
          paddingVertical: 3,
        },
        style: {
          backgroundColor: '#F8F8F8',
        },
      }}>
      <Tab.Screen
        name="Assessment"
        component={Home}
        initialParams={{descr: 'Покупки', brief: 'purchases'}}
        options={{
          tabBarLabel: 'Оценка',
          tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="cart-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Assessment1"
        component={Home}
        initialParams={{descr: 'Другое', brief: 'others'}}
        options={{
          tabBarLabel: 'Другое',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="format-list-bulleted-type" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {/* <RootStack.Screen name="Login" component={Login} options={{headerShown: false}} /> */}
        <RootStack.Screen
          name="Assessment"
          component={mainTabs}
          options={{gestureEnabled: false, headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}
