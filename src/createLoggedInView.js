export { createLoggedInView };
import { createLoginField } from "../src/createLoginField.js";
import { viewMyBlocks } from "../src/blockchain/viewMyBlocks.js";

function createLoggedInView() {
  // GENERATES LOGGED-IN VIEW
  // CREATES THE VIEW THAT LOGGED IN USER SEES + LOGOUT AND VIEW SAVED LOCATIONS BUTTON

  console.log("---- createLoginField ----");

  let currentUser = localStorage.getItem("userLoggedIn");
  loginContainer.innerHTML = "";
  let loggedinView = document.createElement("h4");
  loginContainer.appendChild(loggedinView);

  loggedinView.innerHTML =
    '<br><strong>Welcome, ' +
    currentUser +
    ', you have logged in!</strong> <br></br> <p style="color: black">Enter an address, or click the location icon to fetch your location data.<br> Click the <span style="color: rgb(171, 49, 171);"><strong>arrow</strong></span> to the right to log your data on the chain. <br><br><button id="logoutButton" class="styled-button">Log out</button> <span>&nbsp;</span> <button id="viewMyBlocksButton" class="styled-button">View my saved locations</button><br></br><h3 id="newH3"></h3>';

  let logoutButton = document.getElementById("logoutButton");

  logoutButton.addEventListener("click", () => {
    createLoginField();
    localStorage.removeItem("userLoggedIn");
  });

  let viewMyBlocksButton = document.getElementById("viewMyBlocksButton");
  viewMyBlocksButton.className = "styled-button";

  viewMyBlocks();
}
