const todoForm = document.querySelector(".js-todoForm"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".js-todoList");

const TODOS_LS = "todos";

let todos = [];

function saveTodos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function deleteTodo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    const cleanTodos = todos.filter(function(todo) {
        return todo.id !== parseInt(li.id);
    });
    todos = cleanTodos;
    saveTodos();
}

function paintTodo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = todos.length + 1;
    delBtn.classList.add("btn", "pointer");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteTodo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    todoList.appendChild(li);
    const todoObj = {
        name : text,
        id : newId
    };
    todos.push(todoObj);
    saveTodos();
}

function handleTodoSubmit(event) {
    event.preventDefault();
    const currentValue = todoInput.value;
    paintTodo(currentValue);
    todoInput.value = "";
}

function loadTodos() {
    const loadedTodos = localStorage.getItem(TODOS_LS);
    if (loadedTodos !== null){
        const parsedTodos = JSON.parse(loadedTodos);
        parsedTodos.forEach(function(todo){
            paintTodo(todo.name);
        });
    }
}

function init() {
    loadTodos();
    todoForm.addEventListener("submit", handleTodoSubmit);
}

init();