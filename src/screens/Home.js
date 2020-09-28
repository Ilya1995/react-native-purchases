import React, {useRef, useEffect, useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Animated} from 'react-native'
import ListItem from '../components/ListItem'
import Skeleton from '../components/Skeleton'
import database from '@react-native-firebase/database'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Home = ({navigation, route}) => {
  const [purchases, setPurchases] = useState([])
  const [users, setUsers] = useState([])

  const [todos, setTodos] = useState([])
  const preScrollY = useRef(0)
  const scrollY = useRef(new Animated.Value(0)).current
  const hideBtn = useRef(new Animated.Value(1)).current

  const {brief, descr} = route.params

  console.log(555, brief, descr)

  useEffect(() => {
    const onValueChange = database()
      .ref(brief)
      .on('value', (snapshot) => {
        // console.log('Purchases data: ', Object.values(snapshot.val()))
        const a = Object.entries(snapshot.val()).map(([key, value]) => ({...value, key}))
        setPurchases(a)
      })

    return () => database().ref(brief).off('value', onValueChange)
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
    if (purchases.length && users.length) {
      const merge = purchases.map(({userId, ...rest}) => {
        const user = users.find(({id}) => id === userId)
        return {...rest, user: {name: user.name, gender: user.gender}}
      })
      // console.log(111, merge)
      setTodos(merge)
    }
  }, [purchases, users])

  const removeItem = (key) => {
    // console.log(key)
    database().ref(`/${brief}/${key}`).remove()
  }

  const updateItem = (key, value) => {
    // console.log(value)
    database().ref(`/${brief}/${key}`).update({completed: value})
  }

  const listenerScrollY = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y
    const preY = preScrollY.current
    preScrollY.current = offsetY
    // console.log(opacityBtn)

    if (preY < offsetY && offsetY > 10 && hideBtn.__getValue() === 1) {
      // console.log(111, preY, offsetY, hideBtn.__getValue())

      // return hideBtn.setValue(0)
      return Animated.timing(hideBtn, {duration: 200, toValue: 0, useNativeDriver: false}).start()
    }

    if (preY > offsetY && !hideBtn.__getValue()) {
      // console.log(222)
      // return hideBtn.setValue(1)
      return Animated.timing(hideBtn, {duration: 200, toValue: 1, useNativeDriver: false}).start()
    }
  }

  const opacity = scrollY.interpolate({
    inputRange: [35, 40],
    outputRange: [0, 1],
    extrapolate: 'clamp',
    useNativeDriver: false,
  })

  const trans = hideBtn.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  })

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      {/* <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Go to Login</Text>
      </TouchableOpacity> */}
      <View style={{backgroundColor: '#FFFFFF', height: 50}}>
        <View style={styles.popUpTitle}>
          <Animated.Text style={[styles.smallTitle, {opacity}]}>{descr}</Animated.Text>
        </View>
      </View>

      <View style={styles.slide1}>
        <Animated.ScrollView
          style={{height: '100%', width: '100%'}}
          onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
            useNativeDriver: false,
            listener: listenerScrollY,
          })}
          scrollEventThrottle={16}>
          <Text style={styles.bigTitle}>{descr}</Text>
          {Boolean(todos.length) ? (
            todos.map((item) => <ListItem key={item.key} item={item} removeItem={removeItem} updateItem={updateItem} />)
          ) : (
            <Skeleton />
          )}
        </Animated.ScrollView>
        <Animated.View style={{transform: [{translateY: trans}], position: 'absolute', right: 16, bottom: 30}}>
          <TouchableOpacity
            onPress={() => console.log(5555)}
            activeOpacity={1}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#7257D3',
              justifyContent: 'center',
              alignItems: 'center',

              elevation: 24,
            }}>
            <MaterialCommunityIcons name="plus-box-multiple" color={'#FFFFFF'} size={25} />
          </TouchableOpacity>
        </Animated.View>
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
  bigTitle: {
    color: '#1C1C1E',
    letterSpacing: 0.87,
    fontSize: 28,
    fontWeight: 'bold',
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
