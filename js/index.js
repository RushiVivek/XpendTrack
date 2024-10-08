import {
    getAuth,
    sendEmailVerification,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import app from "./firebase.js";

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is signed in:", user.email);
        console.log("firebase persistance?", auth);
    } else {
        window.location.replace("login.html");
    }
});

function sendVerificationEmail() {
    const user = auth.currentUser;
    sendEmailVerification(user)
        .then(() => {
            console.log("Verification email sent to", user.email);
        })
        .catch((error) => {
            console.error("Error sending verification email:", error);
        });
}

function isEmailVerified() {
    const user = auth.currentUser;
    if (user) {
        return user.emailVerified;
    } else {
        console.error("No user is signed in.");
        return false;
    }
}

// For side bars
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("main-content");

menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

mainContent.addEventListener("click", () => {
    if (window.innerWidth <= 768 && sidebar.classList.contains("open")) {
        sidebar.classList.remove("open");
    }
});

document.addEventListener("click", (e) => {
    if (
        !menuToggle.contains(e.target) &&
        !sidebar.contains(e.target) &&
        sidebar.classList.contains("open")
    ) {
        sidebar.classList.remove("open");
    }
});
