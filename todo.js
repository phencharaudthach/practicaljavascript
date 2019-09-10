var todoList = {
    todos: [],
addTodo: function (todoText){
    this.todos.push({
        todoText: todoText,
        completed: false
    });
    this.displayTodos();
},
changeTodo: function (position, todoText){
    this.todos[position].todoText = todoText;
    this.displayTodos();
},
deleteTodo: function (position){
    this.todos.splice(position, 1);
    this.displayTodos();
},
toggleCompleted: function(position){
    var todo = this.todos[position];
    todo.completed = !todo.completed;
    this.displayTodos();
},
toggleAll: function(){
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    //Get number of completed todos.
    this.todos.forEach(function(todo){
    if (todo.completed === true){
    completedTodos++;
    }
    });
    this.todos.forEach(function(todo){
    //Case 1: If everything's true, make everything false.
    if (completedTodos === totalTodos){
            todo.completed = false;
        // Case 2: Otherwise, make everything true.
    } else {
            todo.completed = true;
        }
    });
}
};

var handlers = {
    addTodo: function() {
        var addTodoTextInput = document.getElementById('addToTextInput');
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = '';
        view.displayTodos();
    },
    changeTodo: function() {
        var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
        var changeTodoTextInput = document.getElementById('changeTodoTextInput');
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoPositionInput.value = '';
        changeTodoTextInput.value = '';
        view.displayTodos();
    },
    deleteTodo: function(position){
        todoList.deleteTodo(position);
        view.displayTodos();
    },
    toggleCompleted: function() {
        var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
        todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
        this.toggleCompletedPositionInput.value = '';
        view.displayTodos();
    },
    toggleAll: function(){
        todoList.toggleAll();
        view.displayTodos();
    }
};

var view = {
    displayTodos: function(){
        var todosUl = document.querySelector('ul');
        todosUl.innerHTML = '';
        // for (var i = 0; i < todoList.todos.length; i++){
        //     var todoLi = document.createElement('li');
        //     var todo = todoList.todos[i];
        //     var todoTextWithCompletion = '';

        //     if (todo.completed === true){
        //         todoTextWithCompletion = '(x) ' + todo.todoText; 
        //     } else {
        //         todoTextWithCompletion = '() ' + todo.todoText;
        //     }
        //     todoLi.id = i;
        //     todoLi.textContent = todoTextWithCompletion;
        //     todoLi.appendChild(this.createDeleteButton());
        //     todosUl.appendChild(todoLi);
        // }
        
        this // refers to the view object
        forEach(callback, this)

        todoList.todos.forEach(function(todo, position){
            var todoLi = document.createElement('li');
            var todoTextWithCompletion = '';

            if (todo.completed === true){
                todoTextWithCompletion = '(x) ' + todo.todoText; 
            } else {
                todoTextWithCompletion = '() ' + todo.todoText;
            }
            todoLi.id = position;
            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(this.createDeleteButton());
            todosUl.appendChild(todoLi);
        }, this);
    },
    createDeleteButton: function() {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.className = 'deleteButton';
        return deleteButton;
    },
    setUpEventListeners: function() {
        var todosUl = document.querySelector('ul');

        todosUl.addEventListener('click', function(event){
    // Get the element that was clicked on.
         var elementClicked = event.target;

    //Check if elementClicked is a delete button.
        if (elementClicked.className === "deleteButton"){
         handlers.deleteTodo(parseInt(elementClicked.parantNode.id));
        }
        });
    }
};

view.setUpEventListeners();