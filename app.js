const taskInput = document.querySelector('#task-input');
const form = document.querySelector('#todo-form');
const todoList = document.querySelector('#todo-list')
let tasks = [];

// Retrieve any tasks from localStorage on page load, error if invalid JSON
try {
  tasks = JSON.parse(localStorage.getItem('tasks'));
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
    // run addTask to create the task
    addTask(taskInput.value);
    taskInput.value = '';
  }
});

// add this new task object to our tasks array and store it into localStorage
function addTask(text) {
  if (!tasks) {
    tasks = [];
  }
  // to account for dupe textInputs, append unique timestamp to text property
  const timestamp = new Date().toLocaleTimeString();
  const uniqueText = `${text} - ${timestamp}`;
  // build task object
  const taskObject = {
    text: uniqueText,
    completed: false,
  };
  tasks.push(taskObject);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  // render newly made task
  renderTasks();
}

// Render tasks onto page
function renderTasks() {
  todoList.innerHTML = ''; // clear any existing tasks

  // only run if task storage is not empty
  if (tasks !== null) {
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
}

// Initialize render tasks on page load
renderTasks();

// Strike out the task if complete has been clicked
document.addEventListener('click', function (e) {
  let targettedTask = e.target;
  let doneTODO = targettedTask.parentElement.querySelector('span');

  if (e.target.classList.contains('completionBtn')) {
    handleCompletion(doneTODO, targettedTask);
    doneTODO.classList.add('completed-task');
  } else if (e.target.classList.contains('removeBtn')) {
    handleRemoval(doneTODO, targettedTask);
    doneTODO.classList.add('completed-task');
  }
});

// find the associated task using text property
function handleCompletion(doneTODO, targettedTask) {
  const taskObject = tasks.find(function (task) {
    return task.text === doneTODO.innerText;
  });
  taskObject.completed = true;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  targettedTask.remove();
  renderTasks();
}

function handleRemoval(doneTODO, targettedTask) {
  targettedTask.parentElement.remove();
  const taskIndex = tasks.findIndex(function (task) {
    return task.text === doneTODO.innerText;
  });

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}