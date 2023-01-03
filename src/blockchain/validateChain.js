import { calculateHash } from "../blockchain/calculateHash.js";

export async function validateChain(chain) {
  if (!localStorage.masterChain) {
    alert("No chain created yet!");
  }

  let validationStatus = document.getElementById("validationStatus");
  let blocksHacked = JSON.parse(localStorage.getItem("blocksHacked")) || [];

  for (let i = 1; i < chain.blockChain.length; i++) {
    const previousBlock = chain.blockChain[i - 1];
    const currentBlock = chain.blockChain[i];

    let testHash = await calculateHash(currentBlock.data);

    if (blocksHacked && blocksHacked.includes(i) && i !== 0) {
      console.log("blocksHacked", blocksHacked);

      console.log(i + 1, "testHash", testHash);
      console.log("newHash", currentBlock.newHash);

      if (currentBlock.previousHash !== previousBlock.newHash) {
        console.log(i + 1, "INVALID! Previous hash discrepancy between Block " + i + " and Block " + (i + 1) + "!" + currentBlock.newHash);

        if (!blocksHacked.includes(i)) {
          blocksHacked.push(i);
          localStorage.setItem("blocksHacked", JSON.stringify(blocksHacked));
        }

        blocksHacked.sort((a, b) => a - b);
        let input = document.getElementsByClassName("searchInput")[0];

        console.log("*** Chain is hacked! ***");
        input.value = `*** HACKED BLOCK(S): ${blocksHacked.join(', ')} ***`;
        input.classList.add('redAlert');

        setTimeout(function () {
          input.value = "";
          input.classList.remove('redAlert');
        }, 2000);

        validationStatus.classList.add("red");
        validationStatus.classList.remove("green");
      }
    }
  }
}