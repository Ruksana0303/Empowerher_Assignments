// ---- FETCH TODOS ----
async function fetchTodos() {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos = await response.json();

    // Store only first 20
    const first20 = todos.slice(0, 20);
    localStorage.setItem("todos", JSON.stringify(first20));

    renderTodos();
}

// ---- GET STORED TODOS ----
function getStoredTodos() {
    return JSON.parse(localStorage.getItem("todos")) || [];
}

// ---- RENDER TODOS ----
function renderTodos() {
    const todoContainer = document.getElementById("todo-container");
    const todos = getStoredTodos();

    todoContainer.innerHTML = "";

    if (todos.length === 0) {
        todoContainer.innerHTML = "<h3>No Todos Available</h3>";
        return;
    }

    todos.forEach(todo => {
        const div = document.createElement("div");
        div.className = "todo-item";

        div.innerHTML = `
            <span class="${todo.completed ? "completed" : ""}">
                ${todo.title}
            </span>

            <div>
                <button class="toggle-btn" onclick="toggleTodo(${todo.id})">
                    ${todo.completed ? "Undo" : "Complete"}
                </button>

                <button class="delete-btn" onclick="deleteTodo(${todo.id})">
                    Delete
                </button>
            </div>
        `;

        todoContainer.appendChild(div);
    });
}

// ---- DELETE TODO ----
function deleteTodo(id) {
    const todos = getStoredTodos();
    const filtered = todos.filter(todo => todo.id !== id);

    localStorage.setItem("todos", JSON.stringify(filtered));
    renderTodos();
}

// ---- TOGGLE COMPLETE ----
function toggleTodo(id) {
    const todos = getStoredTodos();

    const updated = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });

    localStorage.setItem("todos", JSON.stringify(updated));
    renderTodos();
}

// ---- INITIAL FETCH ----
if (!localStorage.getItem("todos")) {
    fetchTodos();
} else {
    renderTodos();
}
