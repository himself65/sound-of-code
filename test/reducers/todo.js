let todos = [];
let todoInput = document.getElementById("todoInput");
let todoList = document.getElementById("todoList");

function addTodo() {
  const todo = todoInput.value;
  todos.push(todo);
  updateTodoList();
}

function updateTodoList() {
  todoList.innerHTML = "";
  todos.forEach(function (todo) {
    const li = document.createElement("li");
    li.innerText = todo;
    todoList.appendChild(li);
  });
}

document.getElementById("addTodoButton").addEventListener("click", addTodo);
