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

// この部分を修正
function addTask(task) {
  if (task.trim() === '') {
    return;
  }

  const li = document.createElement('li');
  li.textContent = task;
  li.setAttribute('draggable', 'true'); // この行を追加

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '削除';
  deleteBtn.classList.add('delete-btn');

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// 機能追加：ドラッグで入れ替える
let draggedTask;

taskList.addEventListener('dragstart', (event) => {
  if (event.target.tagName !== 'LI') {
    return;
  }

  draggedTask = event.target;
  event.dataTransfer.setData('text/plain', '');
  event.target.style.opacity = '0.5';
});

taskList.addEventListener('dragover', (event) => {
  event.preventDefault();

  const target = event.target.closest('li');
  if (!target || target === draggedTask) {
    return;
  }

  const bounding = target.getBoundingClientRect();
  const offset = bounding.y + bounding.height / 2;

  if (event.clientY - offset > 0) {
    target.parentElement.insertBefore(draggedTask, target.nextElementSibling);
  } else {
    target.parentElement.insertBefore(draggedTask, target);
  }
});

taskList.addEventListener('dragend', (event) => {
  if (event.target.tagName !== 'LI') {
    return;
  }

  event.target.style.opacity = '';
});
