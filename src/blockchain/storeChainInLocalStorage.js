export { createLoginField };
export { storeChainInLocalStorage };
import { default as Chain } from "../blockchain/chain.js";
import { createLoginField } from "../createLoginField.js";

function storeChainInLocalStorage() {

  // STORE CHAIN IN LOCALSTORAGE -- ONLY AVAILABLE FOR LOGGED-IN USERS
  console.log("---- storeChainInLocalStorage ----");

  let searchButton = document.getElementsByClassName("searchButton")[0];

  searchButton.addEventListener("click", async () => {
    console.log("searchButton");

    // Check if user is logged in
    let currentUser = localStorage.getItem("userLoggedIn");
    if (currentUser === null || currentUser === '') {
      alert("You must be logged in to add blocks to the chain!");

    } else {

      // User is logged in, so proceed with adding a new block to the chain
      // CHECK IF LOCATION DATA IS AVAILABLE
      const locationInfo = document.getElementsByClassName("locationInfo")[0];

      if (!locationInfo || !locationInfo.textContent) {
        // location data is not available
        alert("No valid location data is available. Please enter a valid address or IP address.");

      } else {
        // location data is available
        // CHECK IF CHAIN EXISTS IN LOCAL STORAGE
        let chain;

        try {
          const masterChain = localStorage.getItem("masterChain");

          if (!masterChain) {

            // no valid chain in LS --> create one and store in LS
            chain = new Chain();

            console.log("Created new chain");
            console.log("test1", chain instanceof Chain);
            console.log("chain before going into LS", chain);

            localStorage.setItem("masterChain", JSON.stringify(chain));

            console.log("genesis block", chain.getLatestBlock()); // correctly logs first block

          } else {
            // RETRIEVE CHAIN FROM LOCAL STORAGE AND ADD NEW BLOCK
            chain = JSON.parse(localStorage.getItem("masterChain"));
            Object.setPrototypeOf(chain, Chain.prototype); // when we fetch an object from LS, prototype needs to be reassigned. Methods like addBlock() can only be used if we regenerate the chain object (Chain.prototype)

            console.log("test2", chain instanceof Chain); // true
            console.log("chain fetched from LS", chain);

            console.log("chain after mapping", chain);
            console.log("Cathy is a Class of her own -- a Goddess.prototype")

            chain.getLatestBlock();
            console.log("latest block before adding new", chain.getLatestBlock());

            await chain.addBlock(); // so that it has enough time to hash

            // empty infoBox after successfull block addition
            let infoBox = document.getElementsByClassName("infoBox")[0];
            let searchInput = document.getElementsByClassName("searchInput")[0];

            let emptyAllFields = infoBox.querySelectorAll(".ipInfo, .locationInfo, .longitudeInfo, .latitudeInfo");
            emptyAllFields.forEach(formElement => formElement.textContent = "");
            searchInput.value = "";

            // ADD A VISUAL CONFIRMATION THAT A BLOCK HAS BEEN ADDED
            // create a green pipe element
            let greenPipe = document.createElement("div");
            greenPipe.classList.add("greenPipe");

            // insert the green pipe right before the GPS icon into the searchInput field
            document.querySelector('.gpsIcon').insertAdjacentElement('beforebegin', greenPipe);

            setTimeout(function () {
              greenPipe.parentNode.removeChild(greenPipe);
            }, 2000); // remove the green pipe element after 2 seconds

            chain.getLatestBlock();
            console.log("latest block after adding new", chain.getLatestBlock());
            console.log("chain after adding a block", chain);

            // Put the chain in LS
            localStorage.setItem("masterChain", JSON.stringify(chain));

          }
        }
        catch (error) {
          console.error(error);
          alert("An error occurred while updating the chain. Please try again.");
        }
      }
    }
  });
}
