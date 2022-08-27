'use strict'
import { CountryCode, parsePhoneNumber, PhoneNumber } from 'libphonenumber-js'
import { getUserCountry } from './getUserCountry'

// Import interfaces
import { userCountry } from './interfaces/userCountry'
import { phoneNumberList } from './interfaces/phoneNumberList'

// Constants
const displayElem = document.querySelector('#show-best-num') as HTMLElement
const VERSION = '1.0.0'

console.log(`ShowBestNum:: Phone number display widget v${VERSION}`)

// using the visitor's country, get the best phone number and format it.
async function getPhoneNumber(visitorCountryCode: string) {
  const numJsonUri = displayElem.dataset.uri as string

  const response = await new Promise((resolve, reject) => {
    fetch(numJsonUri)
      .then(async (response) => {
        if(response.ok){
          return await response.json()
        }else{
          throw new Error(response.statusText)
        }
      })
      .then((data) => {
        resolve(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }) as phoneNumberList

  function listCtr(value: { "iso": CountryCode, "e164number": number }, index:number, array: []){
    return value.iso.toUpperCase() == visitorCountryCode.toUpperCase()
  }

  return response.numbers.filter(listCtr)
  
}

// append the phone number to the document body
function appendNumber(displayNum: number, displayNumCountry: CountryCode, customerCountry: string): void {
  const formattedNumber = parsePhoneNumber(displayNum.toString(), displayNumCountry)

  const phNumDispElem = document.createElement('a')
  phNumDispElem.href = formattedNumber.getURI()

  let numberToDisplay
  if (customerCountry.toUpperCase() === displayNumCountry.toUpperCase()) {
    numberToDisplay = formattedNumber.formatNational()
  } else {
    numberToDisplay = formattedNumber.formatInternational()
  }

  const numtext = document.createTextNode(numberToDisplay)
  phNumDispElem.appendChild(numtext)
  phNumDispElem.title = numberToDisplay
  displayElem.appendChild(phNumDispElem)
}

const f = async () => {
  // Get the visitor's country from their IP
  const userCountry = await getUserCountry() as userCountry
  // Get the phone number to be displayed based on the Visitor country
  const numList = await getPhoneNumber(userCountry.country_code)
  console.log(numList)
  const displayNum: number = numList[0].e164number
  const displayNumCountry: CountryCode = numList[0].iso
  appendNumber(displayNum, displayNumCountry, userCountry.country_code)
}

f()