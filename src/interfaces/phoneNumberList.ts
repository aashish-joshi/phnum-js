import { CountryCode } from "libphonenumber-js"

export interface phoneNumberList {
    numbers: [
        {
			"iso": CountryCode,
			"e164number": number
		}
    ],
    default: [
        {
            "iso": CountryCode,
		    "e164number": number
        }
    ]
}