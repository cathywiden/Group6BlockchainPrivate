export { createValidateButton };
import { validateChain } from "../src/blockchain/validateChain.js";


// Retrieve the stored chain from local storage
let storedChain = JSON.parse(localStorage.getItem("masterChain"));

function createValidateButton() {
  console.log("---- createValidateButton ----");

  let validateContainer = document.getElementById("validateContainer");
  validateContainer.innerHTML = "";

  let validateButton = document.createElement("validateButton");
  validateButton.className = "styled-button-white";

  validateButton.innerHTML = "Validate Chain";
  validateContainer.appendChild(validateButton);

  // add some visual cue to that the validation has been successful, other than just a console log --> green indicator
  const validationStatus = document.getElementById("validationStatus");

  validateButton.addEventListener("click", () => {
    console.log("validateButton");

    // Retrieve the stored chain from local storage
    let storedChain = JSON.parse(localStorage.getItem("masterChain"));

    if (!storedChain) {
      alert("No chain created yet!");
    } else if (validateChain(storedChain)) {
      validationStatus.classList.add("green");
      console.log("Jakob är bäst!");
    } else {
      validationStatus.classList.add("red");
    }
  });
}

