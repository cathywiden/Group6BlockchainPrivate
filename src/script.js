//=====================================//
//================IMPORTS==============//
//=====================================//

import { rollApi } from "/src/api/locationScript.js";
import { calculateHash } from "/src/blockchain/calculateHash.js";
import { createLoginField } from "/src/logInAndOut.js";

//=====================================//
//===========GLOBAL VARIABLES==========//
//=====================================//

let searchButton = document.getElementsByClassName("searchButton")[0];
let input = document.getElementsByClassName("searchInput")[0];

//=====================================//
//=============RUNNING SCRIPT==========//
//=====================================//

rollApi(searchButton, input);
console.log("Encrypt: Hello World! ===", await calculateHash("Hello World!"));
createLoginField();

