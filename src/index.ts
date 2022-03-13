import { CountryCode, parsePhoneNumber } from 'libphonenumber-js';
 
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
      const uriElem = document.querySelector("#sonetel-disp-num")! as HTMLElement;
      const numJsonUri = uriElem.dataset.uri! as string;
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
      let customerCountry = (<any>data).response.country_code;
      getPhoneNumber()
        .then((dataNum) => {
          let displayNum: number = 0;
          let displayNumCountry: CountryCode = 'US';
  
          // Get the nums to be excluded
          const exclude = document.querySelector("#sonetel-disp-num")! as HTMLElement;
          console.log("* Sonetel Phone Number Display JS *");
          console.log("SONETEL: Account ID: " + exclude.dataset.accountid);
          //console.log(exclude.dataset.excludenum);

          const excludeNums = exclude.dataset.excludenum.split(",");
          
          excludeNums.forEach(trimall);
          function trimall(item: string, index: number) {
            excludeNums[index] = item.trim();
          }
          for (let nums of (<any>dataNum).response.numbers) {
            if (excludeNums.indexOf(nums.e164number) !== -1) {
              continue;
            } else {
              if (nums.iso.toUpperCase() === customerCountry) {
                displayNum = nums.e164number;
                displayNumCountry = nums.iso;
                console.log("SONETEL: Display number from " + displayNumCountry);
                break;
              }
            }
          }
          // if the number coun't be set by ISO, fetch the default entry.
          if (displayNum == 0) {
            displayNum = (<any>dataNum).response.default.e164number;
            displayNumCountry = (<any>dataNum).response.default.iso;
            console.log("SONETEL: Using default display num");
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
  function appendNumber(displayNum: number, displayNumCountry: CountryCode, customerCountry: string) {
    const formattedNumber = parsePhoneNumber( displayNum.toString(), displayNumCountry );
  
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
    const displayElem = document.getElementById("sonetel-disp-num")! as HTMLElement;
    displayElem.appendChild(phNumDispElem);
  }