const taskInput = $('#task-input');
const form = $('form');
const todoList = $('#todo-list');
let tasks = null;
let uniqueId = 0;

// Retrieve any tasks from localStorage on page load, error if invalid JSON
try {
  tasks = JSON.parse(localStorage.getItem('tasks'));
} catch (error) {
  console.error('Error parsing tasks from localStorage:', error);
}

let currentTasks = tasks !== null ? [...tasks] : [];

form.on('submit', function (e) {
  e.preventDefault();
  createTask(taskInput.val());
  taskInput.val('');
});

// add this new task object to our tasks array and store it into localStorage
function createTask(text) {
  const taskObject = {
    taskId: uniqueId++,
    text,
    completed: false,
  };
  currentTasks.push(taskObject);
  localStorage.setItem('tasks', JSON.stringify(currentTasks));
  renderTasks();
}

// Render tasks onto page
function renderTasks() {
  todoList.empty();

  currentTasks.forEach((taskObject) => {
    const newTask = ($('<li>')).addClass(`todo-task ${taskObject.taskId}`).appendTo(todoList);
    const taskText = $(`<span>${taskObject.text}</span>`).appendTo(newTask);
    const completeBtn = $('<button>completed</button>').addClass('complete-btn');
    const removeBtn = $('<button>x</button>').addClass('remove-btn');

    if (taskObject.completed) {
      taskText.addClass('completed-task');
      removeBtn.appendTo(newTask);
    } else {
      completeBtn.appendTo(newTask);
      removeBtn.appendTo(newTask);
    }
  });

  $('.todo-list button').on('click', function () {
    const thisTaskID = $(this).parent().attr('class').split(' ')[1];
    if ($(this).hasClass('complete-btn')) {
      $(this).siblings('span').toggleClass('completed-task');
      handleCompletion(thisTaskID);
    } else {
      handleRemoval(thisTaskID, $(this).parent());
    }
  });
}

renderTasks();

// handles for updating the task list when button clicked
function handleCompletion(selectedTask) {
  const taskObject = currentTasks.find((task) => task.taskId.toString() === selectedTask);
  taskObject.completed = true;
  localStorage.setItem('tasks', JSON.stringify(currentTasks));
  renderTasks();
}

function handleRemoval(selectedTask, targettedTask) {
  targettedTask.remove();
  const taskIndex = currentTasks.findIndex((task) => task.taskId.toString() === selectedTask);
  if (taskIndex !== -1) {
    currentTasks.splice(taskIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(currentTasks));
  }
}