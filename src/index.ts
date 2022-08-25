'use strict'
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js'
import { getUserCountry } from './getUserCountry'

const dataElement = document.querySelector('#show-best-num');
const VERSION = '0.3.0'

console.log('ShowBestNum:: Phone number display widget v' + VERSION)

// using the visitor's country, get the best phone number and format it.
async function getPhoneNumber(visitorCountryCode: string) {
  return await new Promise((resolve, reject) => {
    const numJsonUri = dataElement.dataset.uri as string
    fetch(numJsonUri)
      .then(async (response) => {
        return await response.json()
      })
      .then((data) => {
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// getUserCountry()
//   .then((data: any) => {
//     let customerCountry = (data).response.country_code;
//     getPhoneNumber();
//       .then((dataNum) => {
//         let displayNum: number = 0;
//         let displayNumCountry: CountryCode = 'US';

//         // Get the nums to be excluded
//         console.log("SONETEL: Account ID: " + dataElement.dataset.accountid);
//         //console.log(exclude.dataset.excludenum);

//         const excludeNums = dataElement.dataset.excludenum.split(",");

//         excludeNums.forEach(trimall);
//         
//         for (let nums of (<any>dataNum).response.numbers) {
//           if (excludeNums.indexOf(nums.e164number) !== -1) {
//             continue;
//           } else {
//             if (nums.iso.toUpperCase() === customerCountry) {
//               displayNum = nums.e164number;
//               displayNumCountry = nums.iso;
//               console.log("SONETEL: Display number from " + displayNumCountry);
//               break;
//             }
//           }
//         }
//         // if the number coun't be set by ISO, fetch the default entry.
//         if (displayNum == 0) {
//           displayNum = (<any>dataNum).response.default.e164number;
//           displayNumCountry = (<any>dataNum).response.default.iso;
//           console.log("SONETEL: Fallback to default phone number");
//         }

//         appendNumber(displayNum, displayNumCountry, customerCountry);
//       })
//       .catch((errNums) => {
//         console.error(errNums);
//       });
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// append the phone number to the document body
function appendNumber(displayNum: number, displayNumCountry: CountryCode, customerCountry: string): void {
  const formattedNumber = parsePhoneNumber(displayNum.toString(), displayNumCountry)

  const phNumDispElem = document.createElement('a')
  phNumDispElem.href = formattedNumber.getURI()

  let numberToDisplay
  if (customerCountry.toUpperCase() === displayNumCountry.toUpperCase()) {
    numberToDisplay = formattedNumber.formatNational()
    console.log('SONETEL: Using national number format')
  } else {
    numberToDisplay = formattedNumber.formatInternational()
    console.log('SONETEL: Using interational number format')
  }

  const numtext = document.createTextNode(numberToDisplay)
  phNumDispElem.appendChild(numtext)
  phNumDispElem.title = numberToDisplay
  const displayElem = document.getElementById('sonetel-disp-num')
  displayElem.appendChild(phNumDispElem)
}

const f = async () => {
  // Get the visitor's country from their IP
  const visitorCountry = await getUserCountry()
  // Get the phone number to be displayed based on the Visitor country
  const numList = await getPhoneNumber(visitorCountry.response.country_code)
  const displayNum: number = 0
  const displayNumCountry: CountryCode = 'US'
}
