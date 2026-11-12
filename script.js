
// ==================================
// 1. GET HTML ELEMENTS
// ==================================

let navButtons = document.querySelectorAll(".nav-btn");
let pages = document.querySelectorAll(".page");

let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");


// ==================================
// 2. NAVIGATION BETWEEN PAGES
// ==================================

function showPage(pageId) {

    // Hide all pages
    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    // Remove active from all buttons
    navButtons.forEach(function(button) {
        button.classList.remove("active");
    });

    // Show selected page
    let selectedPage = document.getElementById(pageId);

    if (!selectedPage) return;

    selectedPage.classList.add("active");

    // Activate selected button
    let selectedButton = document.querySelector(
        '.nav-btn[data-page="' + pageId + '"]'
    );

    if (selectedButton) {
        selectedButton.classList.add("active");
    }

}


// Navigation click events
navButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        let pageId = button.dataset.page;

        showPage(pageId);

    });

});


// ==================================
// 3. LOAD SAVED TASKS
// ==================================

let tasks = JSON.parse(
    localStorage.getItem("tasks")
) || [];


// ==================================
// 4. SAVE TASKS
// ==================================

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// ==================================
// 5. DISPLAY TASKS
// ==================================

function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        // Create list item
        let li = document.createElement("li");


        // Create checkbox
        let checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = task.done;


        // Create task name
        let span = document.createElement("span");

        span.textContent = task.name;

        if (task.done) {
            span.classList.add("completed");
        }


        // Checkbox event
        checkbox.addEventListener("change", function() {

            tasks[index].done = checkbox.checked;

            saveTasks();

            displayTasks();

        });


        // Create delete button
        let deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";


        // Delete event
        deleteBtn.addEventListener("click", function() {

            tasks.splice(index, 1);

            saveTasks();

            displayTasks();

        });


        // Add elements
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });

    updateProgress();

}


// ==================================
// 6. ADD NEW TASK
// ==================================

function addTask() {

    let taskName = taskInput.value.trim();

    let message = document.getElementById("message");

    if (taskName === "") {

        message.textContent = "Please enter a task!";

        return;

    }

    // Add task to array
    tasks.push({

        name: taskName,

        done: false

    });

    // Save tasks
    saveTasks();

    // Clear input
    taskInput.value = "";

    message.textContent = "";

    // Refresh list
    displayTasks();

}


// Add button event
addBtn.addEventListener("click", addTask);


// Add task using Enter
taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});


// ==================================
// 7. UPDATE STATISTICS
// ==================================

function updateProgress() {

    let total = tasks.length;

    let completed = tasks.filter(function(task) {

        return task.done;

    }).length;

    let remaining = total - completed;


    // Update statistics
    document.getElementById("totalTasks").textContent = total;

    document.getElementById("completedTasks").textContent = completed;

    document.getElementById("remainingTasks").textContent = remaining;


    // Calculate percentage
    let percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);


    // Update progress bar
    document.getElementById("progressFill").style.width =
        percentage + "%";

    document.getElementById("progressText").textContent =
        percentage + "% Completed";

}


// ==================================
// 8. DARK MODE
// ==================================

let themeBtn = document.getElementById("themeBtn");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

    themeBtn.textContent = "Change to Pink 🌸";

}


// Change theme
themeBtn.addEventListener("click", function() {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");

        themeBtn.textContent = "Change to Pink 🌸";

    } else {

        localStorage.setItem("theme", "light");

        themeBtn.textContent = "Change Theme 🌙";

    }

});


// ==================================
// 9. INITIALIZE APPLICATION
// ==================================

displayTasks();

showPage("dashboard");

// ==================================
// 10. SUBJECTS MANAGEMENT
// ==================================

// Get HTML elements

let subjectName = document.getElementById("subjectName");

let subjectDescription = document.getElementById("subjectDescription");

let addSubjectBtn = document.getElementById("addSubjectBtn");

