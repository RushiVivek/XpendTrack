import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    sendEmailVerification,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
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
        return false;
    } else if (alert_msg.textContent === "Error! Enter email and password") {
        invalids.style.display = "none";
    }
    return true;
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
        return false;
    } else if (alert_msg.textContent === "Passwords doesn't match!") {
        invalids.style.display = "none";
    }
    return true;
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

document
    .getElementById("confirm-password-inp")
    .addEventListener("input", () => {
        compPwd();
    });

document.getElementById("show-pwd-box").addEventListener("click", () => {
    showPassword("pwd");
});

document.getElementById("login-submit").addEventListener("click", () => {
    LoginHit();
});

// todo:
// 1. password length
// 2. email validation
// 3. prexisting email

// Invalid Email Entry
document.getElementById("signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    if (compPwd() && LoginHit()) {
        if (document.getElementById("remember").checked) {
            setPersistence(auth, browserLocalPersistence).then(() => {
                createUser(
                    document.getElementById("email-inp").value,
                    document.getElementsByClassName("pwd")[0].value
                );
            });
        } else {
            setPersistence(auth, browserSessionPersistence).then(() => {
                createUser(
                    document.getElementById("email-inp").value,
                    document.getElementsByClassName("pwd")[0].value
                );
            });
        }
    }
});

document.getElementById("google-signin").addEventListener("click", () => {
    let invalids = document.getElementsByClassName("alert-sys")[0];
    invalids.style.display = "none";
    setPersistence(auth, browserLocalPersistence).then(() => {
        signInWithGoogle();
    });
});

document.getElementById("github-signin").addEventListener("click", () => {
    let invalids = document.getElementsByClassName("alert-sys")[0];
    invalids.style.display = "none";
    setPersistence(auth, browserLocalPersistence).then(() => {
        signInWithGithub();
    });
});

const auth = getAuth(app);

function createUser(email, password, target = "index.html") {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            sendEmailVerification(user).then(() => {
                console.log("Verification email sent to", user.email);
            });
            const uid = user.uid;
            console.log("User created with ID:", uid);
            window.location.replace(target);
        })
        .catch((error) => {
            console.error("Error creating user:", error);
            if (error.code === "auth/email-already-in-use") {
                let invalids = document.getElementsByClassName("alert-sys")[0];
                let alert_msg = document.getElementById("alert");
                alert_msg.textContent = "Email already in use!";
                invalids.style.display = "flex";
            } else if (error.code === "auth/weak-password") {
                let invalids = document.getElementsByClassName("alert-sys")[0];
                let alert_msg = document.getElementById("alert");
                alert_msg.textContent = "Password is too weak!";
                invalids.style.display = "flex";
            } else if (error.code === "auth/invalid-email") {
                let invalids = document.getElementsByClassName("alert-sys")[0];
                let alert_msg = document.getElementById("alert");
                alert_msg.textContent = "Invalid Email!";
                invalids.style.display = "flex";
            } else {
                let invalids = document.getElementsByClassName("alert-sys")[0];
                let alert_msg = document.getElementById("alert");
                alert_msg.textContent = "Error creating user!";
                invalids.style.display = "flex";
            }
        });
}

function signInWithGoogle(target = "index.html") {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log("Signed in as", user.displayName);
            window.location.replace(target);
        })
        .catch((error) => {
            console.error("Error signing in with Google:", error);
        });
}

function signInWithGithub(target = "index.html") {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log("Signed in as", user.displayName);
            window.location.replace(target);
        })
        .catch((error) => {
            console.error("Error signing in with Github:", error);
        });
}
