
export class Todo {

    static fromJSON({id, tarea, completado, created}) {
      const tempTodo = new Todo(tarea);

      tempTodo.id = id;
      tempTodo.completado = completado;
      tempTodo.created = created;

      return tempTodo;
    }

    constructor(tarea) {
        this.tarea = tarea;
        this.id = new Date().getTime();
        this.completado = false;
        this.created = new Date();
    }
}