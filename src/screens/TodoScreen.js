import React, {useState, useContext} from 'react'
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native'
import {AntDesign, FontAwesome} from '@expo/vector-icons'
import { THEME } from '../theme'
import { AppCard } from '../components/ui/AppCard'
import { EditModal } from '../components/EditModal'
import { AppTextBold } from '../components/ui/AppTextBold'
import { AppButton } from '../components/ui/AppButton'
import { TodoContext } from '../context/todo/todoContext'
import { ScreenContext } from '../context/screen/screenContext'

export const TodoScreen = () => {

  const {todos, updateTodo, removeTodo} = useContext(TodoContext)
  const {todoId, changeScreen} = useContext(ScreenContext)

  const todo = todos.find(todoElem => todoElem.id == todoId)

  const saveHandler = async (title) => {
    await updateTodo(todo.id, title)
    setModal(false)
  }


  const [modal, setModal] = useState(false)

  return (
    <View>
      <EditModal
        value={todo.title}
        visible={modal}
        onCancel={() => setModal(false)}
        onSave={title => saveHandler(title)}
      />

      <AppCard style={styles.card}>
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <AppButton
          onPress={() => setModal(true) }
          >
          <FontAwesome name='edit' size={20}/>
          </AppButton>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton title="Назад" color={THEME.GRAY_COLOR} onPress={() => changeScreen(null)}>
            <AntDesign name='back' size={20} color='#fff' />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            color={THEME.DANGER_COLOR}
            onPress={() => removeTodo(todo.id)}>
            <FontAwesome name='remove' size={20} color='#fff' />
          </AppButton>
        </View>
      </View>
    </View>
)
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  card: {
    marginBottom: 20,
  },
  button: {
    // width: Dimensions.get('window').width / 4
    width: Dimensions.get('window').width > 400 ? 150 : 100
  },
  title: {
    fontSize: 20
  }
})
