import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";
import { displayTodos } from "../utils/displayTodos.js";

document.getElementById("navbar").innerHTML = Navbar();
document.getElementById("footer").innerHTML = Footer();

// Check login
if (localStorage.getItem("isLoggedIn") !== "true") {
    alert("Please login first!");
    window.location.href = "login.html";
}

// Fetch Todos
async function fetchTodos() {
    try {
        let res = await fetch("https://jsonplaceholder.typicode.com/todos");
        let data = await res.json();
        displayTodos(data.slice(0, 20)); // Display first 20
    } catch (error) {
        console.log("Error:", error);
    }
}

fetchTodos();
