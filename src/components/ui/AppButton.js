import React from 'react'
import {View,
        Text,
        TouchableOpacity,
        StyleSheet,
        TouchableNativeFeedback,
        Platform
        } from 'react-native'
import { AppTextBold } from './AppTextBold'
import { THEME } from '../../theme'


export const AppButton = ({children, onPress, color = THEME.MAIN_COLOR}) => {

  const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

  return (
    <Wrapper onPress={onPress} activeOpacity={0.7}>
      <View style={{...styles.button, backgroundColor: color}}>
        <AppTextBold style={styles.text}>{children}</AppTextBold>
      </View>
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white'
  }
})
