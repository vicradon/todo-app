class Todos {
  _todos = [];
  _activeFilter = "all";
  addTodo = (todo) => {
    this._todos.push(todo);
  };
  removeTodo = (todoId) => {
    this._todos = this._todos.filter((x) => x.id !== +todoId);
  };
  updateTodo = (todoId, options) => {
    if (options.toggleCheck === true) {
      const todo = this._todos.find((todo) => todo.id === +todoId);
      todo.toggleDone();
    }
  };
  get items() {
    switch (this._activeFilter) {
      case "all": {
        return this._todos;
      }
      case "done": {
        return this._todos.filter((todo) => todo.isDone === true);
      }
      case "unDone": {
        return this._todos.filter((todo) => todo.isDone === false);
      }
    }
  }
  set activeFilter(value) {
    this._activeFilter = value;
  }
  get activeFilter() {
    return this._activeFilter;
  }
}
