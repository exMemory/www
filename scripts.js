const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask(taskInput.value);
  taskInput.value = '';
});

taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    event.target.parentElement.remove();
  } else if (event.target.tagName === 'LI') {
    event.target.classList.toggle('completed');
  }
});

function addTask(task) {
  if (task.trim() === '') {
    return;
  }

  const li = document.createElement('li');
  li.textContent = task;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '削除';
  deleteBtn.classList.add('delete-btn');

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}
