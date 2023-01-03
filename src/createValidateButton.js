import { default as Chain } from "../src/blockchain/chain.js";
import { validateChain } from "../src/blockchain/validateChain.js"

export async function createValidateButton(){
  let validateContainer = document.getElementById("validateContainer");
  validateContainer.innerHTML = "";

  let validateButton = document.createElement("validateButton");
  validateButton.className = "styled-button-white";

  validateButton.innerHTML = "Validate Chain";
  validateContainer.appendChild(validateButton);

  // add some visual cue to that the validation has been successful, other than just a console log --> green indicator

  validateButton.addEventListener("click", () => {
    if (!localStorage.masterChain){
      alert("No chain created yet!");
    } else {
      let chain = JSON.parse(localStorage.getItem("masterChain"));
      Object.setPrototypeOf(chain, Chain.prototype);
      //let hackedBlocks = validateChain(chain);
      //console.log("yyyyyy hackedBlocks", hackedBlocks);
      //console.log(" hackedBlocks.length", hackedBlocks.length);
      //let hacked = hackedBlocks.length > 0;
      //let isValid = hackedBlocks.length === 0 || hackedBlocks.length === undefined;
      if (validateChain(chain)){
        console.log("TRUE");
        validationStatus.classList.add("green");
      } else {
        console.log("FALSE");
        validationStatus.classList.add("red");
      }

      // if (localStorage.hackedBlocks === 0 || localStorage.hackedBlocks === undefined){
      //   console.log("TRUE");
      //   validationStatus.classList.add("green");
      // } else {
      //   console.log("FALSE");
      //   validationStatus.classList.add("red");
      // }
  }});
}
