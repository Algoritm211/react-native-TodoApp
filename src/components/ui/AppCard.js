import React from 'react'
import {View, Text, StyleSheet} from 'react-native'


export const AppCard = (props) => {
  return (
    <View style={{...styles.default, ...props.style}}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  default: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2},
    elevation: 10,
    backgroundColor: '#fff',
    borderRadius: 10,

  }
})