let subjectList = document.getElementById("subjectList");


// Load saved subjects

let subjects = JSON.parse(
    localStorage.getItem("subjects")
) || [];


// Save subjects

function saveSubjects() {

    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );

}


// Display subjects

function displaySubjects() {

    subjectList.innerHTML = "";

    subjects.forEach(function(subject, index) {

        // Create card

        let card = document.createElement("div");

        card.className = "subject-card";


        // Subject title

        let title = document.createElement("h3");

        title.textContent = "📚 " + subject.name;


        // Subject description

        let description = document.createElement("p");

        description.textContent = subject.description;


        // Delete button

        let deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";

        deleteBtn.className = "delete-subject";


        // Delete event

        deleteBtn.addEventListener("click", function() {

            subjects.splice(index, 1);

            saveSubjects();

            displaySubjects();

        });


        // Add elements to card

        card.appendChild(title);

        card.appendChild(description);

        card.appendChild(deleteBtn);

        subjectList.appendChild(card);

    });

}


// Add subject

function addSubject() {

    let name = subjectName.value.trim();

    let description = subjectDescription.value.trim();

    let message = document.getElementById("subjectMessage");


    if (name === "") {

        message.textContent = "Please enter a subject name!";

        return;

    }


    // Add subject to array

    subjects.push({

        name: name,

        description: description || "No description"

    });


    // Save data

    saveSubjects();


    // Clear inputs

    subjectName.value = "";

    subjectDescription.value = "";

    message.textContent = "";


    // Refresh subjects

    displaySubjects();

}


// Button event

addSubjectBtn.addEventListener("click", addSubject);


// Display saved subjects

displaySubjects();

// ==================================
// 11. CALENDAR MANAGEMENT
// ==================================


// Get HTML elements

let sessionTitle = document.getElementById("sessionTitle");

let sessionDate = document.getElementById("sessionDate");

let sessionTime = document.getElementById("sessionTime");

let addSessionBtn = document.getElementById("addSessionBtn");

let sessionList = document.getElementById("sessionList");

let calendarMessage = document.getElementById("calendarMessage");


// Load saved sessions

let sessions = JSON.parse(
    localStorage.getItem("sessions")
) || [];


// Save sessions

function saveSessions() {

    localStorage.setItem(
        "sessions",
        JSON.stringify(sessions)
    );

}


// Display sessions

function displaySessions() {

    sessionList.innerHTML = "";

    // Sort sessions by date and time

    let sortedSessions = sessions
        .map(function(session, index) {
            return {
                ...session,
                originalIndex: index
            };
        })
        .sort(function(a, b) {

            return (
                (a.date + "T" + a.time)
                .localeCompare(b.date + "T" + b.time)
            );

        });


    if (sessions.length === 0) {

        sessionList.textContent = "No sessions yet 🌸";

        sessionList.className = "empty-calendar";

        return;

    }


    sessionList.className = "";


    sortedSessions.forEach(function(session) {

        // Create card

        let card = document.createElement("div");

        card.className = "session-card";


        // Create information container

        let info = document.createElement("div");

        info.className = "session-info";


        // Session title

        let title = document.createElement("h3");

        title.textContent = "📚 " + session.title;


        // Date

        let date = document.createElement("p");

        date.textContent = "📅 " + session.date;


        // Time

        let time = document.createElement("p");

        time.textContent = "⏰ " + session.time;


        // Delete button

        let deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";

        deleteBtn.className = "delete-session";


        deleteBtn.addEventListener("click", function() {

            sessions.splice(session.originalIndex, 1);

            saveSessions();

            displaySessions();

        });


        // Add elements

        info.appendChild(title);

        info.appendChild(date);

        info.appendChild(time);

        card.appendChild(info);

        card.appendChild(deleteBtn);

        sessionList.appendChild(card);

    });

}


// Add new session

