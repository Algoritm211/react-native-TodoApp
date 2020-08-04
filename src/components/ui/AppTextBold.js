import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export const AppTextBold = (props) => {
  return(
    <Text style={{...styles.default, ...props.style}}>{props.children}</Text>
  )
}

const styles = StyleSheet.create({
  default: {
    fontFamily: 'roboto-bold'
  }
})
