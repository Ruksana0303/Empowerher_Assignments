export function displayTodos(data) {
    let container = document.getElementById("todos-container");
    container.innerHTML = "";

    data.forEach(todo => {
        let div = document.createElement("div");
        div.style.padding = "8px";
        div.style.border = "1px solid #ccc";
        div.style.margin = "5px 0";

        div.innerHTML = `
            <p><b>${todo.title}</b></p>
            <p>Status: ${todo.completed ? "✔ Completed" : "❌ Pending"}</p>
        `;
        container.appendChild(div);
    });
}
