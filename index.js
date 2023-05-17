import { data } from "./data.js";

const selectedItemsContainer = document.getElementById(
  "selected-items-container"
);
const btnContainer = document.getElementById("btn-container");
const totalAmount = document.getElementById("total-amount");
const sendBtn = document.getElementById("send-btn");

let tasks = [];

function addTask(newTask) {
  const existingTask = tasks.find((task) => task.id === newTask.id);
  console.log(existingTask);

  if (!existingTask) {
    tasks.push(newTask);
  }
  renderTasks();
}

function removeTask(taskId) {
  taskId = Number(taskId);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  tasks.splice(taskIndex, 1);
  console.log(taskIndex);
  renderTasks();
}

function renderPage() {
  data.forEach(function (item) {
    btnContainer.innerHTML += `<button class="task-btn" id="${item.id}"> ${item.service}: $${item.price}</button>`;
  });
}

//Create html for the tasks
function renderTasks() {
  let totalPrice = 0;
  let tasksHtml = "";

  for (let task of tasks) {
    tasksHtml += `
      <div class="selected-items-html">
        <p class="selected-item">${task.service}<span data-remove=${task.id} class="remove-btn">remove</span></p>
        <p class="task-cost" id=><span class="dollar-sign">$</span>${task.price}<p>     
      </div>
    `;
    totalPrice += task.price;
  }
  selectedItemsContainer.innerHTML = tasksHtml;
  totalAmount.innerHTML = `$${totalPrice}`;
}

//Event listeners
document.addEventListener("click", function (e) {
  const clickedItem = e.target;

  if (clickedItem.dataset.remove) {
    removeTask(e.target.dataset.remove);
  } else if (clickedItem.classList.contains("task-btn")) {
    addTask(data[clickedItem.id - 1]);
  }
});

sendBtn.addEventListener("click", function () {
  selectedItemsContainer.innerHTML = "";
  totalAmount.innerHTML = `$0`;
  tasks = [];
});

renderPage();
