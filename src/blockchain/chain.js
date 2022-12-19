import { default as Block } from "./block.js"; //OR CHANGE TO WHATEVER THE BLOCK CLASS IS CALLED
import { calculateHash } from "/src/blockchain/calculateHash.js";

export default class Chain {
  // FOR CREATION OF: let blockChain = new Chain(); in script.js

  constructor() {
    this.blockChain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    // CREATES THE FIRST BLOCK ON THE CHAIN
    return new Block(
      { user: "Genesis", location: 0 },
      calculateHash("Hello World!"),
      "0"
    ); //I'VE PUT LOCATION HERE INSTEAD OF JANNES WORK, NOT SURE IF THIS IS WHAT WE WANT TO HAVE HERE?
  }

  getLatestBlock() {
    //FETCH PREVIOUS BLOCK
    return this.blockChain[this.blockChain.length - 1].newHash; //RETURNS PREVIOUS POST IN ARRAY BUT SKIPS GENESISBLOCK
  }

  async addBlock(newBlock) {
    //ADD NEW BLOCK TO THE CHAIN
    return this.blockChain.push(
      new Block(
        newBlock,
        await calculateHash(newBlock + this.getLatestBlock()),
        await this.getLatestBlock()
      ) //must input user. User info array should be put in newBlock variable.
    );
  }
}
