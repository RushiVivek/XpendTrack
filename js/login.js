function LoginHit() {
    let username = document.getElementById("email-inp");
    let password = document.getElementsByClassName("pwd")[0];
    let invalids = document.getElementsByClassName("alert-sys")[0];
    let alert_msg = document.getElementById("alert");
    let email_input = username.value;
    let pass_input = password.value;

    if (email_input === "" || pass_input === "") {
        alert_msg.textContent = "Error! Enter email and password";
        if (invalids.style.display == "none" || invalids.style.display == "")
            invalids.style.display = "flex";
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

// add perrsistant login

// change chesta
async function createUser(email, password, profile) {
    try {
        const userCredential = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Send verification email
        await user.sendEmailVerification();
        console.log("Verification email sent to", user.email);

        // Create user document in Firestore
        const uid = user.uid;
        await db.collection("users").doc(uid).set(profile);
        console.log("User created with ID:", uid);

        return uid;
    } catch (error) {
        console.error("Error creating user:", error);
    }
}

// idi kuda
async function deleteUser(uid) {
    try {
        const user = auth.currentUser;
        if (user && user.uid === uid) {
            await db.collection("users").doc(uid).delete();

            await user.delete();

            console.log("User deleted:", uid);
        } else {
            console.error("Cannot delete user:", uid);
        }
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}

async function updateEmail(newEmail) {
    try {
        const user = firebase.auth().currentUser;
        await user.updateEmail(newEmail);
        console.log("Email updated for user", user.uid);
    } catch (error) {
        console.error("Error updating email:", error);
    }
}

async function updatePassword(oldPassword, newPassword) {
    try {
        const user = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            oldPassword
        );
        await user.reauthenticateWithCredential(credential);
        await user.updatePassword(newPassword);
        console.log("Password updated for user", user.uid);
    } catch (error) {
        console.error("Error updating password:", error);
    }
}

async function forgotPassword(email) {
    try {
        await firebase.auth().sendPasswordResetEmail(email);
        console.log("Password reset email sent to", email);
    } catch (error) {
        console.error("Error sending password reset email:", error);
    }
}

async function sendVerificationEmail() {
    try {
        const user = firebase.auth().currentUser;
        await user.sendEmailVerification();
        console.log("Verification email sent to", user.email);
    } catch (error) {
        console.error("Error sending verification email:", error);
    }
}

function isEmailVerified() {
    const user = firebase.auth().currentUser;
    if (user) {
        return user.emailVerified;
    } else {
        console.error("No user is signed in.");
        return false;
    }
}

async function signInWithGoogle() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        console.log("Signed in as", user.displayName);
    } catch (error) {
        console.error("Error signing in with Google:", error);
    }
}

async function signInWithFacebook() {
    try {
        const provider = new firebase.auth.FacebookAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        console.log("Signed in as", user.displayName);
    } catch (error) {
        console.error("Error signing in with Facebook:", error);
    }
}

async function signInWithGithub() {
    try {
        const provider = new firebase.auth.GithubAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        console.log("Signed in as", user.displayName);
    } catch (error) {
        console.error("Error signing in with Github:", error);
    }
}