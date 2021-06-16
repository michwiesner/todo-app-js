import { Todo } from "../classes";
import { todoList } from "../index";
// Referencias Html
const divTodoList = document.querySelector(".todo-list");
const newTodoInput = document.querySelector(".new-todo");
const btnClearCompleted = document.querySelector(".clear-completed");
const ulFilter = document.querySelector(".filters");
const anchorFilter = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
  const htmlTodo = `
    <li class="${todo.completado ? "completed" : ""}" data-id="${todo.id}">
    <div class="view">
        <input class="toggle" type="checkbox" ${
          todo.completado ? "checked" : ""
        }>
        <label>${todo.tarea}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Rule the web">
    </li>
    `;

  const div = document.createElement("div");
  div.innerHTML = htmlTodo;
  divTodoList.append(div.firstElementChild);

  return div.firstElementChild;
};

// Eventos
newTodoInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13 && newTodoInput.value.length > 0) {
    const newTodo = new Todo(newTodoInput.value);
    todoList.newTodo(newTodo);

    crearTodoHtml(newTodo);

    newTodoInput.value = "";
  }
});

divTodoList.addEventListener("click", (event) => {
  const target = event.target.localName; //input, label or button
  const todoElement = event.target.parentElement.parentElement;
  const todoId = todoElement.getAttribute("data-id");

  if (target.includes("input")) {
    //click in checkbox
    todoList.toggleTodo(todoId);
    todoElement.classList.toggle("completed");
  } else if (target.includes("button")) {
    // Delete todo
    todoList.deleteCompleted(todoId);
    divTodoList.removeChild(todoElement);
  }
});

// Delete all completed

btnClearCompleted.addEventListener("click", () => {
  todoList.deleteCompleted();

  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const element = divTodoList.children[i];

    if (element.classList.contains("completed")) {
      divTodoList.removeChild(element);
    }
  }
});

ulFilter.addEventListener("click", (event) => {
  const filterInput = event.target.text;

  if (!filterInput) {
    return;
  }

  anchorFilter.forEach(anchor => { anchor.classList.remove('selected') });



  for( const element of divTodoList.children ) {
    element.classList.remove('hidden');
    const completed = element.classList.contains('completed');
    event.target.classList.add('selected');
    
    switch (filterInput) {
      case 'Pendientes':
        if ( completed ) {
          element.classList.add('hidden');
        }
        
        break;
      case 'Completados':
        if ( !completed ) {
          element.classList.add('hidden');
        }
        break;
    
      default:
        break;
    }
  }
});
