const todo = document.querySelector('#task');
const form = document.querySelector('#todo-form');
const todoList = document.querySelector('#todo-list')

form.addEventListener('submit', function (e) {
  e.preventDefault();
  // check if entered value is not empty, print error message if so
  if (todo.value === '') {
    alert('Your task cannot be empty!');
  } else {
    // create a new element to store the task in ul
    // assign the new task the value entered by the user
    const newTask = document.createElement('li');
    const textContainer = document.createElement('span');
    textContainer.innerText = todo.value;
    textContainer.classList.add('todoText');
    // add a class name to the newly created li
    newTask.classList.add('todo-task');
    newTask.appendChild(textContainer);
    todoList.appendChild(newTask);
    todo.value = '';

    // create the complete and remove task buttons
    const completionBtn = document.createElement('button');
    const removeBtn = document.createElement('button');
    completionBtn.classList.add('completionBtn')
    removeBtn.classList.add('removeBtn')
    completionBtn.innerText = 'completed';
    removeBtn.innerText = 'x';
    // append them to the task
    newTask.append(completionBtn, " ", removeBtn);

    localStorage.setItem('task', JSON.stringify(newTask));
  }
})

// strike out the task if complete has been clicked
// if the x button is clicked, remove it
todoList.addEventListener('click', function (e) {
  if (e.target.innerText === 'completed') {
    const doneTODO = e.target.parentElement.querySelector('.todoText');
    doneTODO.classList.add('completed-todo');
    e.target.remove();
  } else if (e.target.innerText === 'x') {
    e.target.parentElement.remove();
  }
})