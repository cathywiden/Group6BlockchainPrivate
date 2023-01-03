export { viewAllBlocks };

function viewAllBlocks() {

  // DISPLAY ALL BLOCKS

  let viewAllBlocksButton = document.getElementById("viewAllBlocksButton");

  viewAllBlocksButton.addEventListener("click", () => {
    let masterChain = localStorage.getItem("masterChain");
    let chain;

    if (!localStorage.masterChain) {
      alert("No chain created yet!");
    }

    if (masterChain) {
      chain = JSON.parse(localStorage.getItem("masterChain"));
    }

    // If the chain has no blocks, DO NOT display drop-down table, but display an alert.
    if (chain.blockChain.length === 0) {
      alert("There are no blocks in the chain yet!");
      return;
    }

    let parentEl = document.getElementById("newH3");
    let newH2 = document.createElement("h2");
    parentEl.appendChild(newH2);
    newH2.setAttribute("id", "newH2");
    newH2.innerHTML = "Here are all the blocks";

    // TOGGLE: display list on first click, remove list on clicking again
    // Check if the list is already displayed
    if (parentEl.getElementsByTagName("li").length > 0) {
      // List is already displayed, so remove it
      parentEl.innerHTML = "";
    } else {
      // GENERATE AND FILL THE DROP-DOWN TABLE
      let blocksHacked = JSON.parse(localStorage.getItem("blocksHacked"));
      let hackedBlock = localStorage.hackedBlock;

      for (let i = 0; i < chain.blockChain.length; i++) {
        let item = document.createElement("li", "br");

        item.setAttribute("class", "displayBoxes");

        if (blocksHacked != null && blocksHacked.includes(i + 1)) {
          item.setAttribute("class", "displayBoxesHacked");

          // Display the "This block is compromised" header
          let compromisedHeader = document.createElement("h3");
          compromisedHeader.innerHTML = "***** This block is compromised *****";
          item.appendChild(compromisedHeader);
        }

        newH2.appendChild(item);

        // Display the block number starting from 1 for every user
        let blockNumber = document.createElement("p");
        blockNumber.innerHTML = "Block " + (i + 1);
        blockNumber.classList.add("bold-text");
        item.appendChild(blockNumber);

        let userRow = document.createElement("p");
        userRow.innerHTML = "User: " + chain.blockChain[i].data.user;
        item.appendChild(userRow);

        let latitudeRow = document.createElement("p");
        latitudeRow.innerHTML = "Latitude: " + chain.blockChain[i].data.latitude;
        item.appendChild(latitudeRow);

        let longitudeRow = document.createElement("p");
        longitudeRow.innerHTML = "Longitude: " + chain.blockChain[i].data.longitude;
        item.appendChild(longitudeRow);

        let cityRow = document.createElement("p");
        cityRow.innerHTML = "City: " + chain.blockChain[i].data.city;
        item.appendChild(cityRow);

        let countryRow = document.createElement("p");
        countryRow.innerHTML = "Country: " + chain.blockChain[i].data.country;
        item.appendChild(countryRow);

        let timeStampRow = document.createElement("p");
        timeStampRow.innerHTML = blocksHacked != null && blocksHacked.includes(i + 1) ?
          "<strong>Timestamp: CORRUPT</strong>" : "Timestamp: " + chain.blockChain[i].data.timestamp;
        item.appendChild(timeStampRow);
        
        let timeRow = document.createElement("p");
        timeRow.innerHTML = blocksHacked != null && blocksHacked.includes(i + 1) ?
          "<strong>Local time: CORRUPT</strong>" : "Local time: " + chain.blockChain[i].timestamp.toString().split("(")[0];
        item.appendChild(timeRow);

        let previousHashRow = document.createElement("p");
        previousHashRow.innerHTML = "Previous hash: " + chain.blockChain[i].previousHash;
        previousHashRow.setAttribute("data-hash", chain.blockChain[i].previousHash);
        previousHashRow.classList.add("hash");
        item.appendChild(previousHashRow);

        let newHashRow = document.createElement("p");
        newHashRow.innerHTML = blocksHacked != null && blocksHacked.includes(i + 1) ?
          "<strong>Corrupt new hash: " + chain.blockChain[i].newHash + "</strong>" :
          "New hash: " + chain.blockChain[i].newHash;
        newHashRow.setAttribute("data-hash", chain.blockChain[i].newHash);
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
