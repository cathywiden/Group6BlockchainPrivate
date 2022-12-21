export { createLoginField };

const users = [
  { userName: "Janne", passWord: "Kemi" },
  { userName: "Jakob", passWord: "Dahlberg" },
  { userName: "Edvin", passWord: "Ekström" },
  { userName: "Fredrik", passWord: "Carlsson" },
  { userName: "Hossein", passWord: "Feili" },
  { userName: "Carolin", passWord: "Nielsen" },
  { userName: "Katalin", passWord: "Widen" },
];

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(users));
}

function createLoginField() {
  //CREATES LOGIN INPUTFIELD AND BUTTON

  loginContainer.innerHTML =
    '<input id="userName" type="text" placeholder="Username"><br><input id="passWord" type="password" placeholder="Password"></input><br><button id="loginBtn">Log in</button>';
  let loginBtn = document.getElementById("loginBtn");

  loginBtn.addEventListener("click", () => {
    const users = JSON.parse(localStorage.getItem("users"));
    const foundUser = users.find(
      (user) =>
        user.userName === userName.value && user.passWord === passWord.value
    );
    if (foundUser) {
      localStorage.setItem("userLoggedIn", foundUser.userName);
      createLoggedInView();
    } else {
      alert("Invalid!");
    }
  });
}

function createLoggedInView() {
  //CREATES THE VIEW THAT LOGGED IN USER SEES +LOGOUT BTN

  loginContainer.innerHTML = "";
  let loggedinView = document.createElement("h4");
  loginContainer.appendChild(loggedinView);
  loggedinView.innerHTML =
    'Välkommen, du är nu inloggad <br></br> <button id="logoutBtn" >Log out</button>';
  let logoutBtn = document.getElementById("logoutBtn");

  logoutBtn.addEventListener("click", () => {
    createLoginField();
    loginContainer.style.display = "none";
    loginBtn.style.display = "none";
    localStorage.removeItem("userLoggedIn");
    loginFormButton(); // här kommer våran knapp fram (testing)
  });
}

window.onload = () => {
  const loggedInUser = localStorage.getItem("userLoggedIn");
  if (loggedInUser) {
    createLoggedInView(loggedInUser);
    loginFormBtn.style.display = "none";
  } else {
    loginFormButton();
  }
};

export function loginFormButton() {
  loginFormContainer.innerHTML = "";
  let formButton = document.createElement("button");
  loginFormContainer.appendChild(formButton);
  loginFormContainer.innerHTML = '<button id="loginFormBtn" >Log in</button>';
  let loginFormBtn = document.getElementById("loginFormBtn");

  loginFormBtn.addEventListener("click", () => {
    createLoginField();
    loginFormBtn.style.display = "none";
    loginContainer.style.display = "block";
    loginBtn.style.display = "block";
  });
}
