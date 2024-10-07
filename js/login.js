import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    sendEmailVerification,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import app from "./firebase.js";

function LoginHit() {
    let username = document.getElementById("email-inp");
    let password = document.getElementsByClassName("pwd")[0];
    let invalids = document.getElementsByClassName("alert-sys")[0];
    let alert_msg = document.getElementById("alert");
    let email_input = username.value;
    let pass_input = password.value;

    if (email_input === "" || pass_input === "") {
        alert_msg.textContent = "Error! Enter email and password";
        invalids.style.display = "flex";
    } else {
        invalids.style.display = "none";
    }
}

function showPassword(cla) {
    for (const x of document.getElementsByClassName(cla)) {
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }
}

document.getElementById("show-pwd-box").addEventListener("click", () => {
    showPassword("pwd");
});

document.getElementById("login-submit").addEventListener("click", () => {
    LoginHit();
});

// Invalid Email Entry
document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
});

// add perrsistant login

const auth = getAuth(app);

function logIn(email, password, target="index.html") {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User signed in:", user.email);
            window.location.replace(target);
        })
        .catch((error) => {
            console.error("Error signing in:", error);
        });
}

function forgotPassword(email) {
    sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log("Password reset email sent to", email);
        })
        .catch((error) => {
            console.error("Error sending password reset email:", error);
        });
}

function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log("User signed in:", user.displayName);
        })
        .catch((error) => {
            console.error("Error signing in with Google:", error);
        });
}

function signInWithFacebook() {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log("User signed in:", user.displayName);
        })
        .catch((error) => {
            console.error("Error signing in with Facebook:", error);
        });
}

function signInWithGithub() {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log("User signed in:", user.displayName);
        })
        .catch((error) => {
            console.error("Error signing in with Github:", error);
        });
}
