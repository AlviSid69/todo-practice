import React from 'react';

import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

const App = () => {

  const todoData = [
    { task: 'Drink Coffee', status: null, id: 1 },
    { task: 'Make Awesome App', status: 'editing', id: 2 },
    { task: 'Have a lunch', status: 'completed', id: 3 }
  ];

  return (
    <section className='todoapp'>
      <NewTaskForm />
      <section className='main'>
        <TaskList todos={todoData} />
        <Footer />
      </section>
    </section>
  );
}

export default App;