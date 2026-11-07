let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту"
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");
const form = document.forms.add__form

form.addEventListener("submit", (evt) =>{
	evt.preventDefault()
	let textTask = form.elements.task.value
	if (textTask.length !== 0){
		createItem(textTask)
		items = getTasksFromDOM()
		inputElement.value = ""
		saveTasks(items)
	}else {}	
})

listElement.addEventListener("click", (evt) =>{
	evt.preventDefault()
	let task = evt.target.closest('.to-do__item')
	let textTask = task.querySelector('.to-do__item-text').textContent;
	if (evt.target.classList.contains("to-do__item-button_type_duplicate")){
		createItem(textTask)
		items = getTasksFromDOM()
		saveTasks(items) 
		
	}else if (evt.target.classList.contains("to-do__item-button_type_delete")){
		task.remove()
		localStorage.removeItem(JSON.stringify(textTask))
		items = getTasksFromDOM()
		saveTasks(items) 
		
	}else if (evt.target.classList.contains("to-do__item-button_type_edit")){
		task.querySelector('.to-do__item-text').setAttribute("contenteditable", 'true');
		localStorage.removeItem(JSON.stringify(textTask))
		task.querySelector('.to-do__item-text').focus();   
		task.querySelector('.to-do__item-text').addEventListener("blur", (evt) =>{
			task.querySelector('.to-do__item-text').setAttribute("contenteditable", 'false');
			items = getTasksFromDOM()
			saveTasks(items) 
		})
	}
})





function loadTasks() {
	const list = getTasksFromDOM()
	if (list.length === 0){
		const localList = localStorage.getItem("tasks")
		if (localList){
			JSON.parse(localList).forEach((item) => {
				createItem(item)
			})
			saveTasks(JSON.parse(localList))
		}else {
			items.forEach((item) => {
				createItem(item)
			})
			return items
	}
	}
	
}

function createItem(textTask) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  textElement.textContent = textTask
  listElement.prepend(clone)
}



function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll(".to-do__item-text")
	const tasks = []
	itemsNamesElements.forEach(el => tasks.unshift(el.textContent))
	console.log(tasks)
	return tasks
}

function saveTasks(tasks) {
	localStorage.setItem("tasks", JSON.stringify(tasks))
}

loadTasks()

