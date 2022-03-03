import './styles.css';

// import { Todo } from './classes/todo.class';
// import { TodoList } from './classes/todo-list.class';
import { Todo, TodoList } from './classes'
import { crearTodoHTML } from './js/componentes';

export const todoList = new TodoList();

// Esto es lo mismo
// todoList.todos.forEach( todo => crearTodoHTML(todo));
todoList.todos.forEach( crearTodoHTML );

