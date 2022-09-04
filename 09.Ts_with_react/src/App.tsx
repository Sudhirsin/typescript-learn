import React, { useState } from 'react';
import NewTodo from './components/NewTodo';

import TodoList from './components/TodoList';

import { Todo } from './todo.module';


const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const todoAddHandler = (text: string) => {
    setTodos(prevTodos => ([...prevTodos, { id: Math.random().toString(), text: text }]))
  }

  const deleteTodoHandler = (todoId: string) => {
    setTodos([...todos.filter(todo => todo.id !== todoId)])
  }

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} deleteTodo={deleteTodoHandler} />
    </div>
  )
}

export default App;
