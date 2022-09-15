import * as constants from '../constants'

import { phoneNumberList } from '../interfaces/phoneNumberList'
import { CountryCode } from 'libphonenumber-js'

const displayElem = document.querySelector(constants.DISPLAY_ELEMENT) as HTMLElement

// using the visitor's country, get the best phone number and format it.
export async function getPhoneNumber(visitorCountryCode: string) {
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

  if(!visitorCountryCode){
    return response.default
  }

  const listCtr = (value: { "iso": CountryCode, "e164number": number }, index:number) =>{
    return value.iso.toUpperCase() == visitorCountryCode.toUpperCase()
  }

  const numToReturn = response.numbers.filter(listCtr)

  if(numToReturn.length > 0){
    return numToReturn
  }else{
    return response.default
  }
  
}