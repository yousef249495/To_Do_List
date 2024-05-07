let input = document.querySelector('[type="text"]')
let submit = document.querySelector('[type="submit"]')
let result = document.querySelector(".tasks")
let arrayOfTasks = []

// Checking if there previous tasks in Local Storage
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
    addElementstoPageFrom(arrayOfTasks)
}


// getTasksFromLocalStorage()


// Add Task On Click
submit.onclick = () => {
    if (input.value !== "") {
        addTasksToArray(input.value)
        input.value = ""
    }
}

// Delete Task On Click
result.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        //  Remove Task From Local Storage
        let id = e.target.parentElement.getAttribute("data-id")
        RemoveFromLocalStorageBy(id)
        // Remove Element From Page
        e.target.parentElement.remove()
    }
    if (e.target.classList.contains("task")) {
        // Change Task Status From completed to not and vice versa
        toggleStatusOfTask(e.target.getAttribute("data-id"))

        // Adding Opacity Effect
        e.target.classList.toggle("done")
    }
})

let clear = document.querySelector(".form .clearAll")

// Clear All Tasks On Click
clear.onclick = () => {
    // Clear Tasks From The Page
    result.innerHTML = ""

    // Clear Tasks From Tasks' Array
    arrayOfTasks = []

    // Clear Tasks From Local Storage
    window.localStorage.clear()
}

function addTasksToArray(newTask) {
    const task = {
        id: Date.now(),
        title: newTask,
        compeleted: false
    }
    // Adding Tasks to array
    arrayOfTasks.push(task)

    // Adding Tasks to page
    addElementstoPageFrom(arrayOfTasks)

    // Adding Tasks to Local Storage
    addTasksToLocalStorageFrom(arrayOfTasks)
}

function addElementstoPageFrom(arrayOfTasks) {
    // avoiding repetition
    result.innerHTML = ""
    // adding tasks to page by looping
    arrayOfTasks.forEach((task) => {
        // Create main div
        let div = document.createElement("div")
        div.className = "task"

        // Checking if Completed Or Not
        if (task.compeleted) div.className = "task done"

        // Continue Creating Main Div
        div.setAttribute("data-id", task.id)
        div.appendChild(document.createTextNode(task.title))
        // Create Delete Button
        let btn = document.createElement("button")
        btn.className = "del"
        btn.appendChild(document.createTextNode("Delete"))
        // Adding button to Task Div
        div.appendChild(btn)
        // Final Step to Show Tasks in Window
        result.appendChild(div)
    })

}

function addTasksToLocalStorageFrom(arrayOfTasks) {
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}

function getTasksFromLocalStorage() {
    let data = window.localStorage.getItem("tasks")
    if (data) {
        let tasks = JSON.parse(data)
        addElementstoPageFrom(tasks)
    }
}

function RemoveFromLocalStorageBy(id) {
    // For Testing
    // for (let i = 0; i < arrayOfTasks.length; i++) {
    //   if (id === `${arrayOfTasks[i].id}`) {
    //     console.log(`id === ${arrayOfTasks[i].id}`)
    //   }
    // }

    // Filter Array of tasks from the chosen ID
    arrayOfTasks = arrayOfTasks.filter((e) => e.id != id)
    // Adding The New Tasks After Filtering to local Storage
    addTasksToLocalStorageFrom(arrayOfTasks)
}

function toggleStatusOfTask(taskId) {
    // Toggle The Status of Task
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (taskId === `${arrayOfTasks[i].id}`) {
            arrayOfTasks[i].compeleted === false ? arrayOfTasks[i].compeleted = true : arrayOfTasks[i].compeleted = false
            console.log(arrayOfTasks[i].compeleted)
        }
    }
    addTasksToLocalStorageFrom(arrayOfTasks)
}