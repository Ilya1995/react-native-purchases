import React, {useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Animated} from 'react-native'

const FadeInOutView = ({show, duration, initialValue, children}) => {
  const opacity = useRef(new Animated.Value(initialValue)).current
  useEffect(() => {
    show && Animated.timing(opacity, {toValue: 1, duration, useNativeDriver: true}).start()
    !show && Animated.timing(opacity, {toValue: 0, duration, useNativeDriver: true}).start()
  }, [show])
  return <Animated.View style={{opacity}}>{children}</Animated.View>
}

FadeInOutView.propTypes = {
  show: PropTypes.bool,
  initialValue: PropTypes.number,
  duration: PropTypes.number,
  children: PropTypes.object,
}

FadeInOutView.defaultProps = {
  duration: 400,
  initialValue: 0.3,
}

export default FadeInOutView
