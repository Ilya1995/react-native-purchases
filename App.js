import React from 'react'
import AppNavigator from './src/AppNavigator'
import {LogBox} from 'react-native'

LogBox.ignoreLogs(['Warning: ...'])

const App = () => (
  <>
    <AppNavigator />
  </>
)

export default App
