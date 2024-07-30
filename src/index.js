import './style.css'; // Import your CSS file

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task.description, task.dueDate, task.priority, task.completed);
    });
}

// Function to add a task to the DOM
function addTaskToDOM(description, dueDate, priority, completed = false) {
    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');
    
    // Create a task display string
    listItem.textContent = `Description: ${description}, Due: ${dueDate}, Priority: ${priority}`;
    if (completed) {
        listItem.classList.add('completed');
    }

    // Create a toggle button for completing the task
    const completeButton = document.createElement('button');
    completeButton.textContent = completed ? 'Undo' : 'Complete';
    completeButton.addEventListener('click', () => {
        listItem.classList.toggle('completed'); // Toggle the completed class
        completeButton.textContent = listItem.classList.contains('completed') ? 'Undo' : 'Complete'; // Change button text
        updateLocalStorage(); // Update local storage after toggling
    });

    // Add a delete button to each task
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(listItem);
        updateLocalStorage(); // Update local storage after deletion
    });

    listItem.appendChild(completeButton);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}

// Function to update local storage
function updateLocalStorage() {
    const tasks = [];
    const taskListItems = document.querySelectorAll('#taskList li');
    taskListItems.forEach(item => {
        const description = item.textContent.split(',')[0].replace('Description: ', '');
        const dueDate = item.textContent.split(',')[1].replace('Due: ', '').trim();
        const priority = item.textContent.split(',')[2].replace('Priority: ', '').trim();
        const completed = item.classList.contains('completed');
        tasks.push({ description, dueDate, priority, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to add a task
function addTask(event) {
    event.preventDefault(); // Prevent form submission

    const description = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('taskDueDate').value;
    const priority = document.getElementById('taskPriority').value;

    // Validate inputs
    if (!description || !dueDate || !priority) {
        alert('Please fill in all fields!');
        return;
    }

    // Add task to the DOM and local storage
    addTaskToDOM(description, dueDate, priority);
    updateLocalStorage(); // Update local storage after adding a new task

    // Clear the form
    document.getElementById('taskForm').reset();
}

// Add event listener to the form
document.getElementById('taskForm').addEventListener('submit', addTask);

// Load tasks from local storage when the page loads
window.onload = loadTasks;

// Log to confirm the script is working
console.log('JavaScript is working');
