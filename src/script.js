//=====================================//
//================IMPORTS==============//
//=====================================//

import { rollApi } from "../src/api/locationScript.js";
import { createLoginField } from "../src/logInAndOut.js";
import { validateChainButton } from "../src/logInAndOut.js";

//=====================================//
//===========GLOBAL VARIABLES==========//
//=====================================//

let searchButton = document.getElementsByClassName("searchButton")[0];
let input = document.getElementsByClassName("searchInput")[0];

//=====================================//
//=============RUNNING SCRIPT==========//
//=====================================//

rollApi(searchButton, input);
createLoginField();
validateChainButton();

