# 3d-todo
3d tofo with full animation

📚 StudyFlow -- Interactive Student Study Planner
📌 Project Overview
StudyFlow is a simple and interactive web-based Student Study
Planner designed to help students organize their study tasks and track
their academic progress.
The project is developed as a client-side web application using
HTML, CSS, and JavaScript. No backend or MySQL database is used. Task
information is stored in the browser using LocalStorage, so the data
remains available even after refreshing the page.
The project is designed at a level suitable for a 3rd-year Diploma
minor project and focuses on practical web development concepts.
🎯 Objectives
The main objectives of StudyFlow are:
- To help students organize their study tasks.
- To allow students to set task priorities and due dates.
- To track completed and pending tasks.
- To display overall study progress.
- To provide a clean and interactive user interface.
- To demonstrate the use of JavaScript and browser LocalStorage.
- To apply basic web development concepts in a practical project.
✨ Features
1. Dashboard
The dashboard displays:
- Total number of tasks
- Completed tasks
- Pending tasks
- Overall completion percentage
2. Add Task
Students can add a task by entering:
- Task name
- Subject
- Priority
- Due date
3. Edit Task
Existing tasks can be edited whenever the student wants to update their
information.
4. Delete Task
Individual tasks can be deleted after confirmation.
5. Mark Task as Completed
A task can be marked as completed using the check button.
6. Search and Filter
Users can:
- Search tasks by name or subject.
- Filter tasks by status.
- Filter tasks by priority.
7. Progress Tracking
The application calculates the percentage of completed tasks and
displays it using a progress indicator.
8. Subject Chart
A doughnut chart shows the distribution of tasks according to subjects.
9. Dark Mode
Users can switch between light and dark themes.
The selected theme is also saved in LocalStorage.
10. Study Tips
The dashboard displays study tips to encourage better study planning.
11. Responsive Design
The website is designed to work on:
- Desktop
- Laptop
- Tablet
- Mobile screens
🛠️ Technologies Used
  Technology     Purpose
  HTML5          Structure of the website
  CSS3           Styling, layout and responsive design
  JavaScript     Application logic and interactivity
  LocalStorage   Storing task data in the browser
  Font Awesome   Icons
  Google Fonts   Typography
  AOS.js         Scroll animations
  Typed.js       Animated text effect
  SweetAlert2    User-friendly alerts
  Chart.js       Subject-wise task chart
Database
MySQL is not used in this project.
The application uses LocalStorage because it is a client-side minor
project and does not require a server or multi-user database.
📂 Project Structure
StudyFlow/
│
├── index.html
├── style.css
├── script.js
└── README.md
index.html
Contains the structure of the website, including:
- Navigation bar
- Dashboard
- Task section
- Statistics
- Progress section
- Task form
- Charts
style.css
Contains:
- Website styling
- Layout
- Colors
- Cards
- Buttons
- Modal design
- Dark mode styling
- Responsive design
- Animations
script.js
Contains the main functionality:
- Adding tasks
- Editing tasks
- Deleting tasks
- Completing tasks
- Searching and filtering
- LocalStorage operations
- Progress calculation
- Chart generation
- Dark mode
- Study tips
💾 How LocalStorage Works
StudyFlow stores task information inside the browser.
When a task is added, JavaScript converts the task array into JSON
format and stores it using:
localStorage.setItem(
    "studyFlowTasks",
    JSON.stringify(tasks)
);
When the website loads, the saved information is retrieved using:
let tasks =
    JSON.parse(
        localStorage.getItem("studyFlowTasks")
    ) || [];
This allows tasks to remain available after refreshing the webpage.
🚀 How to Run the Project
Method 1 -- VS Code Live Server
1. Download or copy the project folder.
2. Open the folder in Visual Studio Code.
3. Make sure the files are named:
   - index.html
   - style.css
   - script.js
4. Install the Live Server extension in VS Code if required.
5. Right-click index.html.
6. Select Open with Live Server.
7. The website will open in the browser.
Method 2 -- Direct Browser
The index.html file can also be opened directly in a modern web
browser.
An internet connection is recommended because some UI libraries and
fonts are loaded through CDN links.
🔄 Application Workflow
User opens StudyFlow
        ↓
Dashboard loads
        ↓
User adds a study task
        ↓
JavaScript validates the information
        ↓
Task is stored in LocalStorage
        ↓
Dashboard statistics are updated
        ↓
User can edit / complete / delete task
        ↓
Progress is recalculated
📊 Example Task
Task: Complete Mathematics Chapter 5
Subject: Mathematics
Priority: High
Due Date: 10 October 2026
Status: Pending
After completing the task:
Status: Completed
Progress: Updated automatically
🔐 Data and Privacy
StudyFlow does not send task information to an external server.
The data is stored locally in the browser using LocalStorage.
Therefore:
- No user account is required.
- No MySQL database is required.
- No backend server is required.
- Data is specific to the browser/device being used.
Clearing browser storage can remove the saved task information.
⚠️ Limitations
The current version has some limitations:
1. Data is stored only in the browser.
2. Tasks cannot be synchronized between multiple devices.
3. There is no online user account system.
4. There is no backend server.
5. If browser LocalStorage is cleared, saved tasks may be lost.
These limitations are acceptable because the project is designed as a
small client-side academic project.
🔮 Future Scope
The project can be extended in the future by adding:
- User registration and login
- MySQL or MongoDB database
- Cloud data synchronization
- Multiple user accounts
- Calendar integration
- Pomodoro study timer
- Study streak tracking
- Notifications and reminders
- Online backup
- Mobile application version
🎓 Academic Purpose
This project demonstrates practical knowledge of:
- HTML page structure
- CSS styling
- Responsive web design
- JavaScript DOM manipulation
- JavaScript arrays and objects
- Event handling
- Form handling
- LocalStorage
- JSON data handling
- Basic data filtering
- Dynamic UI updates
- Third-party JavaScript libraries
👩‍💻 Project Type
Minor Project -- Web Development
Project Name: StudyFlow -- Interactive Student Study Planner
Level: 3rd Year Diploma
Development Type: Client-Side Web Application
Database: Not Used
Storage: Browser LocalStorage
