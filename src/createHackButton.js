import { default as Chain } from "../src/blockchain/chain.js";
import { hackChain } from "../src/blockchain/hackChain.js"

export function createHackButton(){

let hackButton = document.getElementById("hackButton");
//let hackBlockNumber = document.getElementById("hackBlockNumber");
console.log("hackBlockNumber", hackBlockNumber.value);

  hackButton.addEventListener("click", () => {
    console.log("hackBlockNumber.value", hackBlockNumber.value);
    console.log("hackBlockNumber", hackBlockNumber);
    //console.log("typeof blockNumber.value",typeof blockNumber.value);

    if (!localStorage.masterChain){
      alert("No chain created yet!");
    } else if (hackBlockNumber.value == "") { // What to ask for when no blocknumber is given?
      alert("No blocknumber given");
    } else
      {let chain = JSON.parse(localStorage.getItem("masterChain"));
      Object.setPrototypeOf(chain, Chain.prototype);
      //if (hackBlockNumber.value <= chain.blockChain.length) {
      hackChain(chain, hackBlockNumber.value);
      //}
    }
  });
}

