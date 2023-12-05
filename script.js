let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
//empty array to store tasks
let arrayOfTasks = [];
//check if there is tasks in local storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
  addElementsToPageFrom(arrayOfTasks);
}
// add task
submit.onclick = function () {
  if (input.value != "") {
    // add task to array of tasks
    addTaskToArray(input.value);
    // empty the input
    input.value = "";
  }
};
function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // push task to array of tasks
  arrayOfTasks.push(task);
  //add tasks to page
  addElementsToPageFrom(arrayOfTasks);
  //add tasks to local storage
  addDataToLocalStorage(arrayOfTasks);
}
function addElementsToPageFrom(arrayOfTasks) {
  tasks.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    tasks.appendChild(div);
  });
}
function addDataToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}
tasks.addEventListener("click", (e) => {
  //check delete button
  if (e.target.classList.contains("del")) {
    // remove element from page
    e.target.parentElement.remove();
    // remove task from local storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
  }
  if (e.target.classList.contains("task")) {
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});
function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorage(arrayOfTasks);
}
function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks.completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorage(arrayOfTasks);
}
