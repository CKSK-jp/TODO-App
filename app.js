const taskInput = document.querySelector('#task-input');
const form = document.querySelector('#todo-form');
const todoList = document.querySelector('#todo-list')

// Retrieve any tasks from localStorage on page load
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks onto page
function renderTasks() {
  todoList.innerHTML = ''; // clear any existing tasks

  // build each task
  tasks.forEach(function (taskObject) {
    const newTask = document.createElement('li');
    const textContainer = document.createElement('span');

    // store taskInput into span element and add appropriate class names
    textContainer.innerText = taskObject.text;
    textContainer.classList.add('todoText');
    newTask.classList.add('todo-task');
    newTask.appendChild(textContainer);
    todoList.appendChild(newTask);

    // create the complete and remove task buttons
    const completionBtn = document.createElement('button');
    completionBtn.innerText = 'completed';
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'x';
    completionBtn.classList.add('completionBtn');
    removeBtn.classList.add('removeBtn');

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

//Handle actions after user submits a new task
form.addEventListener('submit', function (e) {
  e.preventDefault();
  // check if entered value is not empty, print error message if so
  if (taskInput.value === '') {
    alert('Your task cannot be empty!');
  } else {
    // create a new task object with text and completed properties
    const taskObject = {
      text: taskInput.value,
      completed: false,
    };

    // add task to task object array
    tasks.push(taskObject);
    // store tasks into local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // update new tasks to render
    renderTasks();
    taskInput.value = '';
  }
})

// strike out the task if complete has been clicked
todoList.addEventListener('click', function (e) {
  let targettedTask = e.target;
  let doneTODO = targettedTask.parentElement.querySelector('span');

  if (targettedTask.innerText === 'completed') {
    doneTODO.classList.add('completed-task'); // this line will add the strike out css class
    // now we want to check our tasks and find the task clicked on.
    const taskObject = tasks.find(function(task) {
      return task.text === doneTODO.innerText;
    });
    // set completed property to true and store
    taskObject.completed = true;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    targettedTask.remove();

    // if the x button is clicked, remove it
  } else if (e.target.innerText === 'x') {
    targettedTask.parentElement.remove();
    //find the index of the removed task and remove it from localStorage
    const taskIndex = tasks.findIndex(function(task) {
      return task.text === doneTODO.innerText;
    });

    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
})