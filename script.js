/* =========================================
   STUDYFLOW - STUDENT STUDY PLANNER
   HTML + CSS + JAVASCRIPT + LOCAL STORAGE
========================================= */


/* =========================================
   VARIABLES
========================================= */

let tasks = JSON.parse(localStorage.getItem("studyFlowTasks")) || [];

let editingTaskId = null;

let subjectChart;


/* =========================================
   DOM ELEMENTS
========================================= */

const taskModal = document.getElementById("taskModal");

const taskForm = document.getElementById("taskForm");

const taskList = document.getElementById("taskList");

const taskName = document.getElementById("taskName");

const taskSubject = document.getElementById("taskSubject");

const taskPriority = document.getElementById("taskPriority");

const taskDate = document.getElementById("taskDate");

const editTaskId = document.getElementById("editTaskId");

const searchInput = document.getElementById("searchInput");

const statusFilter = document.getElementById("statusFilter");

const priorityFilter = document.getElementById("priorityFilter");


/* =========================================
   INITIALIZE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeAnimations();

    initializeTypingEffect();

    loadTheme();

    renderTasks();

    updateDashboard();

    showRandomTip();

});


/* =========================================
   AOS ANIMATION
========================================= */

function initializeAnimations() {

    AOS.init({
        duration: 700,
        once: true,
        offset: 80
    });

}


/* =========================================
   TYPED.JS
========================================= */

function initializeTypingEffect() {

    new Typed("#typedText", {

        strings: [
            "Track your progress.",
            "Stay organized.",
            "Achieve your goals."
        ],

        typeSpeed: 60,

        backSpeed: 40,

        backDelay: 1500,

        loop: true

    });

}


/* =========================================
   LOCAL STORAGE
========================================= */

function saveTasks() {

    localStorage.setItem(
        "studyFlowTasks",
        JSON.stringify(tasks)
    );

}


/* =========================================
   MODAL
========================================= */

function openModal() {

    taskModal.classList.add("show");

    taskName.focus();

}


function closeModal() {

    taskModal.classList.remove("show");

    taskForm.reset();

    editingTaskId = null;

    editTaskId.value = "";

    document.getElementById("modalTitle").textContent =
        "Add New Task";

}


/* Open buttons */

document.getElementById("addTaskBtn")
    .addEventListener("click", openModal);


document.getElementById("heroAddBtn")
    .addEventListener("click", openModal);


/* Close */

document.getElementById("closeModal")
    .addEventListener("click", closeModal);


document.getElementById("cancelBtn")
    .addEventListener("click", closeModal);


/* Close when clicking outside */

taskModal.addEventListener("click", (event) => {

    if (event.target === taskModal) {

        closeModal();

    }

});


/* =========================================
   ADD / EDIT TASK
========================================= */

taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = taskName.value.trim();

    const subject = taskSubject.value;

    const priority = taskPriority.value;

    const date = taskDate.value;


    if (!name || !subject || !date) {

        return;

    }


    /* EDIT */

    if (editingTaskId) {

        const task = tasks.find(
            task => task.id === editingTaskId
        );

        if (task) {

            task.name = name;

            task.subject = subject;

            task.priority = priority;

            task.date = date;

        }


        showSuccess("Task updated successfully!");

    }


    /* ADD */

    else {

        const newTask = {

            id: Date.now().toString(),

            name: name,

            subject: subject,

            priority: priority,

            date: date,

            completed: false,

            createdAt: new Date().toISOString()

        };


        tasks.unshift(newTask);


        showSuccess("Task added successfully!");

    }


    saveTasks();

    renderTasks();

    updateDashboard();

    closeModal();

});


/* =========================================
   RENDER TASKS
========================================= */

