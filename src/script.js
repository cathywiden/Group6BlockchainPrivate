//=====================================//
//================IMPORTS==============//
//=====================================//

import { rollApi } from "/src/api/locationScript.js";
import Chain from "/src/blockchain/chain.js";



//=====================================//
//===========GLOBAL VARIABLES==========//
//=====================================//

let searchButton = document.getElementsByClassName('searchButton')[0];
let input = document.getElementsByClassName('searchInput')[0];


//=====================================//
//=============RUNNING SCRIPT==========//
//=====================================//


rollApi(searchButton, input);



