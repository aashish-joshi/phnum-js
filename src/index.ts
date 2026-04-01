'use strict'
import { CountryCode } from 'libphonenumber-js'
import { getUserCountry } from './functions/getUserCountry'
import { checkCache, setCache, isCacheExpired } from './functions/cache'
import { getPhoneNumber } from './functions/getPhoneNumber'
import {appendNumber} from './functions/appendNumber'

// Constants
import * as constants from './constants'

// Import interfaces
import { userCountry } from './interfaces/userCountry'

console.log(`ShowBestNum:: Phone number display widget v${constants.VERSION}`)

const main = async () => {
  let userCountry, numList, displayNum, displayNumCountry;

  if(!checkCache(constants.KEY_DISP_NUM) || isCacheExpired()){

    // Data not cached or cache expired //

    try {
      // Get the visitor's country from their IP
      const userLocation = await getUserCountry() as userCountry
      userCountry = userLocation.country_code
    } catch (error) {
      console.log('ShowBestNum:: Cannot get country based on IP. Using defaults.');
      userCountry = ''
    }
    
    // Get the phone number to be displayed based on the Visitor country
    numList = await getPhoneNumber(userCountry)

    displayNum = numList[0].e164number as number
    displayNumCountry = numList[0].iso as CountryCode
    
    // Cache the data for 1 day
    const expiry = +new Date() + constants.CACHE_EXPIRY_TIME
    setCache(constants.KEY_DISP_NUM_COUNTRY,displayNumCountry)
    setCache(constants.KEY_DISP_NUM,displayNum)
    setCache(constants.KEY_USER_COUNTRY,userCountry)
    setCache(constants.KEY_EXPIRY,expiry)
    
  }else{

    const cachedNum = localStorage.getItem(constants.KEY_DISP_NUM)
    const cachedCountry = localStorage.getItem(constants.KEY_DISP_NUM_COUNTRY)
    const cachedUserCountry = localStorage.getItem(constants.KEY_USER_COUNTRY)

    if (!cachedNum || !cachedCountry || !/^\d+$/.test(cachedNum) || !/^[A-Z]{2}$/i.test(cachedCountry)) {
      localStorage.removeItem(constants.KEY_DISP_NUM)
      localStorage.removeItem(constants.KEY_DISP_NUM_COUNTRY)
      localStorage.removeItem(constants.KEY_USER_COUNTRY)
      localStorage.removeItem(constants.KEY_EXPIRY)
      console.log('ShowBestNum:: Cached data is invalid. Will re-fetch on next load.')
      return
    }

    displayNum = +cachedNum
    displayNumCountry = cachedCountry as CountryCode
    userCountry = cachedUserCountry!

  }
  
  appendNumber(displayNum, displayNumCountry, userCountry)
}

main()