function renderTasks() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    const status =
        statusFilter.value;

    const priority =
        priorityFilter.value;


    let filteredTasks = tasks.filter(task => {

        const matchesSearch =
            task.name.toLowerCase().includes(searchText) ||
            task.subject.toLowerCase().includes(searchText);


        const matchesStatus =
            status === "all" ||
            (status === "completed" && task.completed) ||
            (status === "pending" && !task.completed);


        const matchesPriority =
            priority === "all" ||
            task.priority === priority;


        return (
            matchesSearch &&
            matchesStatus &&
            matchesPriority
        );

    });


    if (filteredTasks.length === 0) {

        taskList.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-clipboard-list"></i>

                <h3>No tasks found</h3>

                <p>
                    Add a new study task to get started.
                </p>

            </div>

        `;

        return;

    }


    taskList.innerHTML = filteredTasks
        .map(createTaskHTML)
        .join("");

}


/* =========================================
   CREATE TASK HTML
========================================= */

function createTaskHTML(task) {

    const formattedDate =
        formatDate(task.date);


    return `

        <div class="task-card ${task.completed ? "completed" : ""}">

            <div
                class="task-check"
                onclick="toggleTask('${task.id}')">

                ${task.completed
                    ? '<i class="fa-solid fa-check"></i>'
                    : ''
                }

            </div>


            <div class="task-info">

                <div class="task-name">

                    ${escapeHTML(task.name)}

                </div>


                <div class="task-meta">

                    <span>
                        <i class="fa-solid fa-book"></i>
                        ${escapeHTML(task.subject)}
                    </span>

                    <span>
                        <i class="fa-regular fa-calendar"></i>
                        ${formattedDate}
                    </span>

                    <span class="priority ${task.priority}">

                        ${capitalize(task.priority)}

                    </span>

                </div>

            </div>


            <div class="task-actions">

                <button
                    onclick="editTask('${task.id}')"
                    title="Edit">

                    <i class="fa-solid fa-pen"></i>

                </button>


                <button
                    onclick="deleteTask('${task.id}')"
                    title="Delete">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        </div>

    `;

}


/* =========================================
   TOGGLE TASK
========================================= */

function toggleTask(id) {

    const task =
        tasks.find(task => task.id === id);


    if (!task) return;


    task.completed = !task.completed;


    saveTasks();

    renderTasks();

    updateDashboard();


    if (task.completed) {

        Swal.fire({

            icon: "success",

            title: "Great job! 🎉",

            text: "You completed a study task.",

            timer: 1200,

            showConfirmButton: false

        });

    }

}


/* =========================================
   EDIT TASK
========================================= */

function editTask(id) {

    const task =
        tasks.find(task => task.id === id);


    if (!task) return;


    editingTaskId = id;


    editTaskId.value = id;


    taskName.value = task.name;

    taskSubject.value = task.subject;

    taskPriority.value = task.priority;

    taskDate.value = task.date;


    document.getElementById("modalTitle").textContent =
        "Edit Task";


    openModal();

}


/* =========================================
   DELETE TASK
========================================= */

function deleteTask(id) {

    Swal.fire({

        title: "Delete this task?",

        text: "This action cannot be undone.",

        icon: "warning",

        showCancelButton: true,

        confirmButtonText: "Yes, delete it",

        cancelButtonText: "Cancel"

    }).then(result => {

        if (result.isConfirmed) {

            tasks =
                tasks.filter(task => task.id !== id);


            saveTasks();

            renderTasks();

            updateDashboard();


            Swal.fire({

                icon: "success",

                title: "Deleted",

                text: "Task has been removed.",

                timer: 1200,

                showConfirmButton: false

            });

        }

    });

}


/* =========================================
   DASHBOARD
========================================= */

function updateDashboard() {

    const total = tasks.length;


    const completed =
        tasks.filter(task => task.completed).length;


    const pending =
        total - completed;


    const percentage =
        total === 0
            ? 0
            : Math.round((completed / total) * 100);


    document.getElementById("totalTasks").textContent =
        total;


    document.getElementById("completedTasks").textContent =
        completed;


    document.getElementById("pendingTasks").textContent =
        pending;


    document.getElementById("progressPercent").textContent =
        `${percentage}%`;


    document.getElementById("circlePercent").textContent =
        `${percentage}%`;


    updateProgressCircle(percentage);


    updateProgressMessage(percentage);


    updateChart();

}


/* =========================================
   PROGRESS CIRCLE
========================================= */

function updateProgressCircle(percentage) {

    const circle =
        document.querySelector(".progress-circle");


    const degrees =
        percentage * 3.6;


    circle.style.background = `conic-gradient(
        var(--primary) ${degrees}deg,
        var(--border) ${degrees}deg
    )`;

}


/* =========================================
   PROGRESS MESSAGE
========================================= */

function updateProgressMessage(percentage) {

    const message =
        document.getElementById("progressMessage");


    if (tasks.length === 0) {

        message.textContent =
            "Start adding tasks to track your progress.";

    }

    else if (percentage === 100) {

        message.textContent =
            "Amazing! You completed all your tasks.";

    }

    else if (percentage >= 75) {

        message.textContent =
            "Excellent progress. Keep going!";

    }

    else if (percentage >= 40) {

        message.textContent =
            "Good progress. Stay consistent.";

    }

    else {

        message.textContent =
            "Keep working. Every completed task counts.";

    }

}


/* =========================================
   CHART.JS
========================================= */

function updateChart() {

    const subjectCounts = {};


    tasks.forEach(task => {

        if (!subjectCounts[task.subject]) {

            subjectCounts[task.subject] = 0;

        }

        subjectCounts[task.subject]++;

    });


    const labels =
        Object.keys(subjectCounts);


    const values =
        Object.values(subjectCounts);


    const ctx =
        document.getElementById("subjectChart");


    if (subjectChart) {

        subjectChart.destroy();

    }


    subjectChart = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: labels.length
                ? labels
                : ["No Tasks"],

            datasets: [{

                data: values.length
                    ? values
                    : [1],

                backgroundColor: [
                    "#6366f1",
                    "#22c55e",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6",
                    "#06b6d4"
                ],

                borderWidth: 0

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom",

                    labels: {

                        color:
                            getComputedStyle(document.body)
                                .getPropertyValue("--text")

                    }

                }

            }

        }

    });

}


/* =========================================
   SEARCH / FILTER
========================================= */

searchInput.addEventListener(
    "input",
    renderTasks
);


statusFilter.addEventListener(
    "change",
    renderTasks
);


priorityFilter.addEventListener(
    "change",
    renderTasks
);


/* =========================================
   CLEAR ALL
========================================= */

document.getElementById("clearAllBtn")
    .addEventListener("click", () => {

        if (tasks.length === 0) {

            Swal.fire({

                icon: "info",

                title: "No tasks",

                text: "There are no tasks to clear."

            });

            return;

        }


        Swal.fire({

            title: "Clear all tasks?",

            text: "All saved tasks will be deleted.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Yes, clear all",

            cancelButtonText: "Cancel"

        }).then(result => {

            if (result.isConfirmed) {

                tasks = [];

                saveTasks();

                renderTasks();

                updateDashboard();


                Swal.fire({

                    icon: "success",

                    title: "All tasks cleared",

                    timer: 1200,

                    showConfirmButton: false

                });

            }

        });

    });


/* =========================================
   DARK MODE
========================================= */

const themeBtn =
    document.getElementById("themeBtn");


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");


    const dark =
        document.body.classList.contains("dark");


    localStorage.setItem(
        "studyFlowTheme",
        dark ? "dark" : "light"
    );


    themeBtn.innerHTML = dark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';

});


function loadTheme() {

    const savedTheme =
        localStorage.getItem("studyFlowTheme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    }

}


/* =========================================
   STUDY TIPS
========================================= */

function showRandomTip() {

    const tips = [

        "Break large tasks into smaller tasks to make studying easier.",

        "Use short study sessions and take regular breaks.",

        "Complete difficult subjects when your energy level is high.",

        "Review your previous topics regularly.",

        "Consistency is more important than studying everything in one day.",

        "Keep your study goals realistic and measurable."

    ];


    const randomIndex =
        Math.floor(Math.random() * tips.length);


    document.getElementById("studyTip")
        .textContent = tips[randomIndex];

}


/* =========================================
   SUCCESS MESSAGE
========================================= */

function showSuccess(message) {

    Swal.fire({

        icon: "success",

        title: message,

        timer: 1200,

        showConfirmButton: false

    });

}


/* =========================================
   HELPER FUNCTIONS
========================================= */

function formatDate(date) {

    if (!date) return "";


    const d =
        new Date(date + "T00:00:00");


    return d.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


function capitalize(value) {

    return value.charAt(0).toUpperCase()
        + value.slice(1);

}


/* Prevent HTML injection */

function escapeHTML(value) {

    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}