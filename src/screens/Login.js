import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'

const Login = ({navigation}) => (
  <View>
    <Text>Login</Text>
    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <Text>Войти</Text>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({})

export default Login
