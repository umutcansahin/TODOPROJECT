//Selecting elements
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){  //All listeners

    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);

}

function clearAllTodos(e){

    //Remove TODO's from the UI

    if(confirm("Are you sure about the delete all?")){
       // todoList.innerHTML = ""; //Slow way

    while(todoList.firstElementChild != null){

       
       todoList.removeChild(todoList.firstElementChild);
    }
        deleteAllTodosFromStorage();
    }


}

function deleteAllTodosFromStorage(){
    localStorage.removeItem("todos");
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

listItems.forEach(function(listItem){

    const text = listItem.textContent.toLocaleLowerCase();
    if(text.indexOf(filterValue) === -1){
        //Can't finde
        listItem.setAttribute("style","display :none !important");
    }else{
        listItem.setAttribute("Style","display : block");
    }

});

}

function deleteTodo(e){
   if(e.target.className === "fa fa-remove"){
    let todo = e.target.parentElement.parentElement.textContent;
    e.target.parentElement.parentElement.remove();
    showAlert("success","Todo Deleted!");
    deleteTodoFromStorage(todo);
   
   }
}

function deleteTodoFromStorage(deleteTodo){

    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){

        if(todo === deleteTodo){
            todos.splice(index,1);
        }

    });

    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}

function addTodo(e){
        const newTodo = todoInput.value.trim();

        if(newTodo === ""){
            showAlert("danger","Please Enter a Todo.");
        }else{
            showAlert("success","Todo Added!");
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        }



    e.preventDefault();
}

function addTodoToUI(newTodo){
   

    //Create List item
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";
    
    //Create Link
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    //Text Node
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //Add to todolist listItem
    todoList.appendChild(listItem);
    todoInput.value = "";
   
}

function showAlert(type,message){
   /*  <div class="alert alert-danger" role="alert">
  This is a danger alert—check it out!
</div> */
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alert.role = "alert";

       

        firstCardBody.appendChild(alert);

        //setTimout
        setTimeout(function(){
            alert.remove();
        },1000);

        
    
        
        
 
}

function getTodosFromStorage(){

    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

/* window.addEventListener("load",function(){

    let todos = getTodosFromStorage();
    todos.forEach(element => {
        addTodoToUI(element);
    });

});
 */
