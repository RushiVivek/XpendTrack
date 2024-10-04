import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    sendEmailVerification,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { app } from "./firebase.js";

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

// Compare Password
function compPwd() {
    let confpassword = document.getElementsByClassName("pwd")[1].value;
    let givpassword = document.getElementsByClassName("pwd")[0].value;
    let invalids = document.getElementsByClassName("alert-sys")[0];
    let alert_msg = document.getElementById("alert");

    if (confpassword !== givpassword) {
        alert_msg.textContent = "Passwords doesn't match!";
        invalids.style.display = "flex";
    } else if (givpassword !== "") {
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

// Invalid Email Entry
document.getElementById("signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    compPwd();
});

// add perrsistant login

const auth = getAuth(app);

function createUser(email, password, profile) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            sendEmailVerification(user).then(() => {
                console.log("Verification email sent to", user.email);
            });
            const uid = user.uid;
            console.log("User created with ID:", uid);
        })
        .catch((error) => {
            console.error("Error creating user:", error.message);
        });
}

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

function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log("Signed in as", user.displayName);
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
            console.log("Signed in as", user.displayName);
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
            console.log("Signed in as", user.displayName);
        })
        .catch((error) => {
            console.error("Error signing in with Github:", error);
        });
}
