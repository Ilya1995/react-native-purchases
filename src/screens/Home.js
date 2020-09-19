import React, {useRef, useEffect, useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, FlatList, Animated, Dimensions} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Avatar from '../components/Avatar'
import database from '@react-native-firebase/database'

const SCREEN_WIDTH = Dimensions.get('window').width
const NOW = new Date()
const TODAY = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate()).valueOf()

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
        // setPurchases(Object.values(snapshot.val()))
        const a = Object.values(snapshot.val()).map((el) => {
          return {...el, date: new Date('2019-10-02')}
        })
        setPurchases(a)
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

  const addZero = (value) => {
    if (value.toString().length < 2) return '0' + value
    return value
  }

  const getDate = (value) => {
    const other = value.valueOf()
    if (other < TODAY - 864e5) {
      return `${addZero(value.getDate())}.${addZero(value.getMonth() + 1)}.${value.getFullYear()}`
    } else if (other < TODAY) {
      return 'вчера'
    } else {
      return `${addZero(value.getHours())}:${addZero(value.getMinutes())}`
    }
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
              renderLeftActions={renderLeftActions}>
              <View style={{backgroundColor: '#FFFFFF'}}>
                <View
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 16,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}>
                  <Avatar gender={item.gender} />

                  <View style={{flexGrow: 1, marginLeft: 16, width: SCREEN_WIDTH - 118}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <Text style={{fontSize: 17, fontWeight: '600', color: '#1C1C1E'}}>Юлька хочет</Text>

                      <Text style={{fontSize: 15, color: '#8C8C8C'}}>{getDate(item.date)}</Text>
                    </View>
                    <Text
                      numberOfLines={2}
                      style={{
                        color: '#8C8C8C',
                        letterSpacing: -0.408,
                        fontSize: 17,
                        fontWeight: '600',
                        flexWrap: 'wrap',
                      }}>
                      {item.text}
                    </Text>
                  </View>
                </View>
                <View style={{borderBottomColor: '#8C8C8C', marginLeft: 102, borderBottomWidth: 0.5}} />
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
