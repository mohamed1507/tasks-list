// define ui vars

let form = document.querySelector('#task-form')
let taskList = document.querySelector('.collection')
let clearBtn = document.querySelector('.clear-tasks')
let filter = document.querySelector('#filter')
let taskInput = document.querySelector('#task')

// load all event listeners
loadEventListeners()
function loadEventListeners() {
    // dom load event
    document.addEventListener('DOMContentLoaded', getTasks)

    // add task event
    form.addEventListener('submit', addTask)
    // remove task event
    taskList.addEventListener('click', removeTask)

    // clear task event
    clearBtn.addEventListener('click', clearTasks)
    // filter tasks
    filter.addEventListener('keyup', filterTasks)
}

// get tasks from ls 
function getTasks() {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function (task) {
        // create li element
        let li = document.createElement('li')
        // add class
        li.className = 'collection-item'

        // text node & append to li 
        li.appendChild(document.createTextNode(task))
        // create link element
        let link = document.createElement('a')
        // add class to a 
        link.className = 'delete-item secondary-content'
        // add icon 
        link.innerHTML = '<i class="fa fa-remove"></i>'
        // append link to li
        li.appendChild(link)
        // append li to ul 
        taskList.appendChild(li)
    })
}
// add tasks 
function addTask(e) {
    if (taskInput.value === "") {
        alert('add a task')
    }
    // create li element
    let li = document.createElement('li')
    // add class
    li.className = 'collection-item'

    // text node & append to li 
    li.appendChild(document.createTextNode(taskInput.value))
    // create link element
    let link = document.createElement('a')
    // add class to a 
    link.className = 'delete-item secondary-content'
    // add icon 
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // append link to li
    li.appendChild(link)
    // append li to ul 
    taskList.appendChild(li)
    // store in local storage
    storeInLocalStorage(taskInput.value)
    // clear input 
    taskInput.value = ""

    e.preventDefault()
}
// store task
function storeInLocalStorage(task) {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {

        if (confirm('are you sure?')) {
            e.target.parentElement.parentElement.remove()
            // remove from ls 
            removeFromLocalStorage(e.target.parentElement.parentElement)
        }

    }


}
// remove from ls 
function removeFromLocalStorage(taskItem) {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1)

        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// clear tasks
function clearTasks() {
    taskList.innerHTML = ''

    // clear from ls
    function clearFromLocalStorage() {
        localStorage.clear()
    }
}
// filter tasks
function filterTasks(e) {
    let text = e.target.value.toLowerCase()
    document.querySelectorAll('.collection-item').forEach(function (task) {
        let item = task.firstChild.textContent

        if (item.toLocaleLowerCase().indexOf(text) != -1) {
            task.style.display = 'block'
        } else {
            task.style.display = 'none'
        }
    })


}

