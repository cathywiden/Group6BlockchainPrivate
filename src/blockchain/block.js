import { calculateHash } from "/src/blockchain/calculateHash.js"; 

class Block {
  constructor(data, previousHash) {
    this.data = data;
    this.previousHash = previousHash;
    this.timestamp = Date.now();
    this.hash = calculateHash(data);
  }
}
