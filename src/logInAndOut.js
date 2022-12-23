export { createLoginField };
import { default as Chain } from "/src/blockchain/chain.js";
import { validateChain } from "./blockchain/validateChain.js";

let first = new Chain();
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
    '<input id="userName" type="text" placeholder="Username"><input id="passWord" type="password" placeholder="Password"></input><button id="loginBtn">Log in</button>';

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
  let currentUser = localStorage.getItem("userLoggedIn");
  loginContainer.innerHTML = "";
  let loggedinView = document.createElement("h4");
  loginContainer.appendChild(loggedinView);
  loggedinView.innerHTML =
    "Välkommen " +
    currentUser +
    ', du är nu inloggad <br></br> <button id="logItBtn">Log my location</button><button id="viewMyBlocksBtn">View my saved locations</button><br></br><button id="logoutBtn" >Log out</button><br></br><h3 id="newH3"></h3>';
    let logoutBtn = document.getElementById("logoutBtn"); 
  

  logoutBtn.addEventListener("click", () => {
    createLoginField();
    localStorage.removeItem("userLoggedIn");
  });

  let logItBtn = document.getElementById("logItBtn");

  logItBtn.addEventListener("click", () => {
    console.log("button works");
    first.addBlock();
    console.log(first);
  });

  let viewMyBlocksBtn = document.getElementById("viewMyBlocksBtn");

  viewMyBlocksBtn.addEventListener("click", () => {  ////NEW BUTTON 221222
    let loggedInUser = localStorage.getItem("userLoggedIn");  //HÄMTAR LOGGEDINUSER FRÅN LS
    console.log("Loggedinuser är: " +loggedInUser);  //LOGGED IN USER
    console.log("first.blockChain är: " +JSON.stringify(first.blockChain)); //VISAR BLOCKKEDJAN
    console.log("first.blockChain[1].user är: " +JSON.stringify(first.blockChain[1].data.user)); //VISAR VEM SOM SKAPAT BLOCK NR 2
   
    let mySavedBlocks = first.blockChain.filter(function (block) {  //FILTRERAR UT DE BLOCK SOM LOGGED IN USER HAR SKAPAT I BLOCKKEDJAN OCH LÄGGER I NY ARRAY
    
      return block.data.user === loggedInUser;
    });

    let parentEl = document.getElementById("newH3");
    let newH2 = document.createElement("h2");
    parentEl.appendChild(newH2);
    newH2.setAttribute("id", "newH2");
    newH2.innerHTML="Här är dina sparade block";
    
    for (let i=0; i<mySavedBlocks.length; i++) {
      let item = document.createElement("li", "br");
      item.setAttribute("class", "displayBoxes");
      newH2.appendChild(item);
      item.innerHTML=JSON.stringify(mySavedBlocks[i]);
      i++;
    }
  })
}


window.onload = () => {
  const loggedInUser = localStorage.getItem("userLoggedIn");
  if (loggedInUser) {
    createLoggedInView(loggedInUser);
  } else {
    createLoginField();
  }
};

export function validateChainBtn() {
  validateContainer.innerHTML = "";
  let validateButton = document.createElement("button");
  validateContainer.appendChild(validateButton);
  validateButton.innerHTML =
    '<button id="validateBtn" >Validate Button</button>';
  let validateBtn = document.getElementById("validateBtn");

  validateBtn.addEventListener("click", () => {
    // validateChain();
    console.log("Jakob är bäst!");
  });
}
