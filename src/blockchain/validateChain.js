export { validateChain };

// Retrieve the stored chain from local storage
let chain = JSON.parse(localStorage.getItem("masterChain"));

function validateChain(chain) {
  console.log(chain);

  // Check if the chain object is null or undefined
  if (!chain) {
    console.log("No chain created yet!");
    return false;
  }

  // Check if the blockChain array has at least 2 blocks
  if (chain.blockChain.length < 2) {
    console.log("There must be at least 2 blocks in the chain to check for validity!");
    return false;
  }

  // Check if the hash of the first block is equal to the expected value
  if (chain.blockChain[0].newHash !== "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069") {
    console.log("Invalid hash for the genesis block");
    console.log(chain.blockChain[0].newHash);
    return false;
  }

  for (let i = 1; i < chain.blockChain.length; i++) {
    const currentBlock = chain.blockChain[i];
    const previousBlock = chain.blockChain[i - 1];

    if (currentBlock.previousHash !== previousBlock.newHash) {
      console.log(`Invalid previous hash for block ${i + 1}`);
      alert(`Invalid previous hash for block ${i + 1}`);
      return false;
    }
  }

  console.log("Chain is valid");
  return true;
}



// Validate the stored chain
validateChain(chain);
