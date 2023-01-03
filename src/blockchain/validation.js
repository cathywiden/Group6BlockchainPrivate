import { default as Block } from "../blockchain/block.js";
import { calculateHash } from "../blockchain/calculateHash.js";
import { hackChain } from "../blockchain/hackChain.js";

export async function validateChain(chain) {
  // Check if there is a chain present
  if (!localStorage.masterChain) {
    alert("No chain created yet!");
  }

  let validationStatus = document.getElementById("validationStatus");
  let blocksHacked = JSON.parse(localStorage.getItem("blocksHacked")) || [];

  for (let i = 1; i < chain.blockChain.length; i++) {
    const previousBlock = chain.blockChain[i - 1];
    const currentBlock = chain.blockChain[i];

    // Check if the current block has been tampered with
    let testHash = await calculateHash(currentBlock.data);
    if (testHash !== currentBlock.newHash || currentBlock.previousHash !== previousBlock.newHash) {
      console.log("*** Chain is hacked! ***");
      console.log("Block " + (i + 1) + " was tampered with!");

      // Update validation status and return false
      validationStatus.classList.add("red");
      validationStatus.classList.remove("green");
      return false;
    }
  }

  console.log("*** Chain is healthy ***");
  validationStatus.classList.add("green");
  validationStatus.classList.remove("red");
  return true;
}

// uses hash comparison instead of checking if the block is in the blacksHacked[] in LS, but still gives green on hacked blocks
