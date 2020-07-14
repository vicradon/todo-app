class Todo {
  constructor(title, description) {
    this._id = Date.now();
    this._title = title;
    this._description = description;
    this._isDone = false;
  }
  toggleDone = () => {
    this._isDone = !this._isDone;
  };
  set title(newTitle) {
    this._title = newTitle;
  }
  set description(newDescription) {
    this._description = newDescription;
  }
  get id(){
    return this._id
  }
  get title() {
    return this._title;
  }
  get description() {
    return this._description;
  }
  get isDone() {
    return this._isDone;
  }
}
