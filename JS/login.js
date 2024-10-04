let username = document.getElementById("email-inp");
// let password = document.getElementById("password-inp");
let password = document.getElementsByClassName("pwd")[0];
let invalids = document.getElementsByClassName("alert-sys")[0];
let alert_msg = document.getElementById("alert"); 

function LoginHit() {
  let email_input = username.value;
  let pass_input = password.value;

  if (email_input === "" || pass_input === "") {
    alert_msg.textContent = "Error! Enter email and password";
    if(invalids.style.display == "none" || invalids.style.display == "")
      invalids.style.display = "flex";
  }
}

function showPassword(eleID) {
  const x = document.getElementById(eleID);
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
