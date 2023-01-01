export { createLoginField };
import { createLoggedInView } from "../src/createLoggedInView.js";
import { displayPublicChainData } from "../src/blockchain/displayPublicChainData.js";

function createLoginField() {
  // CREATES LOGIN INPUT FIELD AND BUTTON

  loginContainer.innerHTML =
    '<p style="color: white; font-weight: bold">For registered users</p><p style="color: white">Please, log in to add data to the chain.<br><br><input id="userName" type="text" placeholder="Username" class="styled-input"><input id="passWord" type="password" placeholder="Password" class="styled-input"></input><button id="loginButton" class="styled-button">Log in</button><br><br><br><p style="color: white; font-weight: bold">Public blockchain data</p><p style="color: white">We have worldwide coverage. Here, you can see a list of some of the most popular locations our system has been accessed from: <br><br><button id="frequentLocationsButton" class="styled-button">List locations</button><div id="newH3"></div><br><br>';

  let loginButton = document.getElementById("loginButton");

  loginButton.addEventListener("click", () => {
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

  displayPublicChainData();
}
