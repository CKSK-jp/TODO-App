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
    const removeBtn = document.createElement('button');
    completionBtn.classList.add('completionBtn')
    removeBtn.classList.add('removeBtn')
    completionBtn.innerText = 'completed';
    removeBtn.innerText = 'x';
    // append them to the task
    newTask.append(completionBtn, " ", removeBtn);
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
    // create a new task object
    const taskObject = {
      text: taskInput.value,
      completed: false,
    };

    // add task to task object array
    tasks.push(taskObject);
    // store tasks into local storage
    localStorage.setItem('task', JSON.stringify(tasks));
    // update new tasks to render
    renderTasks();
    taskInput.value = '';
  }
})

// strike out the task if complete has been clicked
todoList.addEventListener('click', function (e) {
  if (e.target.innerText === 'completed') {
    const doneTODO = e.target.parentElement.querySelector('.todoText');
    doneTODO.classList.add('completed-task'); // this line will add the strike out css class
    e.target.remove();

    // if the x button is clicked, remove it
  } else if (e.target.innerText === 'x') {
    e.target.parentElement.remove();
  }
})


