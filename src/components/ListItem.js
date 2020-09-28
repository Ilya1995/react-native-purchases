import React, {useRef} from 'react'
import {StyleSheet, View, Text, Dimensions, Animated, TouchableOpacity} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Avatar from './Avatar'

const SCREEN_WIDTH = Dimensions.get('window').width
const NOW = new Date()
const TODAY = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate()).valueOf()

const ListItem = ({item, removeItem, updateItem}) => {
  const updateRef = useRef(null)
  const height = useRef(new Animated.Value(83)).current
  const b2 = useRef(new Animated.Value(1)).current
  const borderRadius = useRef(new Animated.Value(0)).current

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

  const remove = () => {
    Animated.timing(height, {toValue: 0, duration: 500, useNativeDriver: false}).start()
    setTimeout(() => {
      removeItem(item.key)
    }, 500)
  }

  const update = () => {
    console.log(2222, updateRef.current._reactInternalFiber.memoizedState.rowState)
    // updateItem(item.key, !item.completed)
    // updateRef.current.close()
  }

  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    })
    return (
      <View style={styles.rightAction}>
        <Animated.View style={{transform: [{scale}], marginRight: 20}}>
          <MaterialCommunityIcons name="delete" color={'#FFFFFF'} size={30} />
        </Animated.View>
      </View>
    )
  }

  const renderLeftActions = (progress, dragX) => {
    if (progress.__getValue() > 1.1) return update()

    const scale = dragX.interpolate({
      inputRange: [20, 80],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    })
    return (
      <TouchableOpacity onPress={update} style={styles.leftAction} activeOpacity={1}>
        <Animated.View style={{transform: [{scale}]}}>
          <MaterialCommunityIcons name={item.completed ? 'minus' : 'check'} color={'#FFFFFF'} size={30} />
        </Animated.View>
      </TouchableOpacity>
    )
  }

  const a1 = () => {
    console.log(7878)
    // Animated.timing(b2, {toValue: 1.01, duration: 500, useNativeDriver: false}).start()
    Animated.timing(borderRadius, {toValue: 10, duration: 300, useNativeDriver: false}).start()
  }

  const a2 = () => {
    console.log(5565)
    // Animated.timing(b2, {toValue: 1, duration: 500, useNativeDriver: false}).start()
    Animated.timing(borderRadius, {toValue: 0, duration: 300, useNativeDriver: false}).start()
  }

  return (
    <Animated.View
      // onLayout={({nativeEvent}) => console.log(nativeEvent.layout.height)}
      style={{height}}
      onMoveShouldSetResponderCapture={() => true}
      // onResponderMove={(event) => console.log(event.nativeEvent.locationX)}
      // onResponderTerminate={() => console.log(444)}
      onResponderGrant={() => a1()}>
      {/* <TouchableOpacity
        activeOpacity={1}
        // delayLongPress={100}
        onFocus={() => console.log(66666)}
        onPressOut={() => console.log(777777)}> */}
      <Swipeable
        ref={updateRef}
        containerStyle={{backgroundColor: '#388e3c'}}
        friction={2}
        leftThreshold={20}
        rightThreshold={20}
        onSwipeableWillClose={a2}
        renderRightActions={renderRightActions}
        onSwipeableRightOpen={remove}
        renderLeftActions={renderLeftActions}>
        <Animated.View style={{backgroundColor: '#FFFFFF', borderRadius}}>
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
                  <Text style={{fontSize: 17, fontWeight: '600', color: '#1C1C1E'}}>{item.user.name} хочет</Text>

                  <View>
                    <Text style={{fontSize: 15, color: '#8C8C8C'}}>{getDate(item.timestamp)}</Text>
                    <View style={{borderBottomColor: item.completed ? '#7DC02A' : '#2A90BA', borderBottomWidth: 1}} />
                  </View>
                </View>
                <Text
                  onPress={update}
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
        </Animated.View>
      </Swipeable>
      {/* </TouchableOpacity> */}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  leftAction: {
    backgroundColor: '#388e3c',
    alignItems: 'center',
    justifyContent: 'center',
    width: 102,
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#dd2c00',
    flex: 1,
    justifyContent: 'flex-end',
  },
})

export default ListItem
