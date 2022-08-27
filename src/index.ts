'use strict'
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js'
import { getUserCountry } from './getUserCountry'
import { checkCache, setCache, cacheExpired } from './cache'

// Constants
import * as constants from './constants'

// Import interfaces
import { userCountry } from './interfaces/userCountry'
import { phoneNumberList } from './interfaces/phoneNumberList'

// Constants
const displayElem = document.querySelector(constants.DISPLAY_ELEMENT) as HTMLElement

console.log(`ShowBestNum:: Phone number display widget v${constants.VERSION}`)

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
        throw new Error(err)
      })
  }) as phoneNumberList

  function listCtr(value: { "iso": CountryCode, "e164number": number }, index:number, array: []){
    return value.iso.toUpperCase() == visitorCountryCode.toUpperCase()
  }

  const numToReturn = response.numbers.filter(listCtr)

  if(numToReturn.length > 0){
    return numToReturn
  }else{
    return response.default
  }
  
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

const main = async () => {
  let userCountry, numList, displayNum, displayNumCountry;

  if(!checkCache(constants.KEY_DISP_NUMBER) || cacheExpired()){

    // Data not cached or cache expired //

    // Get the visitor's country from their IP
    const userLocation = await getUserCountry() as userCountry
    userCountry = userLocation.country_code

    // Get the phone number to be displayed based on the Visitor country
    numList = await getPhoneNumber(userCountry)

    displayNum = numList[0].e164number as number
    displayNumCountry = numList[0].iso as CountryCode
    
    // Cache the data for 1 day
    const expiry = +new Date() + constants.CACHE_EXPIRY_TIME
    setCache(constants.KEY_DISPLAY_NUM_COUNTRY,displayNumCountry)
    setCache(constants.KEY_DISP_NUMBER,displayNum)
    setCache(constants.KEY_USER_COUNTRY,userCountry)
    setCache(constants.KEY_EXPIRY,expiry)
    
  }else{

    displayNum = +(localStorage.getItem(constants.KEY_DISP_NUMBER)) as number
    displayNumCountry = localStorage.getItem(constants.KEY_DISPLAY_NUM_COUNTRY) as CountryCode
    userCountry = localStorage.getItem(constants.KEY_USER_COUNTRY) as string

  }
  
  appendNumber(displayNum, displayNumCountry, userCountry)
}

main()