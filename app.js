// UI variables

const form = document.querySelector('#task-form');
const inputTask = document.querySelector("#task");
const filter = document.querySelector("#filter");
const taskList = document.querySelector(".collection");
const clearTask = document.querySelector(".clear-tasks");

loadallEventListners();

function loadallEventListners() {
    document.addEventListener('DOMContentLoaded', getTask);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearTask.addEventListener('click', cleardata);
    filter.addEventListener('keyup', searchTask);
}
function getTask() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        const li = document.createElement('li');
        li.className = "collection-item";
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = "delete-item secondary-content";
        link.innerHTML = "<i class='fa fa-remove'></i>";
        li.appendChild(link);
        taskList.appendChild(li);
    });
}
function addTask(e) {
    if (inputTask.value === '') {
        alert("Add Task");
    }
    const li = document.createElement('li');
    li.className = "collection-item";
    li.appendChild(document.createTextNode(inputTask.value));
    const link = document.createElement('a');
    link.className = "delete-item secondary-content";
    link.innerHTML = "<i class='fa fa-remove'></i>";
    li.appendChild(link);
    taskList.appendChild(li);
    storeInLocalStorage(inputTask.value);
    e.preventDefault();
}

function storeInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function removeTask(e) {

    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Sure?")) {
            e.target.parentElement.parentElement.remove();
        }
        removetaskfromLocalStorage(e.target.parentElement.parentElement);
    }
}
function removetaskfromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function cleardata() {
    if (confirm("Are you Sure you Want to Delete")) {
        taskList.innerHTML = '';
    }
    clearallLocalStorage();
}
function clearallLocalStorage() {
    localStorage.clear();
}
function searchTask(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}