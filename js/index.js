const $ = (n) => document.querySelector(n);
const todos = new Todos();

const todoHtml = (todo) => {
  return (
    `
  <div data-id=${todo.id} class="todo-item">
    <div class="main-todo-section">
      <div class="todo-details">
        <p class="todo-title"><b>${todo.title}</b></p>
        <p class="todo-description">${todo.description}</p>
      </div>` +
    (() =>
      todo.isDone
        ? '<input type="checkbox" name="is-done" class="todo-is-done" checked />'
        : '<input type="checkbox" name="is-done" class="todo-is-done" />')() +
    `</div>
    <div class="todo-actions">
      <button class="delete-todo">Delete</button>
    </div>
  </div>
  `
  );
};
{
  /* <button class="edit-todo">Edit</button> */
}

const updateUi = () => {
  let htmlString = "";
  todos.items.forEach((todo) => {
    htmlString += todoHtml(todo);
  });
  if (todos.items.length > 0) {
    $(".todos").innerHTML = htmlString;
  } else {
    $(".todos").innerHTML = "Nothing to do";
  }
};

EventManager.subscribe("formsubmitted", (todo) => {
  todos.addTodo(todo);
  updateUi();
});

$("form").onsubmit = (e) => {
  e.preventDefault();
  const title = e.target["todo-title"].value;
  const description = e.target["todo-description"].value;
  const todo = new Todo(title, description);
  EventManager.publish("formsubmitted", todo);
  $("form").reset();
};

$(".todos").onclick = (event) => {
  const todoId = () => event.target.parentNode.parentNode.dataset.id;
  const todoPresent = event.target.classList.contains("delete-todo");
  const checkboxClicked = event.target.classList.contains("todo-is-done");
  if (todoPresent) {
    todos.removeTodo(todoId());
    updateUi();
  }
  if (checkboxClicked) {
    todos.updateTodo(todoId(), { toggleCheck: true });
    // updateUi()
  }
};
$(".filters").onclick = (event) => {
  const cl = event.target.classList;
  if (cl.contains("all")) {
    todos.activeFilter = "all";
    updateFilterSelection("all");
  } else if (cl.contains("done")) {
    todos.activeFilter = "done";
    updateFilterSelection("done");
  } else if (cl.contains("unDone")) {
    todos.activeFilter = "unDone";
    updateFilterSelection("unDone");
  }
  updateUi();
};

const updateFilterSelection = (active) => {
  const filterNodes = document.querySelectorAll(".todo-filter");
  let toBeActive;
  filterNodes.forEach((item) => {
    if (item.classList.contains(active)) {
      toBeActive = item;
    }
  });
  filterNodes.forEach((node) => {
    node.classList.remove("active-filter");
  });
  toBeActive.classList.add("active-filter");
};
