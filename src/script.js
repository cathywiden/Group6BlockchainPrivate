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
rollApi(searchButton, input);
createLoginField();
createValidateButton();
//  oldScript --------------------------------------------

// logInAndOut --------------------------------------------
onload = () => {
  const loggedInUser = localStorage.getItem("userLoggedIn");
  //CHECK IF THERE IS SOMEONE LOGGED IN AND GENERATE LOGGED-IN OR PUBLIC VIEW ACCORDINGLY
  if (loggedInUser) {
    createLoggedInView();
  } else {
    createLoginField();
  }
};
storeChainInLocalStorage();
createValidateButton();
// logInAndOut --------------------------------------------

// disable page resize to narrower than 480 pixels
window.addEventListener("resize", function () {
  if (window.innerWidth < 480) {
    event.preventDefault();
    window.innerWidth = 480;
  }
});
