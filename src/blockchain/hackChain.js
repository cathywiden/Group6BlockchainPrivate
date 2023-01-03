import { calculateHash } from "../blockchain/calculateHash.js";

export async function hackChain(chain, blockNumber) {
   // Change timestamp in chain[blockNumber], recalculate hash and restore

  let tmpBlockNumber = blockNumber - 1; // NOTE!! Due to the peculiar block numbering in viewMyBlocks!!
  //let tmpBlockNumber = blockNumber; // reset the above

  if (!localStorage.masterChain){
       alert("No chain created yet!");
      }
  if (blockNumber > chain.blockChain.length) {
      alert(`No such block ${blockNumber}
Only ${chain.blockChain.length} in the chain`);
      }
      const currentBlock = chain.blockChain[tmpBlockNumber];
      console.log(blockNumber, " currentBlock[tmpBlockNumber] = "); //, currentBlock[blockNumber]);
      const timestamp = Date.now();
      currentBlock.timestamp = timestamp;
      console.log("data.timestamp", currentBlock.data.timestamp);
      

  let hackHash = await calculateHash(currentBlock.data)
    .then(hash => {
      console.log("--- ALARM --- BLOCK", blockNumber, "IS HACKED!")
      console.log(blockNumber, "hackHash", hash);
      console.log("newHash", currentBlock.newHash);

      currentBlock.newHash = hash;
      
      localStorage.setItem("masterChain", JSON.stringify(chain));
      // localStorage.setItem("hackedBlock", blockNumber);
      //console.log(localStorage.masterChain.data);
    });
  
  let blocksHacked = JSON.parse(localStorage.getItem("blocksHacked"));
  if (blocksHacked === null) {
    blocksHacked = [];
  }
  blocksHacked.push(Number(blockNumber));
  localStorage.setItem("blocksHacked",JSON.stringify(blocksHacked));

  console.log(blockNumber, " currentBlock.data = ", currentBlock.data);
  }