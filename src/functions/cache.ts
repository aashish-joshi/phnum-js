import * as constants from '../constants'

export function setCache (cacheKey: string, data: any): void {
    localStorage.setItem(cacheKey, data);
}

export function checkCache(cacheKey: string): boolean {
    
    if(localStorage.getItem(cacheKey)){
        return true;
    }
    return false;
}

export function isCacheExpired(): boolean {

    if(localStorage.getItem(constants.KEY_EXPIRY)){
        const cacheExpiry = +(localStorage.getItem(constants.KEY_EXPIRY))
        const TS = +new Date()

        if(TS - cacheExpiry > 0){
            return true
        }
    }
    return true

}