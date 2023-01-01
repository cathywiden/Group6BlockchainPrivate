export { validateChain };

// Retrieve the stored chain from local storage
let chain = JSON.parse(localStorage.getItem("masterChain"));

function validateChain(chain) {
  // Check if the chain object is null or undefined
  if (!chain) {
    return false;
  }

  // Check if the blockChain array has at least 2 blocks
  if (chain.blockChain.length < 2) {
    return false;
  }

  // Check if the hash of the first block is equal to the expected value
  if (
    chain.blockChain[0].newHash !==
    "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"
  ) {
    return false;
  }

  for (let i = 1; i < chain.blockChain.length; i++) {
    const currentBlock = chain.blockChain[i];
    const previousBlock = chain.blockChain[i - 1];
    //currentBlock.previousHash = 50;                   //USE THESE TWO LINES TO ALTER A HASH IN ORDER TO TEST THE VALIDATE FUNCTION
    //console.log( "current blocks previous hash is now ===>" +currentBlock.previousHash);
  
    if (currentBlock.previousHash !== previousBlock.newHash) {
      alert(`Invalid previous hash for block ${i + 1}`);
      return false;
    }
  }
  return true;
}

// Validate the stored chain
validateChain(chain);
