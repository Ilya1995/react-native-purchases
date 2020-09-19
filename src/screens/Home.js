import React, {useRef, useEffect, useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Animated, Dimensions} from 'react-native'
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
  const [users, setUsers] = useState([])

  const [todos, setTodos] = useState([])
  const scrollY = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const onValueChange = database()
      .ref('purchases')
      .on('value', (snapshot) => {
        // console.log('Purchases data: ', Object.values(snapshot.val()))

        setPurchases(Object.values(snapshot.val()))
      })

    return () => database().ref('purchases').off('value', onValueChange)
  }, [])

  useEffect(() => {
    const onValueChange = database()
      .ref('users')
      .on('value', (snapshot) => {
        // console.log('User data: ', Object.values(snapshot.val()))
        setUsers(Object.values(snapshot.val()))
      })

    return () => database().ref('users').off('value', onValueChange)
  }, [])

  useEffect(() => {
    // console.log(23123123)
    const merge = purchases.map(({userId, ...rest}) => {
      const user = users.find(({id}) => id === userId)
      return {
        ...rest,
        user: {name: user.name, gender: user.gender},
      }
    })
    setTodos(merge)
    // console.log(merge)
  }, [purchases, users])

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
    const other = new Date(value)

    if (value < TODAY - 864e5) {
      return `${addZero(other.getDate())}.${addZero(other.getMonth() + 1)}.${other.getFullYear()}`
    } else if (value < TODAY) {
      return 'вчера'
    } else {
      return `${addZero(other.getHours())}:${addZero(other.getMinutes())}`
    }
  }

  const opacity = scrollY.interpolate({
    inputRange: [35, 40],
    outputRange: [0, 1],
    // extrapolate: 'clamp',
    useNativeDriver: false,
  })

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      {/* <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Go to Login</Text>
      </TouchableOpacity> */}
      <View style={{backgroundColor: '#FFFFFF', height: 50}}>
        <View style={styles.popUpTitle}>
          <Animated.Text style={[styles.smallTitle, {opacity}]}>Покупки</Animated.Text>
        </View>
      </View>

      <View style={styles.slide1}>
        <Animated.ScrollView
          style={{height: '100%'}}
          onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: false})}
          scrollEventThrottle={16}>
          <Text style={styles.bigTitle}>Покупки</Text>
          {todos.map((item, index) => {
            // console.log(item)
            return (
              <Swipeable
                key={index}
                ref={updateRef}
                friction={2}
                rightThreshold={40}
                renderRightActions={renderRightActions}
                renderLeftActions={renderLeftActions}>
                <View
                  style={{backgroundColor: '#FFFFFF', height: 83}}
                  onLayout={({nativeEvent}) => console.log(nativeEvent.layout.height)}>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        paddingVertical: 6,
                        paddingHorizontal: 16,
                        flexDirection: 'row',
                      }}>
                      <Avatar gender={item.user.gender} completed={item.completed} />

                      <View style={{flexGrow: 1, marginLeft: 16, width: SCREEN_WIDTH - 118}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                          <Text style={{fontSize: 17, fontWeight: '600', color: '#1C1C1E'}}>
                            {item.user.name} хочет
                          </Text>

                          <View>
                            <Text style={{fontSize: 15, color: '#8C8C8C'}}>{getDate(item.timestamp)}</Text>
                            <View
                              style={{borderBottomColor: item.completed ? '#7DC02A' : '#3C72D5', borderBottomWidth: 1}}
                            />
                          </View>
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
                  </View>
                  <View style={{borderBottomColor: '#8C8C8C', marginLeft: 102, borderBottomWidth: 0.5}} />
                </View>
              </Swipeable>
            )
          })}
        </Animated.ScrollView>
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
  bigTitle: {
    color: '#1C1C1E',
    letterSpacing: 0.87,
    fontSize: 28,
    fontWeight: 'bold',
    height: 33,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  smallTitle: {
    fontSize: 16,
    letterSpacing: -0.32,
    fontWeight: '600',
    color: '#1C1C1E',
  },

  popUpTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    top: 12,
  },
})

export default Home
