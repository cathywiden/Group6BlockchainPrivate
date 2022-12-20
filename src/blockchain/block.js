import { calculateHash } from "/src/blockchain/calculateHash.js";

export default class Block {
  constructor(data, newHash, previousHash) {
    this.data = data;
    this.previousHash = previousHash;
    this.timestamp = Date();
    this.newHash = newHash;
  }
}
