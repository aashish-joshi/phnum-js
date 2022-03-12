// Load libphonenumber library
function loadScript(url) {
  var head = document.head;
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  head.appendChild(script);
}

loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/libphonenumber-js/1.9.49/libphonenumber-js.min.js"
);

// Get the visitor's country
function getUserCountry() {
  return new Promise((resolve, reject) => {
    fetch("https://api.sonetel.com/geo-location/ipaddress/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// using the visitor's country, get the best phone number and format it.
function getPhoneNumber() {
  return new Promise((resolve, reject) => {
    uriElem = document.querySelector("#sonetel-disp-num");
    numJsonUri = uriElem.dataset.uri;
    fetch(numJsonUri)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

getUserCountry()
  .then((data) => {
    let customerCountry = data.response.country_code;
    getPhoneNumber()
      .then((dataNum) => {
        let displayNum;
        let displayNumCountry;

        // Get the nums to be excluded
        exclude = document.querySelector("#sonetel-disp-num");
        excludeNums = exclude.dataset.excludenum.split(",");
        excludeNums.forEach(trimall);
        function trimall(item, index) {
          excludeNums[index] = item.trim();
        }
        for (let nums of dataNum.numbers) {
          //console.log("number: " +nums.e164number);
          //console.log("indexof" + excludeNums.indexOf(nums.e164number))
          if (excludeNums.indexOf(nums.e164number) !== -1) {
            continue;
          } else {
            if (nums.iso.toUpperCase() === customerCountry) {
              displayNum = nums.e164number;
              displayNumCountry = nums.iso;
              break;
            }
          }
        }
        // if the number coun't be set by ISO, fetch the default entry.
        if (displayNum === undefined) {
          displayNum = dataNum.default.e164number;
          displayNumCountry = dataNum.default.iso;
          //console.log("Using default display num");
        }

        appendNumber(displayNum, displayNumCountry, customerCountry);
      })
      .catch((errNums) => {
        console.error(errNums);
      });
  })
  .catch((err) => {
    console.error(err);
  });

// append the phone number to the document body
function appendNumber(displayNum, displayNumCountry, customerCountry) {
  const formattedNumber = new libphonenumber.parsePhoneNumber(
    displayNum,
    displayNumCountry
  );

  const phNumDispElem = document.createElement("a");
  phNumDispElem.href = formattedNumber.getURI();

  let numberToDisplay;
  if (customerCountry.toUpperCase() === displayNumCountry.toUpperCase()) {
    numberToDisplay = formattedNumber.formatNational();
    //console.log("Using national format");
  } else {
    numberToDisplay = formattedNumber.formatInternational();
    //console.log("Using interational format");
  }

  const numtext = document.createTextNode(numberToDisplay);
  phNumDispElem.appendChild(numtext);
  phNumDispElem.title = numberToDisplay;
  document.getElementById("sonetel-disp-num").appendChild(phNumDispElem);
}