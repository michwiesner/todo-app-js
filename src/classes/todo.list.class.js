import { Todo } from ".";


export class TodoList {
  constructor() {
    this.getLocalStorage();
    // this.todos = [];
  }

  newTodo(todo) {
    this.todos.push(todo);
    this.saveLocalStorage();
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id != id);
    this.saveLocalStorage();
  }

  toggleTodo(id) {
    for (const todo of this.todos) {
      if (todo.id == id) {
        todo.completado = !todo.completado;
        this.saveLocalStorage();
        break;
      }
    }
  }

  deleteCompleted() {
    this.todos = this.todos.filter((todo) => !todo.completado);
    this.saveLocalStorage();
  }

  saveLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(this.todos));
  }

  getLocalStorage() {
    this.todos = localStorage.getItem("todo")
      ? JSON.parse(localStorage.getItem("todo"))
      : [];

    this.todos = this.todos.map( Todo.fromJSON );
  }
}
