const taskInput = document.querySelector('#task-input');
const form = document.querySelector('#todo-form');
const todoList = document.querySelector('#todo-list')

// Retrieve any tasks from localStorage on page load, error if invalid JSON
try {
  tasks = JSON.parse(localStorage.getItem('tasks')) || [];
} catch (error) {
  console.error('Error parsing tasks from localStorage:', error);
}

// Handle actions after user submits a new task
form.addEventListener('submit', function (e) {
  e.preventDefault();
  // Check if entered value is not empty, print error message if so
  if (taskInput.value === '') {
    alert('Your task cannot be empty!');
  } else {
    // Create a new task object with properties, text & completed
    const taskObject = {
      text: taskInput.value,
      completed: false,
    };

    // add this new task object to our tasks array and store it into localStorage
    tasks.push(taskObject);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    // Render tasks and reset user input
    renderTasks();
    taskInput.value = '';
  }
});

// Render tasks onto page
function renderTasks() {
  todoList.innerHTML = ''; // clear any existing tasks
  
  // Build each task
  tasks.forEach(function (taskObject) {
    const newTask = document.createElement('li');
    const textContainer = document.createElement('span');

    // Store taskInput into span element and add appropriate class names
    textContainer.innerText = taskObject.text;
    textContainer.classList.add('todoText');
    newTask.classList.add('todo-task');
    newTask.appendChild(textContainer);
    todoList.appendChild(newTask);

    // Create the complete and remove task buttons
    const completionBtn = document.createElement('button');
    completionBtn.innerText = 'completed';
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'x';
    completionBtn.classList.add('completionBtn');
    removeBtn.classList.add('removeBtn');

    // Check if a stored task has been completed, if so load the page with that class and the corresponding class to strike out the text, otherwise append both buttons to task.
    if (taskObject.completed) {
      textContainer.classList.add('completed-task');
      newTask.append(removeBtn);
    } else {
      newTask.append(completionBtn, " ", removeBtn);
    }
  });
}

// Initialize render tasks on page load
renderTasks();

// Strike out the task if complete has been clicked
todoList.addEventListener('click', function (e) {
  let targettedTask = e.target;
  let doneTODO = targettedTask.parentElement.querySelector('span');

  if (targettedTask.innerText === 'completed') {
    doneTODO.classList.add('completed-task');
    // Now we want to check our tasks and find the task clicked on.
    const taskObject = tasks.find(function(task) {
      return task.text === doneTODO.innerText;
    });
    // Set completed property to true and store
    taskObject.completed = true;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    targettedTask.remove();

    // If the x button is clicked, remove it
  } else if (e.target.innerText === 'x') {
    targettedTask.parentElement.remove();
    // Find the index of the removed task and remove it from localStorage
    const taskIndex = tasks.findIndex(function(task) {
      return task.text === doneTODO.innerText;
    });

    // Check if findIndex gets the matching array, remove queried index from tasks. Update to sync tasks with this removal change
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
});