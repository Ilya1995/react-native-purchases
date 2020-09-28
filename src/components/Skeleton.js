import React from 'react'
import {View, StyleSheet} from 'react-native'
import PulseFigure from './PulseFigure'

const Skeleton = () =>
  new Array(6).fill('').map((_, i) => (
    <PulseFigure key={i}>
      <View style={{marginHorizontal: 16, marginBottom: 10}}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.square} />
          <View style={{marginLeft: 16, flex: 1}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
              <View style={[styles.line, {marginBottom: 4, width: '60%'}]} />
              <View style={[styles.line, {width: '30%'}]} />
            </View>
            <View style={[styles.line, {marginBottom: 4, backgroundColor: '#FBFBFD'}]} />
            <View style={[styles.line, {marginBottom: 4, backgroundColor: '#FBFBFD'}]} />
          </View>
        </View>
      </View>
    </PulseFigure>
  ))

const styles = StyleSheet.create({
  line: {
    backgroundColor: '#F2F2F7',
    height: 17,
    borderRadius: 4,
  },
  square: {
    backgroundColor: '#F2F2F7',
    height: 70,
    width: 70,
    borderRadius: 40,
  },
})

export default React.memo(Skeleton)
