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
      { user: "Genesis", longitude: 0, latitude: 0 },
      "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
      "0"
    ); //I'VE PUT LOCATION HERE INSTEAD OF JANNES WORK, NOT SURE IF THIS IS WHAT WE WANT TO HAVE HERE?
  }

  getLatestBlock() {
    //FETCH PREVIOUS BLOCK
    return this.blockChain[this.blockChain.length - 1].newHash; //RETURNS PREVIOUS POST IN ARRAY BUT SKIPS GENESISBLOCK
  }

  async addBlock() {
    //ADD NEW BLOCK TO THE CHAIN
    let newBlock = {
      user: localStorage.getItem("userLoggedIn"),
      longitude: localStorage.getItem("longitude"),
      latitude: localStorage.getItem("latitude"),
    };
    return this.blockChain.push(
      new Block(
        newBlock,
        await calculateHash(newBlock + this.getLatestBlock()),
        await this.getLatestBlock()
      ) //must input user. User info array should be put in newBlock variable.
    );
  }
}