function addSession() {

    let title = sessionTitle.value.trim();

    let date = sessionDate.value;

    let time = sessionTime.value;


    // Check inputs

    if (title === "" || date === "" || time === "") {

        calendarMessage.textContent =
            "Please complete all fields!";

        return;

    }


    // Add session

    sessions.push({

        title: title,

        date: date,

        time: time

    });


    // Save

    saveSessions();


    // Clear inputs

    sessionTitle.value = "";

    sessionDate.value = "";

    sessionTime.value = "";

    calendarMessage.textContent = "";


    // Refresh

    displaySessions();

}


// Button event

addSessionBtn.addEventListener("click", addSession);


// Display saved sessions

displaySessions();
// =============================
// SETTINGS - CHANGE APP NAME
// =============================

let appName = document.getElementById("appName");

let newAppName = document.getElementById("newAppName");

let saveNameBtn = document.getElementById("saveNameBtn");

let settingsMessage = document.getElementById("settingsMessage");


// Load saved name

let savedName = localStorage.getItem("appName");

if (savedName) {
    appName.textContent = savedName;
}


// Save new name

saveNameBtn.addEventListener("click", function() {

    let name = newAppName.value.trim();

    if (name === "") {
        settingsMessage.textContent = "Please enter a name!";
        return;
    }

    appName.textContent = name;

    localStorage.setItem("appName", name);

    settingsMessage.textContent = "Name updated successfully!";

    newAppName.value = "";

});


// =============================
// RESET APPLICATION
// =============================

let resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", function() {

    let confirmation = confirm(
        "Are you sure you want to delete all data?"
    );

    if (confirmation) {

        tasks = [];
        subjects = [];
        sessions = [];

        localStorage.removeItem("tasks");
        localStorage.removeItem("subjects");
        localStorage.removeItem("sessions");

        displayTasks();
        displaySubjects();
        displaySessions();

        alert("All data has been reset!");

    }

});

// SUPABASE CONNECTION

const SUPABASE_URL = "https://thmfplljnfurbnlyorol.supabase.co";
const SUPABASE_KEY = "sb_publishable_LcB-0SKQSrXBoycLUXCTNA_xo8uHGDF";

const db = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Supabase connected!");

// FEEDBACK SYSTEM

const feedbackForm = document.getElementById("feedbackForm");
const feedbackMessage = document.getElementById("feedbackMessage");
const reviewsList = document.getElementById("reviewsList");

async function loadReviews() {

    const { data, error } = await db
        .from("feedback")
        .select("name, comment, rating, created_at")
        .eq("approved", true)
        .order("created_at", { ascending: false });

    if (error) {
        reviewsList.textContent = "Could not load reviews.";
        return;
    }

    reviewsList.innerHTML = "";

    data.forEach(function(review) {

        const card = document.createElement("div");
        card.className = "settings-card";

        const name = document.createElement("h3");
        name.textContent = review.name;

        const stars = document.createElement("p");
        stars.textContent = "⭐".repeat(review.rating);

        const comment = document.createElement("p");
        comment.textContent = review.comment;

        card.appendChild(name);
        card.appendChild(stars);
        card.appendChild(comment);

        reviewsList.appendChild(card);
    });
}

feedbackForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.getElementById("visitorName").value.trim();
    const rating = Number(document.getElementById("visitorRating").value);
    const comment = document.getElementById("visitorComment").value.trim();

    if (name.length < 2 || comment.length < 3) {
        feedbackMessage.textContent = "Please enter valid information.";
        return;
    }

    feedbackMessage.textContent = "Sending...";

    const { error } = await db
        .from("feedback")
        .insert([{
            name: name,
            rating: rating,
            comment: comment
        }]);

    if (error) {
        feedbackMessage.textContent = "Error sending feedback.";
        console.error(error);
        return;
    }

    feedbackMessage.textContent =
        "Thank you! Your feedback is waiting for approval 💗";

    feedbackForm.reset();
});

loadReviews();
