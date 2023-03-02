import React, { Component } from 'react';

import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [],
    filter: 'all',
  };

  createTodoItem(task) {
    return {
      task,
      done: false,
      edit: false,
      id: this.maxId++,
      date: new Date(),
    }
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    if (newItem.task.length < 1) return;

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return { todoData: newArr };
    });
  };

  clearComplited = () => {
    this.setState(({ todoData }) => {
      const copy = todoData.slice().filter(item => !item.done);
      return { todoData: copy }
    })
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    };

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  };

  onToggleDone = (ev, id) => {
    if (ev.target?.name === 'remove' || ev.target?.name === 'edit' || ev.target?.className === 'edit') return;
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  onToggleEdit = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'edit')
      };
    });
  };

  onEditSubmit = (ev, id) => {
    ev.preventDefault();
    this.onToggleEdit(id)
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  onEditItem = (ev, id) => {
    const text = ev.target.value;

    this.setState(({ todoData }) => {
      const newArr = todoData.slice();
      newArr.map((el) => {
        if (el.id === id) el.task = text;
        return el;
      });
      return { todoData: newArr };
    });
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter(item => !item.done);
      case 'done':
        return items.filter(item => item.done);
      default:
        return items;
    };
  };

  render() {

    const { todoData, filter } = this.state;
    const todoCounter = todoData.length - todoData.filter(el => el.done).length;
    const visibleItems = this.filter(todoData, filter);

    return (
      <section className='todoapp' >
        <NewTaskForm onItemAdded={this.addItem} />

        <section className='main'>
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onToggleEdit={this.onToggleEdit}
            onEditItem={this.onEditItem}
            onEditSubmit={this.onEditSubmit}
          />
          <Footer
            count={todoCounter}
            filter={filter}
            onFilterChange={this.onFilterChange}
            clearComplited={this.clearComplited}
          />
        </section>
      </section>
    );
  };
};