import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";

document.getElementById("navbar").innerHTML = Navbar();
document.getElementById("footer").innerHTML = Footer();

document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();

    let savedUser = JSON.parse(localStorage.getItem("user"));
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!savedUser) {
        alert("No user found, please signup first!");
        return;
    }

    if (email === savedUser.email && password === savedUser.password) {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "todos.html";
    } else {
        alert("Invalid credentials!");
    }
});
