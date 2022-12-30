import { default as Chain } from "../src/blockchain/chain.js";
import { rollApi } from "../src/api/locationScript.js";
import { createLoginField } from "../src/createLoginField.js";
import { createValidateButton } from "../src/createValidateButton.js";
import { createLoggedInView } from "../src/createLoggedInView.js";
import { storeChainInLocalStorage } from "../src/blockchain/storeChainInLocalStorage.js";

let searchButton = document.getElementsByClassName("searchButton")[0];
let input = document.getElementsByClassName("searchInput")[0];

let masterChain = new Chain();

let users = [
  { userName: "Janne", passWord: "Kemi" },
  { userName: "Jakob", passWord: "Dahlberg" },
  { userName: "Edvin", passWord: "Ekström" },
  { userName: "Fredrik", passWord: "Carlsson" },
  { userName: "Hossein", passWord: "Feili" },
  { userName: "Carolin", passWord: "Nielsen" },
  { userName: "Katalin", passWord: "Widén" },
  { userName: "test", passWord: "test" },
];

// SET UP AND STORE USERS IN LOCALSTORAGE
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(users));
}


// oldScript --------------------------------------------
console.log("SCRIPT: rollApi");
rollApi(searchButton, input);
console.log("SCRIPT: createLoginField");
createLoginField();
console.log("SCRIPT: createValidateButton");
createValidateButton();
//  oldScript --------------------------------------------

// logInAndOut -------------------------------------------- 
onload = () => {
  const loggedInUser = localStorage.getItem("userLoggedIn");
  //CHECK IF THERE IS SOMEONE LOGGED IN AND GENERATE LOGGED-IN OR PUBLIC VIEW ACCORDINGLY
  if (loggedInUser) {
    console.log("SCRIPT - loggedIn: createLoggedInView");
    createLoggedInView();
  } else {
    console.log("SCRIPT: createLoginField");
    createLoginField();
  }
};

console.log("SCRIPT - loggedIn: storeChainInLocalStorage");
storeChainInLocalStorage();
console.log("SCRIPT - loggedIn: viewMyBlocks");
createValidateButton();
// logInAndOut -------------------------------------------- 