const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearCompleted = document.getElementById("clearCompleted");

const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = [];

let currentFilter = "all";

/*At the beginning, I obtain references to the important HTML elements using getElementById() and 
querySelectorAll(). I then maintain two important pieces of state: tasks, which stores all of the 
task objects, and currentFilter, which determines which subset of those tasks should currently be displayed.
*/

taskForm.addEventListener("submit", function (event) {

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


/* Display tasks */

function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }


    if (filteredTasks.length === 0) {

        const emptyMessage = document.createElement("p");

        emptyMessage.className = "empty-message";

        emptyMessage.textContent =
            currentFilter === "completed"
                ? "No completed tasks yet."
                : currentFilter === "active"
                ? "You're all caught up."
                : "No tasks yet. Add something to get started.";

        taskList.appendChild(emptyMessage);

    } else {

        filteredTasks.forEach(task => {

            const taskElement = document.createElement("div");

            taskElement.className =
                task.completed
                    ? "task completed"
                    : "task";


            taskElement.innerHTML = `
                <input
                    type="checkbox"
                    class="task-checkbox"
                    ${task.completed ? "checked" : ""}
                >

                <span class="task-text">
                    ${escapeHTML(task.text)}
                </span>

                <button
                    class="delete-task"
                    type="button"
                    aria-label="Delete task"
                >
                    ×
                </button>
            `;


            const checkbox =
                taskElement.querySelector(".task-checkbox");

            const deleteButton =
                taskElement.querySelector(".delete-task");


            checkbox.addEventListener("change", function () {

                task.completed = checkbox.checked;

                renderTasks();
            });


            deleteButton.addEventListener("click", function () {

                tasks = tasks.filter(
                    item => item.id !== task.id
                );

                renderTasks();
            });


            taskList.appendChild(taskElement);
        });
    }


    updateTaskCount();
}


/* Filter buttons */

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        renderTasks();
    });
});


/* Clear completed */

clearCompleted.addEventListener("click", function () {

    tasks = tasks.filter(task => !task.completed);

    renderTasks();
});


/* Task counter */

function updateTaskCount() {

    const remainingTasks =
        tasks.filter(task => !task.completed).length;

    taskCount.textContent =
        `${remainingTasks} ${remainingTasks === 1 ? "task" : "tasks"} left`;
}


/* Prevent HTML from being inserted as a task */

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


/* Initial display */

renderTasks();