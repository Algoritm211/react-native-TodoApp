import React, {useState} from 'react'
import {View, Text, StyleSheet, TextInput, Modal, Button, Alert} from 'react-native'
import { THEME } from '../theme'
import { AppButton } from './ui/AppButton'

export const EditModal = ({visible, onCancel, value, onSave}) => {
  const [title, setTitle] = useState(value)

  const saveHandler = () => {
    if (title.trim().length < 2) {
      Alert.alert('Ошибка!', `Минимальная длина названия 2 символа, сейчас ${title.trim().length} символов`)
    } else {
      onSave(title)
    }
  }

  const cancelHandler = () => {
    setTitle(value)
    onCancel()
  }

  return (
    <Modal
    visible={visible}
    animationType = 'slide'
    transparent={false}
    >
      <View style={styles.wrap}>
        <TextInput
          value={title}
          onChangeText={(title) => setTitle(title)}
          style={styles.input}
          placeholder='Введите новое название'
          autoCapitalize='none'
          autoCorrect={false}
          maxLength={64}
          />
        <View style={styles.buttons}>
          <AppButton onPress={cancelHandler} color={THEME.DANGER_COLOR}>
          Отменить
          </AppButton>
          <AppButton onPress={saveHandler}>
          Сохранить
          </AppButton>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  wrap:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: '80%'
  },
  buttons: {
    width: '100%',
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})
