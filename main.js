let elForm = document.querySelector(".todo-form");
let elList = document.querySelector(".todo-list");
let elAllBtn = document.querySelector(".all-btn");
let elCompletedBtn = document.querySelector(".completed-btn");
let elUncompletedBtn = document.querySelector(".uncompleted-btn");

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let filter = 'all'; 

renderTodos(todos);

elForm.addEventListener("submit", function (e) {
    e.preventDefault();
    
    
    let inputValue = e.currentTarget.userTodo.value; 
    let imageFile = e.currentTarget.todoImage.files[0]; 
    
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
    
    e.currentTarget.reset();
    localStorage.setItem("todos", JSON.stringify(todos));

    const imagePreviewDiv = document.getElementById('imagePreview');
    imagePreviewDiv.classList.add('hidden');
});

function addTodo(title, imageUrl) {
    let data = {
        id: todos.length + 1, 
        title: title, 
        image: imageUrl, 
        completed: false 
    };
    todos.push(data);
    saveTodos(); 
    renderTodos(todos); 
}

function renderTodos(arr) {
    elList.innerHTML = ""; 
    
    let filteredTodos = arr.filter(todo => {
        if (filter === 'completed') {
            return todo.completed 
        } 
        else if (filter === 'uncompleted') {
            return !todo.completed
        }
        return true
    });
    
    filteredTodos.forEach((item, index) => {
        let elItem = document.createElement("li");
        elItem.className = `flex items-center justify-between bg-slate-300 p-2 rounded-md`;
        
        elItem.innerHTML = `
        <div class="flex items-center justify-between gap-[8px]">
            <img src="${item.image}" class="max-w-[100px] mt-2 rounded-md">
            <span>${index + 1}.</span>
            <strong>${item.title}</strong>
            <input type="checkbox" ${item.completed ? "checked" : ""} onclick="handleToggleComplete(${item.id})">
            <span class="text-[10px] ${item.completed ? "line-through opacity-[50%] cursor-not-allowed" : ""}">Complete</span>
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
    elUncompletedBtn.lastElementChild.textContent = arr.filter(item => !item.completed).length;

    saveTodos(); 
}


function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}




//delete part
function handleDeleteTodo(id) {
    const findIndex = todos.findIndex(item => item.id == id); 
    todos.splice(findIndex, 1); 
    saveTodos(); 
    renderTodos(todos); 
}
//delete part



// uncomplete part
function handleUncompletedClickBtn() { 
    filter = 'uncompleted';
    renderTodos(todos);
}
// uncomplete part



// update 
function handleUpdateTodo(id) {
    const findObj = todos.find(item => item.id === id); 
    let elNewValue = prompt("Update your todo:", findObj.title); 
    if (elNewValue) {
        findObj.title = elNewValue;
        saveTodos(); 
        renderTodos(todos); 
    }
}
// update


// complete part
function handleToggleComplete(id) {
    const findObj = todos.find(item => item.id === id); 
    findObj.completed = !findObj.completed; 
    saveTodos(); 
    renderTodos(todos); 
}
// complete part


// All part 
function handleAllClickBtn() {
    filter = 'all';
    renderTodos(todos);
}
// All part 



// completed part2
function handleCompletedClickBtn() { 
    filter = 'completed';
    renderTodos(todos);
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



//Delete all part
function handleDeleteAllClickBtn() {
    if (confirm("Hammasini o'chirishingizga aminmisiz?")) { 
        todos = []; 
        saveTodos(); 
        renderTodos(todos); 
    }
}
//Delete all part