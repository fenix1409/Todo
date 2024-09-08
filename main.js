let elForm = document.querySelector(".todo-form");
let elList = document.querySelector(".todo-list");
let elAllBtn = document.querySelector(".all-btn");
let elCompletedBtn = document.querySelector(".completed-btn");
let elUncompletedBtn = document.querySelector(".uncompleted-btn")

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let filter = 'all'; 


renderTodos(todos);

elForm.addEventListener("submit", function (e) {
    e.preventDefault();
    
    let inputValue = e.target.userTodo.value; 
    let imageFile = e.target.todoImage.files[0]; 
    
    if (imageFile) {
        let reader = new FileReader();
        reader.onload = function (event) {
            let imageUrl = event.target.result; 
            addTodo(inputValue, imageUrl); 
        };
        reader.readAsDataURL(imageFile); 
    } else {
        addTodo(inputValue, ""); 
    }
    
    e.target.reset();
    localStorage.setItem("todos", JSON.stringify(todos))
});

function addTodo(title, imageUrl) {
    let data = {
        id: todos.length + 1,
        title: title,
        image: imageUrl
    };
    todos.push(data);
    saveTodos(); 
    renderTodos(todos);
}

function renderTodos(arr) {
    elList.innerHTML = "";
    let filteredTodos = arr.filter(todo => {
        if (filter === 'completed') {
            return todo.completed;
        } 
        else if (filter === 'uncompleted') {
            return !todo.completed; 
        }
        return true;
    });
    
    
    
    filteredTodos.forEach((item, index) => {
        let elItem = document.createElement("li");
        elItem.className = `flex items-center justify-between bg-slate-300 p-2 rounded-md`;
        
        elItem.innerHTML = `
        <div class="flex items-center justify-between gap-[8px]">
            <img src="${item.image}" class="max-w-[100px] mt-2 rounded-md">
            <span>${index + 1}.</span>
            <strong>${item.title}</strong>
            <input type="checkbox" ${item.completed ? "checked line-through opacity-[50%] cursor-not-allowed" : ""} onclick="handleToggleComplete(${item.id})">
            <span class="text-[10px]">Complete</span>
        </div>
        <div class="flex items-center gap-2">
            <button onclick="handleUpdateTodo(${item.id})" class="bg-blue-500 text-white font-semibold p-2 inline-block rounded-md">Update</button>
            <button onclick="handleDeleteTodo(${item.id})" class="bg-red-500 text-white font-semibold p-2 inline-block rounded-md">Delete</button>
        </div>
        `;
        elList.appendChild(elItem);
    });
    
    
    elAllBtn.lastElementChild.textContent = arr.length;
    elCompletedBtn.lastElementChild.textContent = arr.filter(item => item.completed).length;
    elUncompletedBtn.lastElementChild.textContent = arr.filter(item => !item.completed).length
}

// save part
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
// save part



// delete part
function handleDeleteTodo(id){
    const findIndex = todos.findIndex(item => item.id == id)
    todos.splice(findIndex, 1)
    renderTodos(todos)
    localStorage.setItem("todos", JSON.stringify(todos))
}
// delete part



// uncompeleted part
function handleUncompletedClickBtn(id){
    filter = 'uncompleted'
    renderTodos(todos)
}
// uncompeleted part



// update part 
function handleUpdateTodo(id) {
    const findObj = todos.find(item => item.id === id);
    let elNewValue = prompt("Update your todo:", findObj.title);
    if (elNewValue) {
        findObj.title = elNewValue;
        saveTodos(); 
        renderTodos(todos); 
    }
}
// update part 



function handleToggleComplete(id) {
    const findObj = todos.find(item => item.id === id);
    findObj.completed = !findObj.completed; 
    saveTodos(); 
    renderTodos(todos); 
}

// All part 
function handleAllClickBtn() {
    filter = 'all';
    renderTodos(todos);
}
// All part 



// completed part 
function handleCompletedClickBtn(id) {
    filter = 'completed';
    renderTodos(todos);
    localStorage.setItem("todos", JSON.stringify(todos))
}
// completed part 



// image part 
function showImagePreview(event) {
    const imageInput = event.target; 
    const imagePreviewDiv = document.getElementById('imagePreview');
    const selectedImage = document.getElementById('selectedImage');
    
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            selectedImage.src = e.target.result;
            imagePreviewDiv.classList.remove('hidden');
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        imagePreviewDiv.classList.add('hidden');  
    }
}
// image part 