import { default as Block } from "../blockchain/block.js"; 
import { calculateHash } from "../blockchain/calculateHash.js";

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
    );
  }

  getLatestBlock() {
    // FETCH PREVIUOS BLOCK IN WHOLE
    return this.blockChain[this.blockChain.length - 1];
  }

  async getLatestBlockHash() {
    //FETCH PREVIOUS BLOCK HASH
    return this.blockChain[this.blockChain.length - 1].newHash; //RETURNS PREVIOUS BLOCK'S HASH BUT SKIPS GENESISBLOCK
  }
  
  async addBlock() {

    // fetch loggedInUser + location data from LS
    const user = localStorage.getItem("userLoggedIn");
    const longitude = localStorage.getItem("longitude");
    const latitude = localStorage.getItem("latitude");
    const city = localStorage.getItem("city"); 
    const country = localStorage.getItem("country"); 

    const timestamp = Date.now(); // (milliseconds)
    const randomNumber = Math.random();

    // new block object with uuid
    const newBlock = {user, longitude, latitude, city, country, timestamp, randomNumber};

    // hashing new block
    const newBlockHash = await calculateHash(newBlock);

    // latest block in chain
    const previousBlock = this.getLatestBlock();

    // ternary operator: if-else --> check if previousBlock is not null or undefined --> if it is valid, get newHash
    // if the prevHash is invalid, it sets it to === 0, stored as prevHash
    // syntax: boolean --> ?true or :false
    const previousHash = previousBlock ? previousBlock.newHash : "0";

    // push new block to chain
    this.blockChain.push(new Block(newBlock, newBlockHash, previousHash));
  }
}

