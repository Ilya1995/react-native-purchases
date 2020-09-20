import React, {useRef, useEffect, useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Animated} from 'react-native'
import ListItem from '../components/ListItem'
import database from '@react-native-firebase/database'

const Home = ({navigation}) => {
  const [purchases, setPurchases] = useState([])
  const [users, setUsers] = useState([])

  const [todos, setTodos] = useState([])
  const scrollY = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const onValueChange = database()
      .ref('purchases')
      .on('value', (snapshot) => {
        // console.log('Purchases data: ', Object.values(snapshot.val()))
        const a = Object.entries(snapshot.val()).map(([key, value]) => ({...value, key}))
        setPurchases(a)
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
    if (purchases.length && users.length) {
      const merge = purchases.map(({userId, ...rest}) => {
        const user = users.find(({id}) => id === userId)
        return {...rest, user: {name: user.name, gender: user.gender}}
      })
      console.log(111, merge)
      setTodos(merge)
    }
  }, [purchases, users])

  const removeItem = (key) => {
    console.log(key)
    database().ref(`/purchases/${key}`).remove()
  }

  const updateItem = (key, value) => {
    console.log(value)
    database().ref(`/purchases/${key}`).update({completed: value})
  }

  const opacity = scrollY.interpolate({
    inputRange: [35, 40],
    outputRange: [0, 1],
    extrapolate: 'clamp',
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
          {todos.map((item) => (
            <ListItem key={item.key} item={item} removeItem={removeItem} updateItem={updateItem} />
          ))}
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
