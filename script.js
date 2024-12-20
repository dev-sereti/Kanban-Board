// Add drag-and-drop functionality
const columns = document.querySelectorAll(".column");

columns.forEach(column => {
  const taskContainer = column.querySelector(".tasks");
  const addTaskBtn = column.querySelector(".add-task-btn");

  // Add task button functionality
  addTaskBtn.addEventListener("click", () => {
    const newTask = createTask("New Task");
    taskContainer.appendChild(newTask);
  });

  column.addEventListener("dragover", dragOver);
  column.addEventListener("dragenter", dragEnter);
  column.addEventListener("dragleave", dragLeave);
  column.addEventListener("drop", dragDrop);
});

function createTask(content) {
  const task = document.createElement("div");
  task.classList.add("task");
  task.setAttribute("draggable", "true");
  task.textContent = content;

  // Drag events
  task.addEventListener("dragstart", dragStart);
  task.addEventListener("dragend", dragEnd);

  // Double-click to edit
  task.addEventListener("dblclick", () => {
    editTask(task);
  });

  return task;
}

let draggedTask = null;

function dragStart() {
  draggedTask = this;
  setTimeout(() => this.style.display = "none", 0);
}

function dragEnd() {
  this.style.display = "block";
  draggedTask = null;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter() {
  this.classList.add("drag-over");
}

function dragLeave() {
  this.classList.remove("drag-over");
}

function dragDrop() {
  this.classList.remove("drag-over");
  const taskContainer = this.querySelector(".tasks");
  taskContainer.appendChild(draggedTask);
}

// Edit task functionality
function editTask(task) {
  const currentContent = task.textContent;
  const input = document.createElement("input");
  input.type = "text";
  input.value = currentContent;
  input.classList.add("editing");
  task.textContent = "";
  task.appendChild(input);

  input.focus();

  input.addEventListener("blur", () => {
    task.textContent = input.value.trim() || currentContent;
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      input.blur();
    }
  });
}
