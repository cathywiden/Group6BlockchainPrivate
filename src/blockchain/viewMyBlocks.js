export { viewMyBlocks };

function viewMyBlocks() {

  // DISPLAY ACTIVE USER'S OWN BLOCKS

  let viewMyBlocksButton = document.getElementById("viewMyBlocksButton");

  viewMyBlocksButton.addEventListener("click", () => {

    // GENERATE LIST FROM LS FETCHED DATA
    let loggedInUser = localStorage.getItem("userLoggedIn");

    let masterChain = localStorage.getItem("masterChain");
    let chain;

    if (!localStorage.masterChain) {
      alert("No chain created yet!");
    }

    if (masterChain) {
      chain = JSON.parse(localStorage.getItem("masterChain"));
    }

    // Displays actual block number in the chain, not necessarily starting from 1 for the current user:
    function getMySavedBlocks(chain, loggedInUser) {

      return chain.blockChain.filter(function (block, index) {
        block.blockNumber = index + 1; // add blockNumber property to block
        return block.data.user === loggedInUser;
      });
    }

    let mySavedBlocks = getMySavedBlocks(chain, loggedInUser);

    // If the logged-in user has no blocks added yet, DO NOT display drop-down table, but display an alert.
    if (mySavedBlocks.length === 0) {
      alert("You have not added any blocks yet!");
      return;
    }

    let parentEl = document.getElementById("newH3");
    let newH2 = document.createElement("h2");
    parentEl.appendChild(newH2);
    newH2.setAttribute("id", "newH2");
    newH2.innerHTML = "Here are your saved blocks";

    // TOGGLE: display list on first click, remove list on clicking again
    // Check if the list is already displayed
    if (parentEl.getElementsByTagName("li").length > 0) {
      // List is already displayed, so remove it
      parentEl.innerHTML = "";

    } else {

      // GENERATE AND FILL THE DROP-DOWN TABLE

      let blocksHacked = JSON.parse(localStorage.getItem("blocksHacked"));
      let hackedBlock = localStorage.hackedBlock;
      console.log("login: blocksHacked", blocksHacked, "hackedBlock", hackedBlock, typeof blocksHacked);

      for (let i = 0; i < mySavedBlocks.length; i++) {

        let item = document.createElement("li", "br");

        // item.setAttribute("class", "displayBoxes");
        console.log("i", i, "displayBoxes");
        item.setAttribute("class", "displayBoxes");
        console.log("i", i);
        //let j = i + 2;
        console.log("typeof blocksHacked =", typeof blocksHacked);

        if (blocksHacked != null) {
          console.log("blocksHacked.includes(", mySavedBlocks[i].blockNumber, ")", blocksHacked.includes(mySavedBlocks[i].blockNumber));

          if (blocksHacked.includes(mySavedBlocks[i].blockNumber)) {
            console.log("blocksHacked[", i, "]", blocksHacked[i], "hackedBlock", hackedBlock);
            //if (blocksHacked[i] == hackedBlock) {
            console.log("HACKED!", mySavedBlocks[i].blockNumber, "displayBoxesHacked");
            item.setAttribute("class", "displayBoxesHacked");

            // Display the "This block is compromised" header
            let compromisedHeader = document.createElement("h3");
            compromisedHeader.innerHTML = "***** This block is compromised *****";
            item.appendChild(compromisedHeader);
          }
        }

        newH2.appendChild(item);

        // Display the block number starting from 1 for every user
        let blockNumber = document.createElement("p");
        blockNumber.innerHTML = "Block " + (i + 1); // display true block index (blockNumber) starting from 1 for every user
        blockNumber.classList.add("bold-text");
        item.appendChild(blockNumber);

        let absoluteBlockNumber = document.createElement("p");
        absoluteBlockNumber.innerHTML = "Absolute block " + mySavedBlocks[i].blockNumber;
        absoluteBlockNumber.classList.add("italic-text");
        item.appendChild(absoluteBlockNumber);

        let br = document.createElement("br");
        item.appendChild(br);

        let userRow = document.createElement("p");
        userRow.innerHTML = "User: " + mySavedBlocks[i].data.user;
        item.appendChild(userRow);

        let latitudeRow = document.createElement("p");
        latitudeRow.innerHTML = "Latitude: " + mySavedBlocks[i].data.latitude;
        item.appendChild(latitudeRow);

        let longitudeRow = document.createElement("p");
        longitudeRow.innerHTML = "Longitude: " + mySavedBlocks[i].data.longitude;
        item.appendChild(longitudeRow)

        let cityRow = document.createElement("p");
        cityRow.innerHTML = "City: " + mySavedBlocks[i].data.city;
        item.appendChild(cityRow);

        let countryRow = document.createElement("p");
        countryRow.innerHTML = "Country: " + mySavedBlocks[i].data.country;
        item.appendChild(countryRow);

        let timestampRow = document.createElement("p");
        timestampRow.innerHTML = blocksHacked != null && blocksHacked.includes(mySavedBlocks[i].blockNumber) ? "<strong>Timestamp: CORRUPT</strong>" : "Timestamp: " + mySavedBlocks[i].data.timestamp;
        item.appendChild(timestampRow);

        let timeRow = document.createElement("p");
        timeRow.innerHTML = blocksHacked != null && blocksHacked.includes(mySavedBlocks[i].blockNumber) ? "<strong>Local time: CORRUPT</strong>" : "Local time: " + mySavedBlocks[i].timestamp.toString().split("(")[0];
        item.appendChild(timeRow);

        let previousHashRow = document.createElement("p");
        previousHashRow.innerHTML = "Previous hash: " + mySavedBlocks[i].previousHash;
        previousHashRow.setAttribute("data-hash", mySavedBlocks[i].previousHash);
        previousHashRow.classList.add("hash");
        item.appendChild(previousHashRow);

        let newHashRow = document.createElement("p");
        newHashRow.innerHTML = blocksHacked != null && blocksHacked.includes(mySavedBlocks[i].blockNumber) ?
          "<strong>Corrupt new hash: " + mySavedBlocks[i].newHash + "</strong>" :
          "New hash: " + mySavedBlocks[i].newHash;
        newHashRow.setAttribute("data-hash", mySavedBlocks[i].newHash);
        newHashRow.classList.add("hash");
        item.appendChild(newHashRow);

        // HIGHLIGHT MATCHING HASHES IN DROP-DOWN TABLE
        // Good for a quick check, user can see immediately that the chain is valid, not having to rely on just a button stating so
        let hashElements = document.querySelectorAll(".hash");

        hashElements.forEach(function (hashElement) {
          hashElement.addEventListener("mouseover", function (event) {
            let dataHash = event.target.getAttribute("data-hash");
            let hashSelector = `.hash[data-hash="${dataHash}"]`;
            let matchingElements = document.querySelectorAll(hashSelector);
            matchingElements.forEach(function (matchingElement) {
              matchingElement.style.backgroundColor = "lightgrey";
            });
          });

          hashElement.addEventListener("mouseout", function (event) {
            let dataHash = event.target.getAttribute("data-hash");
            let hashSelector = `.hash[data-hash="${dataHash}"]`;
            let matchingElements = document.querySelectorAll(hashSelector);
            matchingElements.forEach(function (matchingElement) {
              matchingElement.style.backgroundColor = "";
            });
          });
        });
      }
    }
  });
}
