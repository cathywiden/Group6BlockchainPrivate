export { createLoginField };

function createLoginField() {  //CREATES LOGIN INPUTFIELD AND BUTTON

    loginContainer.innerHTML = '<input id="loginInput" type="text" placeholder="Username"> </input><button id="loginBtn">Log in</button>';
    let loginBtn = document.getElementById("loginBtn");

    loginBtn.addEventListener("click", () => {
       createLoggedInView();
    })
}



function createLoggedInView() { //CREATES THE VIEW THAT LOGGED IN USER SEES +LOGOUT BTN
    
    loginContainer.innerHTML="";
    let loggedinView = document.createElement('h4');
    loginContainer.appendChild(loggedinView);
    loggedinView.innerHTML= 'Välkommen, du är nu inloggad <br></br> <button id="logoutBtn" >Log out</button>';
    let logoutBtn = document.getElementById ("logoutBtn");

    logoutBtn.addEventListener("click", () => {
        createLoginField();
    })
}

