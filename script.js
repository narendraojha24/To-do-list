document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("tasks")) {
        
        const savedTasks = JSON.parse(localStorage.getItem("tasks"));
        savedTasks.forEach(task => {
            addTaskToDOM(task);
        });
    }
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const task = { text: taskText, completed: false };
        addTaskToDOM(task);
        saveTask(task);
        taskInput.value = "";
    }
}

function addTaskToDOM(task) {
    const taskList = document.getElementById("taskList");
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <span>${task.text}</span>
        <button onclick="removeTask(this)">Remove</button>
    `;
    taskList.appendChild(taskItem);
}

function removeTask(button) {
    const taskItem = button.parentNode;
    const taskText = taskItem.firstChild.innerText;
    removeTaskFromLocalStorage(taskText);
    taskItem.remove();
}

function saveTask(task) {
    let tasks = [];
    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
    let tasks = [];
    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}