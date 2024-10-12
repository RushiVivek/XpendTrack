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
        if (user.emailVerified) {
            console.log("User is verified:", user.email);
            document.getElementById("login-email").innerText = user.email;
        } else {
            // document.body.innerHTML = `
            // <h1>Email not verified</h1>
            // <p>
            //     Please verify your email to continue using our services.
            // </p>
            // <p>
            //     Please refresh the page after verifying your email.
            // </p>
            // <div id="message" style="display: hidden">Verification email sent.</div>
            // <button id="verify-email">Send verification email</button>
            // `;
            // const verifyEmail = document.getElementById("verify-email");
            // verifyEmail.addEventListener("click", () => {
            //     sendVerificationEmail();
            //     document.getElementById("message").style.display = "block";
            // });
            // setInterval(() => {
            //     auth.currentUser.reload().then(() => {
            //         if (auth.currentUser.emailVerified)
            //             window.location.reload();
            //     });
            // }, 2000);
        }
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
