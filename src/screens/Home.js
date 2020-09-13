import React, {useRef, useEffect, useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, FlatList, Animated} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Avatar from '../components/Avatar'
import database from '@react-native-firebase/database'

// const a = [
//   {completed: true, text: 'Купить хлеб', timestamp: 121212, gender: 'female'},
//   {completed: false, text: 'Купить масло', timestamp: 56532, gender: 'male'},
//   {completed: true, text: 'Купить пиво', timestamp: 63235, gender: 'female'},
// ]
const Home = ({navigation}) => {
  const updateRef = useRef(null)
  const [purchases, setPurchases] = useState([])

  useEffect(() => {
    const onValueChange = database()
      .ref('purchases')
      .on('value', (snapshot) => {
        console.log('Purchases data: ', Object.values(snapshot.val()))
        setPurchases(Object.values(snapshot.val()))
      })

    return () => database().ref('purchases').off('value', onValueChange)
  }, [])

  useEffect(() => {
    const onValueChange = database()
      .ref('users')
      .on('value', (snapshot) => {
        console.log('User data: ', Object.values(snapshot.val()))
        // setPurchases(Object.values(snapshot.val()))
      })

    return () => database().ref('users').off('value', onValueChange)
  }, [])

  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
      useNativeDriver: true,
    })
    return <View style={styles.rightAction}></View>
  }

  const renderLeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
      useNativeDriver: true,
    })
    return <View style={styles.leftAction}></View>
  }

  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Go to Login</Text>
      </TouchableOpacity>

      <View style={styles.slide1}>
        <Text style={styles.text}>Hello Swiper</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={purchases}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <Swipeable
              ref={updateRef}
              friction={2}
              rightThreshold={40}
              renderRightActions={renderRightActions}
              renderLeftActions={renderLeftActions}
              containerStyle={{marginBottom: 10}}>
              <View style={{backgroundColor: '#FFFFFF'}}>
                <View style={{paddingHorizontal: 16, paddingVertical: 6, flexDirection: 'row'}}>
                  <Avatar gender={item.gender} />
                  <Text style={{color: '#1C1C1E', letterSpacing: 0.87, fontSize: 28, fontWeight: '600'}}>
                    {item.text}
                  </Text>
                </View>
                <View style={{borderBottomColor: '#1C1C1E', borderBottomWidth: 1, width: '100%'}} />
              </View>
            </Swipeable>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  leftAction: {
    flex: 1,
    backgroundColor: '#388e3c',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#dd2c00',
    flex: 1,
    justifyContent: 'flex-end',
  },
})

export default Home
