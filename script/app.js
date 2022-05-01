//Variaveis
let count = 0;
let sum = 0.00;
let countArray = 0;
let positionArray = 0;
let arrayProd = {nome:[], prodValue:[]};

// Seletores
const header = document.querySelector("header");
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const mode = document.querySelector(".btn-mode");
const values = document.querySelector(".values");
const listTotal = document.querySelector(".list-total");
const listBought = document.querySelector(".list-bought");
const listListed = document.querySelector(".list-listed");
const countList = document.querySelector('.count');
const sumTotal = document.querySelector('.total-values');
const modalContainer = document.querySelector('.modal-container');
const modalInput = document.querySelector('.modal-input');
const modalButton = document.querySelector('.modal-button');

// Events
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
mode.addEventListener('click', changeMode);
listTotal.addEventListener('click', verifyList);
listBought.addEventListener('click', verifyList);
listListed.addEventListener('click', verifyList);
modalButton.addEventListener('click', updateValues);

// Functions
// function para adicioar a lista de itens
function addTodo(event){
    
    if (todoInput.value){
        event.preventDefault()
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo);
        if (validateDupl(todoDiv.innerText)){
            saveLocalTodos(todoInput.value);
            const completeButton = document.createElement('button');
            completeButton.innerHTML = '<i class="fa-regular fa-square"></i>';
            completeButton.classList.add('complete-btn');
            const trashButton = document.createElement('button');
            trashButton.innerHTML = '<i class="fas fa-trash"></i>';
            trashButton.classList.add('trash-btn');
            if (header.classList.contains("header-dark")){
                completeButton.classList.add('complete-btn-dark');
                trashButton.classList.add('trash-btn-dark');
                todoDiv.classList.add('todo-dark');
            };
            todoDiv.appendChild(trashButton)
            todoDiv.appendChild(completeButton);
            todoList.appendChild(todoDiv);
            todoInput.value = '';
            count++;
            countList.innerText = 'Total de itens cadastrados: '+ count;
        };
    };
}

//function para validar se houve solicitaçao de exclusão ou o item foi marcado
function deleteCheck(event) {
    const item = event.target;
    const product = event.target.parentElement.children[0].innerText;
    
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        removeLocalTodos(todo);
        todo.remove();
        count--;
        countList.innerText = 'Total de itens cadastrados: '+ count;
        for(let i=0;i<arrayProd.nome.length;i++){
            if (arrayProd.nome[i] == product){
                sum -= parseFloat(arrayProd.prodValue[i]);
                arrayProd.nome[i] = 'X';
                arrayProd.prodValue[i] = 0;
            }
        }
        sumTotal.innerText = parseFloat(sum.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    }
    if (item.classList[0] === "complete-btn") {
        if (item.children[0].className === "fa-solid fa-square"){
            item.children[0].className = "fa-regular fa-square";
            for(let i=0;i<arrayProd.nome.length;i++){
                if (arrayProd.nome[i] == product){
                    sum -= parseFloat(arrayProd.prodValue[i]);
                    arrayProd.nome[i] = 'X';
                    arrayProd.prodValue[i] = 0;
                }
            }
            sumTotal.innerText = parseFloat(sum.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            
        } else {
            item.children[0].className = "fa-solid fa-square";
            modalContainer.classList.add('mostrar');
        }
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        
    }
    arrayProd.nome[countArray] = product;
    
}

//function para salvar LocalStorage
function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

//function para capturar LocalStorage
function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach( (todo) => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo);
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fa-regular fa-square"></i>';
        completeButton.classList.add('complete-btn');
        todoDiv.appendChild(completeButton);
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton)
        todoList.appendChild(todoDiv);
        count++;
    })
    countList.innerText = 'Total de itens cadastrados: '+ count;
}

//function para remover do LocalStorage
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos))
}

//function para alternar entre Dark e Light Mode
function changeMode(){
    const header = document.querySelector("header");
    header.classList.toggle("header-dark");
    const main = document.querySelector("main");
    main.classList.toggle("main-dark");
    const container = document.querySelector(".container");
    container.classList.toggle("container-dark");
    const todoContainer = document.querySelector(".todo-container");    
    todoContainer.classList.toggle("todo-container-dark");
    const formButton = document.querySelector(".todo-button");
    formButton.classList.toggle("todo-button-dark");
    const formInput = document.querySelector("form input");
    formInput.classList.toggle("input-dark");
    const todo = document.querySelectorAll(".todo");
    todo.forEach(element => {
        element.classList.toggle("todo-dark");
    });
    const todoList = document.querySelectorAll('.todo-list');
    todoList.forEach(element =>{
        element.classList.toggle("todo-list-dark");
    });
    const trashDark = document.querySelectorAll(".trash-btn");
    trashDark.forEach(element =>{
        element.classList.toggle("trash-btn-dark");
    });
    const completeDark = document.querySelectorAll(".complete-btn");
    completeDark.forEach(element =>{
        element.classList.toggle("complete-btn-dark");
    });
    const values = document.querySelector(".values");
    values.classList.toggle("values-dark");
    const btnMode = document.querySelector(".btn-mode");
    btnMode.classList.toggle("btn-mode-dark");
    const iMode = document.querySelector('.fa-solid.fa-moon');
    iMode.classList.toggle("fa-sun");
    if (iMode.classList.contains("fa-sun")){
        iMode.innerText = " Light";
    }else{
        iMode.innerText = " Dark";
    };
    const modal = document.querySelector(".modal");
    modal.classList.toggle("modal-dark");
}

//function para listar comprados, todos ou somente os listados. 
function verifyList(event){
    const todo = document.querySelectorAll(".todo");
    if (event.target.classList.contains("list-total")){
        todo.forEach(element => {
            if (element.classList.contains("not-show")){
                element.classList.remove("not-show");  
            }
        });
    }else if (event.target.classList.contains("list-bought")){
        todo.forEach(element => {
            if (!element.classList.contains("completed")){
                element.classList.add("not-show");
            }else{
                element.classList.remove("not-show");  
            } 
        });
    }else{
        todo.forEach(element => {
            if (element.classList.contains("completed")){
                element.classList.add("not-show");
            }else{
                element.classList.remove("not-show");  
            }
            
        });
    }
    
}

function updateValues(event){
    if (modalInput.value) {
        if (modalInput.value > 0){
            if (event.target.classList == 'modal-button'){
                arrayProd.prodValue[countArray] = modalInput.value;
                countArray++;
                sum += parseFloat(modalInput.value);
                sumTotal.innerText = parseFloat(sum.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                modalContainer.classList.remove('mostrar');
                modalInput.value = '';
            }
        }
    }
    
}
//function para validar se já existe item na lista
function validateDupl(todo){
    let todos;
    todos = JSON.parse(localStorage.getItem('todos'));
    if (todos.indexOf(todo) == -1){
        return true;
    }
    return false;    
}