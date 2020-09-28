import React, {useEffect, useRef} from 'react'
import {Animated} from 'react-native'
import PropTypes from 'prop-types'

const PulseFigure = ({children, initial, final, duration, style}) => {
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {toValue: final, duration, useNativeDriver: true}),
        Animated.timing(opacity, {toValue: initial, duration, useNativeDriver: true}),
      ])
    ).start()
  }, [opacity])

  const opacity = useRef(new Animated.Value(initial)).current

  return <Animated.View style={{opacity, ...style}}>{children}</Animated.View>
}

PulseFigure.propTypes = {
  children: PropTypes.object,
  style: PropTypes.object,
  duration: PropTypes.number,
  initial: PropTypes.number,
  final: PropTypes.number,
}

PulseFigure.defaultProps = {
  duration: 500,
  initial: 0.3,
  final: 1,
}

export default React.memo(PulseFigure)
