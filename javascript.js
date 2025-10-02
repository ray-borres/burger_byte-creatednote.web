document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    createTaskElement(taskText);
    saveTaskToLocalStorage(taskText);

    taskInput.value = "";
}

function createTaskElement(taskText, completed = false) {
    const li = document.createElement("li");
    if (completed) li.classList.add("completed");

    li.innerHTML = `
    <span onclick="toggleComplete(this)">${taskText}</span>
    <button onclick="deleteTask(this)">Delete</button>
  `;

    document.getElementById("taskList").appendChild(li);
}

function toggleComplete(element) {
    const li = element.parentElement;
    li.classList.toggle("completed");

    updateLocalStorage();
}

function deleteTask(button) {
    const li = button.parentElement;
    li.remove();
    updateLocalStorage();
}

function saveTaskToLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTaskElement(task.text, task.completed));
}

function updateLocalStorage() {
    const listItems = document.querySelectorAll("#taskList li");
    const tasks = [];

    listItems.forEach(li => {
        const text = li.querySelector("span").innerText;
        const completed = li.classList.contains("completed");
        tasks.push({ text, completed });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}