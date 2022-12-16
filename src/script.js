//=====================================//
//================IMPORTS==============//
//=====================================//

import { rollApi } from "/src/api/locationScript.js";
//import { helloBlock } from "/src/blockchain/block.mjs";


//=====================================//
//===========GLOBAL VARIABLES==========//
//=====================================//

let searchButton = document.getElementsByClassName('searchButton')[0];
let input = document.getElementsByClassName('searchInput')[0];


//=====================================//
//=============RUNNING SCRIPT==========//
//=====================================//


rollApi(searchButton, input);

console.log("The rollAPI-function is connected " +rollApi);
