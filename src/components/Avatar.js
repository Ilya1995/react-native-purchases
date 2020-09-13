import React from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'

const Avatar = ({gender}) => {
  let icon
  switch (gender) {
    case 'male':
      icon = require('../../assets/icons/male.png')
      break
    case 'female':
      icon = require('../../assets/icons/female.png')
      break

    default:
      break
  }
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={icon} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: 70,
    borderRadius: 40,
    backgroundColor: '#808080',
    borderColor: '#FFFFFF',
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  img: {
    height: 62,
    width: 62,
  },
})

export default Avatar
