export { createValidateButton };
import { default as Chain } from "../src/blockchain/chain.js";
import { validateChain } from "../src/blockchain/validateChain.js";

let masterChain = new Chain();
// VALIDATE CHAIN

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

    //This doesn't check the chain in an apropriate way!!
    //An almost working version is in the pipe. Stay tuned

    if (!localStorage.masterChain) {
      alert("No chain created yet!");
    } else
      if (validateChain(masterChain)) {
        validationStatus.classList.add("green");
        console.log("Jakob är bäst!");
      } else {
        validationStatus.classList.add("red");
      }
  });
}
