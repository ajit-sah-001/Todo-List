// this code is just to add and show todos <start>

let todoList = JSON.parse(localStorage.getItem("nilam")) || [];

function addTodo() {
    const user = document.getElementById("user").value.trim();
    const Email = document.getElementById("Email").value.trim();
    const work = document.getElementById("Work").value.trim();

    if (user !== "" && Email !== "" && work !== "") {
        todoList.push({ user, email: Email, work });
        localStorage.setItem("nilam", JSON.stringify(todoList));

        document.getElementById("user").value = "";
        document.getElementById("Email").value = "";
        document.getElementById("Work").value = "";

        viewTodos();
    }
}


function viewTodos() {
    const todos = document.getElementById("todos");
    todos.innerHTML = "";

    todoList.forEach((item, index) => {
        const listitem = document.createElement("li");
        listitem.textContent = `${item.user} - ${item.email} - ${item.work}`;
        
        // Button wrapper 
        const btnwrapper = document.createElement("span");

        // Delete button
        const deletebutton = document.createElement("button");
        deletebutton.innerHTML = "<i class='fa fa-trash'></i>";
        deletebutton.setAttribute("onclick", `deleteTodo(${index})`);
        deletebutton.classList.add("delete-btn");

        // Edit button
        const editbutton = document.createElement("button");
        editbutton.innerHTML = "<i class='fa fa-edit'></i>";
        editbutton.setAttribute("onclick", `editTodo(${index})`);
        editbutton.classList.add("edit-btn");

        // Append elements
        listitem.appendChild(btnwrapper);
        btnwrapper.appendChild(editbutton);
        btnwrapper.appendChild(deletebutton);
        todos.appendChild(listitem);
    });

    // Reset input fields
    document.getElementById("user").value = "";
    document.getElementById("Email").value = "";
    document.getElementById("Work").value = "";
}

viewTodos();

function deleteAll() {
    if (confirm("Are you sure?")) {
        localStorage.removeItem("nilam");
        todoList = []; 
        viewTodos();
    }
}


// Add by enter button function
document.getElementById('todo-form').addEventListener("submit", function(e) {
    e.preventDefault();
    addTodo();
});

// Delete single todo function
function deleteTodo(index) {
    todoList.splice(index, 1);
    localStorage.setItem("nilam", JSON.stringify(todoList));
    viewTodos();
}
function editTodo(index) {
    const todos = document.getElementById("todos");
    const listItem = todos.children[index];

    // Get current values
    const { user, email, work } = todoList[index];

    // Clear list item
    listItem.innerHTML = "";

    // Create input fields
    const userInput = document.createElement("input");
    userInput.type = "text";
    userInput.value = user;
    userInput.className = "edit-input";

    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.value = email;
    emailInput.className = "edit-input";

    const workInput = document.createElement("input");
    workInput.type = "text";
    workInput.value = work;
    workInput.className = "edit-input";

    // Save button
    const saveButton = document.createElement("button");
    saveButton.innerHTML = "<i class='fa fa-check'></i>";
    saveButton.className = "save-btn";
    saveButton.addEventListener("click", function () {
        if (userInput.value.trim() && emailInput.value.trim() && workInput.value.trim()) {
            todoList[index] = { user: userInput.value, email: emailInput.value, work: workInput.value };
            localStorage.setItem("nilam", JSON.stringify(todoList));
            viewTodos();
        }
    });

    // Cancel button
    const cancelButton = document.createElement("button");
    cancelButton.innerHTML = "<i class='fa fa-times'></i>";
    cancelButton.className = "cancel-btn";
    cancelButton.addEventListener("click", function () {
        viewTodos();
    });

    // Append elements
    listItem.appendChild(userInput);
    listItem.appendChild(emailInput);
    listItem.appendChild(workInput);
    listItem.appendChild(saveButton);
    listItem.appendChild(cancelButton);
}
