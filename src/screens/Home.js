import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'

const Home = ({navigation}) => (
  <View>
    <Text>Hello</Text>
    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
      <Text>Go to Login</Text>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({})

export default Home
