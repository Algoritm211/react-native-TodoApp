import React, { useReducer, useContext } from 'react'
import {Alert} from 'react-native'

import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'
import { ScreenContext } from '../screen/screenContext'
import { Http } from '../../http'
import { ADD_TODO,
        REMOVE_TODO,
        UPDATE_TODO,
        SHOW_LOADER,
        HIDE_LOADER,
        SHOW_ERROR,
        CLEAR_ERROR,
        FETCH_TODOS,} from '../types'


export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  }
  const {changeScreen} = useContext(ScreenContext)

  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = async title => {
    clearError()
    try {
      const data = await Http.post('https://rn-todo-app-8f307.firebaseio.com/todos.json',
      {title})
      dispatch({type: ADD_TODO, title: title, id: data.name})
    } catch (err){
      showError('Что-то пошло не так.... Попробуйте заново');
    }
  }

  const fetchTodos = async () => {
    clearError()
    showLoader()
    try {
      const data = await Http.get('https://rn-todo-app-8f307.firebaseio.com/todos.json')
      const todos = Object.keys(data).map(key => ({...data[key], id: key}))
      dispatch({type: FETCH_TODOS, todos: todos})
    } catch (err) {
      showError('Что-то пошло не так...')
      console.log(err);
    } finally {
      hideLoader()
    }
  }


  const removeTodo = id => {
    const todo = state.todos.find(todoElem => todoElem.id === id)
      Alert.alert(
      'Удаление элемента',
      `Вы уверены, что хотите удалить "${todo.title}"?`,
      [
        {
          text: 'Отмена',
          style: 'cancel'
        },
        { text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            clearError()
            try {
              changeScreen(null)
              await Http.delete(`https://rn-todo-app-8f307.firebaseio.com/todos/${id}.json`)
              dispatch({type: REMOVE_TODO, id: id})
            } catch (e) {
              showError('Что-то пошло не так.... Попробуйте заново');
              console.log(e);
            }
          }
        }
      ],
      { cancelable: false }
    )
  }

  const updateTodo = async (id, title) => {
    clearError()
    try{
      const response = await Http.patch(`https://rn-todo-app-8f307.firebaseio.com/todos/${id}.json`, {title})
      dispatch({type: UPDATE_TODO, id:id, title:title})
    } catch (err) {
      showError('Что-то пошло не так...')
      console.log(err);
    }
  }

  const showLoader = () => dispatch({type: SHOW_LOADER})

  const hideLoader = () => dispatch({type: HIDE_LOADER})

  const showError = (error) => dispatch({type: SHOW_ERROR, error: error})

  const clearError = () => dispatch({type: CLEAR_ERROR})



  return (
    <TodoContext.Provider
    value={{
      todos: state.todos,
      loading: state.loading,
      error: state.error,
      addTodo,
      removeTodo,
      updateTodo,
      fetchTodos,
    }}>
    {children}
    </TodoContext.Provider>
  )
}
