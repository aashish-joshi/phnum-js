# Display Best Number

phnum-js is a free JavaScript library that automatically selects, from a list of given numbers, the best number to display for a visitor on your website in a format that they understand.

If you have phone numbers from multiple countries, you can use this library to automatically display the number that is best for the visitor on your website. Gets the visitor's location based on their IP address.

[Demo](https://aashish-joshi.github.io/phnum-js/demo.html).

## How to use the library?

### CDN

Use the Free CDN courtesy the awesome folks at jsDelivr.com.

```html
<script src="https://cdn.jsdelivr.net/gh/aashish-joshi/phnum-js@main/dist/showBestNumber.min.js" async></script>
```

### Directly

Alternatively, [download the script](dist/showBestNumber.min.js) from the `dist/` folder and move it into a folder in your website. Use the `<script>` tag to load it.

```html
<script src="/path/to/showBestNumber.min.js" async></script>
```


## Where will the phone number be shown?

The script will look for a HTML element on the page with ID `show-best-num`:

```html
<span id="show-best-num" data-uri="num.json"></span>
```

Once it finds the element, it will fetch the source of the phone number list from the attribute `data-uri`. The URI should return a JSON response specified in section 2.2

Feel free to use a different HTML element if needed.

## JSON response format

The resource at ```data-uri``` should return a JSON response in the following format. It can either be a link to a static `json` file or a API as long as the response is in the accepted format.

```json
{
	"numbers": [
		{
			"iso": "US",
			"e164number": "12125551234"
		},
		{
			"iso": "FR",
			"e164number": "33900000000"
		},
		{
			"iso": "NL",
			"e164number": "31858000000"
		}
	],
	"default": [
		{
			"iso": "US",
			"e164number": "12125551234"
		}
	]
}

```

### Explanation

Each phone number is defined in an object that contains the following keys:

- `iso` - The two letter [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.
- `e164number` - the full phone number with the country code and area code. For example, the US number `212-555-1234` is entered as `12125551234`.

The `default` number is the phone number that is displayed if there is no phone number from the website visitor's location.

A sample json file is included in the repository. Rename the file and edit it to include your phone numbers.

### Bugs and feedback

If you found an issue or wish to request for a feature, please [open an issue](https://github.com/aashish-joshi/phnum-js/issues).

### Contribute

All contributions are welcome.

Please read the [contribution guidelines](CONTRIBUTE.md) for more information.

## Acknowledgements

This project uses the following free services:

- CDN by [jsDeliver](https://www.jsdelivr.com/)
- IP address lookup by [ipapi](https://ipapi.co/)
