document.addEventListener('DOMContentLoaded', () => {

    const sr = ScrollReveal({
        distance: '60px',
        duration: 1800,
        delay: 200,
        reset: false
    });

    sr.reveal('.hero-text', {
        delay: 200,
        origin: 'left'
    });

    sr.reveal('.hero-image', {
        delay: 400,
        origin: 'right'
    });

    sr.reveal('.heading', {
        delay: 300,
        origin: 'top'
    });

    sr.reveal('.choice-container .card', {
        delay: 400,
        origin: 'bottom'
    });

    sr.reveal('.feature-container .card', {
        delay: 400,
        origin: 'bottom'
    });

    sr.reveal('.planner-card', {
        delay: 400,
        origin: 'bottom'
    });

    sr.reveal('footer', {
        delay: 400,
        origin: 'bottom'
    });


    const todoInput = document.getElementById('todo-input');
    const addTodo = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');

    const completedCount = document.getElementById('completed-count');
    const totalCount = document.getElementById('total-count');

    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');


    addTodo.addEventListener('click', () => {

        if (todoInput.value === '') {
            return;
        }

        const li = document.createElement('li');

        li.className = 'todo-item';

        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox">

            <span class="todo-text">
                ${todoInput.value}
            </span>

            <button class="delete-todo">
                <i class="bx bx-trash"></i>
            </button>
        `;

        todoList.appendChild(li);

        todoInput.value = '';

        updateProgress();
    });


    todoInput.addEventListener('keydown', (event) => {

        if (event.key === 'Enter') {
            addTodo.click();
        }

    });


    todoList.addEventListener('change', (event) => {

        if (event.target.classList.contains('todo-checkbox')) {

            const item = event.target.parentElement;

            item.classList.toggle(
                'completed',
                event.target.checked
            );

            updateProgress();
        }

    });


    todoList.addEventListener('click', (event) => {

        if (
            event.target.classList.contains('delete-todo') ||
            event.target.parentElement.classList.contains('delete-todo')
        ) {

            const button =
                event.target.closest('.delete-todo');

            button.parentElement.remove();

            updateProgress();
        }

    });


    function updateProgress() {

        const tasks =
            todoList.querySelectorAll('.todo-item');

        const completed =
            todoList.querySelectorAll(
                '.todo-item.completed'
            );

        totalCount.textContent = tasks.length;

        completedCount.textContent =
            completed.length;


        if (tasks.length === 0) {

            progressFill.style.width = '0%';

            progressText.textContent =
                '0% completed';

            return;
        }


        const percentage =
            (completed.length / tasks.length) * 100;


        progressFill.style.width =
            percentage + '%';

        progressText.textContent =
            Math.round(percentage) + '% completed';
    }


    const moodButtons =
        document.querySelectorAll('.mood-btn');


    moodButtons.forEach((button) => {

        button.addEventListener('click', () => {

            moodButtons.forEach((btn) => {
                btn.classList.remove('active');
            });

            button.classList.add('active');

        });

    });


    const journalEntry =
        document.getElementById('journal-entry');

    const saveJournal =
        document.getElementById('save-journal');

    const journalStatus =
        document.getElementById('journal-status');

    const characterCount =
        document.getElementById('character-count');


    journalEntry.addEventListener('input', () => {

        characterCount.textContent =
            journalEntry.value.length + ' / 500';

    });


    saveJournal.addEventListener('click', () => {

        if (journalEntry.value.trim() === '') {

            journalStatus.textContent =
                'Please write something first.';

        } else {

            journalStatus.textContent =
                'Your journal has been saved ✨';

        }

    });

});