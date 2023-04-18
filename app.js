const taskInput = document.getElementById("new-task"); //Add a new task.
const addButton = document.getElementsByTagName("button")[0]; //first button
const incompleteTaskHolder = document.getElementById("incomplete-tasks"); //ul of #incompleteTasks
const completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//New task list item
const createNewTaskElement = function (taskString) {
  let listItem = document.createElement("li");
  let checkBox = document.createElement("input");
  let label = document.createElement("label");
  let editInput = document.createElement("input");
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");
  let deleteButtonImg = document.createElement("img");

  listItem.className = "task__item";
  listItem.classList.add("task__item");
  label.innerText = taskString;
  label.className = "task__label";

  checkBox.type = "checkbox";
  checkBox.className = "task__checkbox";

  editInput.type = "text";
  editInput.className = "task__input";
  editInput.value = label.innerText;

  editButton.innerText = "Edit";
  editButton.className = "btn";
  editButton.className = "btn--edit";

  deleteButton.className = "btn";
  deleteButton.className = "btn--delete";
  deleteButtonImg.className = "btn__image";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

//Create a new list item with the text from the #new-task:
const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}

//Edit an existing task.
const editTask = function () {
  let listItem = this.parentNode;
  let editInput = listItem.querySelector(".task__input");
  let label = listItem.querySelector(".task__label");
  let editBtn = listItem.querySelector(".btn--edit");
  let containsClass = listItem.classList.contains(".task__item--edit");

  if (containsClass) {
    label.classList.add('task__label--edit');
    editInput.classList.add('task__input--edit');
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  } else {
    label.classList.remove('task__label--edit');
    editInput.classList.remove('task__input--edit');
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  }

  listItem.classList.toggle(".task__item--edit");
};

//Delete task.
const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
}

//Mark task completed
const taskCompleted = function () {
  let listItem = this.parentNode;
  let label = listItem.querySelector(".task__label");
  label.classList.toggle('task__label--complete');
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function () {
  let listItem = this.parentNode;
  let label = listItem.querySelector(".task__label");
  label.classList.toggle('task__label--complete');
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  let checkBox = taskListItem.querySelector(".task__checkbox");
  let editButton = taskListItem.querySelector(".btn--edit");
  let deleteButton = taskListItem.querySelector(".btn--delete");
  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
