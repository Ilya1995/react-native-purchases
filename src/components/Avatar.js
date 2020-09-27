import React from 'react'
import {StyleSheet, View, Image} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FadeInOutView from './FadeInOutView'

const Avatar = ({gender, completed}) => {
  // console.log(completed)
  const icon = gender === 'male' ? require('../../assets/icons/male.png') : require('../../assets/icons/female.png')

  return (
    <View style={[styles.container, completed && {borderWidth: 0}]}>
      <Image style={completed ? styles.imgFull : styles.img} source={icon} />
      {/* {completed && ( */}
      <View style={{position: 'absolute', height: 70, width: 70}}>
        <FadeInOutView show={completed}>
          <View
            style={{
              position: 'absolute',
              height: 70,
              width: 70,
              zIndex: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons name="check" color={'#FFFFFF'} size={30} />
          </View>
          <View
            style={{position: 'absolute', height: 70, width: 70, zIndex: 1, backgroundColor: '#7DC02A', opacity: 0.8}}
          />
        </FadeInOutView>
      </View>
      {/* )} */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: 70,
    borderRadius: 40,
    borderColor: '#2A90BA',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  img: {
    height: 65,
    width: 65,
  },
  imgFull: {
    height: 70,
    width: 70,
  },
})

export default Avatar
