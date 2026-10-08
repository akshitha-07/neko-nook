const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearCompleted = document.getElementById("clearCompleted");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = [];
let currentFilter = "all";

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        return;
    }
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    tasks.push(task);
    taskInput.value = "";
    renderTasks();
});

function renderTasks() {
    taskList.innerHTML = "";
    let filteredTasks = tasks;
    if (currentFilter === "active") {
        filteredTasks = tasks.filter(function(task) {
            return !task.completed;
        });
    } else if (currentFilter === "completed") {
        filteredTasks = tasks.filter(function(task) {
            return task.completed;
        });
    }
    if (filteredTasks.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "empty-message";
        if (currentFilter === "completed") {
            emptyMessage.textContent = "No completed tasks yet.";
        } else if (currentFilter === "active") {
            emptyMessage.textContent = "You're all caught up.";
        } else {
            emptyMessage.textContent = "No tasks yet. Add something to get started.";
        }
        taskList.appendChild(emptyMessage);
    } else {
        filteredTasks.forEach(function(task) {
            const taskElement = document.createElement("div");
            taskElement.className = task.completed ? "task completed" : "task";
            taskElement.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? "checked" : ""}>
                <span class="task-text">${escapeHTML(task.text)}</span>
                <button class="delete-task" type="button" aria-label="Delete task">×</button>
            `;
            const checkbox = taskElement.querySelector(".task-checkbox");
            const deleteButton = taskElement.querySelector(".delete-task");
            checkbox.addEventListener("change", function() {
                task.completed = checkbox.checked;
                renderTasks();
            });
            deleteButton.addEventListener("click", function() {
                tasks = tasks.filter(function(item) {
                    return item.id !== task.id;
                });
                renderTasks();
            });
            taskList.appendChild(taskElement);
        });
    }
    updateTaskCount();
}

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });
        button.classList.add("active");
        currentFilter = button.dataset.filter;
        renderTasks();
    });
});

clearCompleted.addEventListener("click", function() {
    tasks = tasks.filter(function(task) {
        return !task.completed;
    });
    renderTasks();
});

function updateTaskCount() {
    const remainingTasks = tasks.filter(function(task) {
        return !task.completed;
    }).length;
    taskCount.textContent = `${remainingTasks} ${remainingTasks === 1 ? "task" : "tasks"} left`;
}

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

renderTasks();