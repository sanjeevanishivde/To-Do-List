const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedContainer = document.getElementById("completed-container");
const errorMessage = document.getElementById("error-message");

function addTask() {
    let taskValue = inputBox.value.trim();
    if (taskValue === '') {
        alert("You must write something!");
        return;
    }
    
    // Check for duplicate tasks
    let tasks = document.querySelectorAll("#list-container li");
    for (let task of tasks) {
        if (task.innerText.replace("\u00d7", "").trim() === taskValue) {
            inputBox.style.border = "2px solid red";
            errorMessage.innerText = "This task already exists!";
            setTimeout(() => {
                inputBox.style.border = "";
                errorMessage.innerText = "";
            }, 2000);
            return;
        }
    }
    
    let li = document.createElement("li");
    li.innerText = taskValue;
    listContainer.appendChild(li);
    
    let span = document.createElement("span");
    span.innerText = "\u00d7";
    li.appendChild(span);
    
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        if (e.target.classList.contains("checked")) {
            completedContainer.appendChild(e.target);
        } else {
            listContainer.appendChild(e.target);
        }
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Allow deletion of completed tasks
completedContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML);
    localStorage.setItem("completedTasks", completedContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("tasks") || "";
    completedContainer.innerHTML = localStorage.getItem("completedTasks") || "";
    
    // Reattach event listeners for removing completed tasks
    let spans = completedContainer.querySelectorAll("span");
    spans.forEach(span => {
        span.addEventListener("click", function() {
            this.parentElement.remove();
            saveData();
        });
    });
}

showTask();
