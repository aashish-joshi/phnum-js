import { CountryCode, parsePhoneNumber } from 'libphonenumber-js'
import * as constants from '../constants'

// Constants
const displayElem = document.querySelector(constants.DISPLAY_ELEMENT) as HTMLElement

// append the phone number to the document body
export function appendNumber(displayNum: number, displayNumCountry: CountryCode, customerCountry: string): void {
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