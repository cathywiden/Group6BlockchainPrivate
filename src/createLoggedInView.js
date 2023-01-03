export { createLoggedInView };
import { createLoginField } from "../src/createLoginField.js";
import { viewMyBlocks } from "../src/blockchain/viewMyBlocks.js";
import { viewAllBlocks } from "../src/blockchain/adminViewAllBlocks.js";
import { createHackButton } from "../src/createHackButton.js";

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
    ', you have logged in!</strong> <br></br>' +
    ' <p style="color: black">Enter an address, or click the location icon to fetch your location data.<br>' +
    ' Click the <span style="color: rgb(171, 49, 171);"><strong>arrow</strong></span> to the right to log your data on the chain.' +
    ' <br><br><button id="logoutButton" class="styled-button">Log out</button> <span>&nbsp;&nbsp;&nbsp;</span>' +
    '  <button id="viewMyBlocksButton" class="styled-button">View my saved locations</button><span></span>' +
    '  <button id="viewAllBlocksButton" class="styled-button">View all blocks</button><span>&nbsp;</span>' +
    '<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>' +
    '<input id="hackBlockNumber" type="number" placeholder="Block#" class="styled-input-hack">' +
    '  <button id="hackButton" class="styled-button">Hack</button><br></br><h3 id="newH3"></h3>';

  let logoutButton = document.getElementById("logoutButton");

  logoutButton.addEventListener("click", () => {
    createLoginField();
    localStorage.removeItem("userLoggedIn");
  });

  let viewMyBlocksButton = document.getElementById("viewMyBlocksButton");
  viewMyBlocksButton.className = "styled-button";

  viewMyBlocks();

  createHackButton();

  viewAllBlocks();

  const masterChain = localStorage.getItem("masterChain");

  let hackBlockNumber = document.getElementById("hackBlockNumber");
  hackBlockNumber.setAttribute("min", 1);
  hackBlockNumber.setAttribute("max", masterChain.length);

  let hackButton = document.getElementById("hackButton");
}
