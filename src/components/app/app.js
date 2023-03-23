/* eslint-disable */
import React, { useState } from 'react'
import { v4 } from 'uuid'

import NewTaskForm from '../new-task-form/new-task-form'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'

import './app.css'

const App = () => {
  const [todoData, setTodoData] = useState([
    createTodoItem('Completed task'),
    createTodoItem('Editing task'),
    createTodoItem('Active task'),
  ])
  const [filter, setFilter] = useState('all')

  function createTodoItem(task, min, sec) {
    return {
      task,
      done: false,
      edit: false,
      id: v4(),
      date: new Date(),
      min: min || 0,
      sec: sec || 0,
    }
  }

  const addItem = (text, min, sec) => {
    const newItem = createTodoItem(text, min, sec)
    if (newItem.task.length < 1) return

    setTodoData((todoData) => [...todoData, newItem])
  }

  const deleteItem = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id)
      return [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
    })
  }

  const clearCompleted = () => {
    setTodoData((todoData) => todoData.filter((el) => !el.done))
  }

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id)

    const oldItem = arr[idx]
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    }

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  const onToggleDone = (ev, id) => {
    if (
      ev.target?.name === 'remove' ||
      ev.target?.name === 'edit' ||
      ev.target?.className === 'edit' ||
      ev.target?.name === 'timer'
    )
      return
    setTodoData((todoData) => toggleProperty(todoData, id, 'done'))
  }

  const onToggleEdit = (id) => {
    setTodoData((todoData) => toggleProperty(todoData, id, 'edit'))
  }

  const onEditSubmit = (ev, id) => {
    ev.preventDefault()
    onToggleEdit(id)
  }

  const onFilterChange = (filter) => {
    setFilter(filter)
  }

  const onEditItem = (ev, id) => {
    const text = ev.target.value

    setTodoData((todoData) => {
      const newArr = todoData.slice()
      newArr.map((el) => {
        // eslint-disable-next-line no-param-reassign
        if (el.id === id) el.task = text
        return el
      })
      return newArr
    })
  }

  function filterTodo(items, filter) {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.done)
      case 'done':
        return items.filter((item) => item.done)
      default:
        return items
    }
  }

  const todoCounter = todoData.length - todoData.filter((el) => el.done).length
  const visibleItems = filterTodo(todoData, filter)

  return (
    <section className="todoapp">
      <NewTaskForm onItemAdded={addItem} />

      <section className="main">
        <TaskList
          todos={visibleItems}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          onToggleEdit={onToggleEdit}
          onEditItem={onEditItem}
          onEditSubmit={onEditSubmit}
        />
        <Footer count={todoCounter} filter={filter} onFilterChange={onFilterChange} clearComplited={clearCompleted} />
      </section>
    </section>
  )
}

export default App
