# Display Best Number

A free library for displaying the phone number that is closest to the visitor on your website - in a format that is familiar to them.

If you have phone numbers from multiple countries, you can use this library to automatically display the number that is best for the visitor on your website. Gets the visitor's location based on their IP address.

Written in [TypeScript](https://www.typescriptlang.org/).

**DEMO**

* URL: [sonetel-numwidget-js.netlify.app](https://sonetel-numwidget-js.netlify.app)
* Demo using proxy server: [Proxy server link](https://proxy-lon.hidemyass-freeproxy.com/proxy/en-in/aHR0cHM6Ly9zb25ldGVsLW51bXdpZGdldC1qcy5uZXRsaWZ5LmFwcC8)

Change the location in the proxy server to see how different numbers are displayed. If the number list doesn't contain a number from the location of the proxy, then it will show the default number instead.

## How to use the library?
<br>&nbsp;
Import the minified JS from the `dist/` into the website using a script tag.

### Direct
Copy the file `showBestNumber.min.js` into a folder in your website and use the `<script>` tag to load it.

### CDN

Alternatively, make use of the Free CDN courtsy the awesome folks at [jsdelivr.com](https://jsdelivr.com/).

```
<script src="https://cdn.jsdelivr.net/gh/aashish-joshi/phnum-js@main/dist/showBestNumber.min.js" defer></script>
```

The script will look for an HTML element on the page with ID ```sonetel-disp-num```:
```
<span id="show-best-num" data-uri="num.json"></span>
```

Once it finds the element, it will fetch the source of the phone number list from the attribute ```data-uri```. The URI should return a JSON response specified in section 2.2

<br>&nbsp;

## JSON response format
<br>&nbsp;

The resource at ```data-uri``` should return a JSON response in the following format. It can either be a link to a static `json` file or a API as long as the response is in the accepted format.

```
{
  "numbers": [
    {
      "iso": "US",
      "e164number": "18557663835"
    },
    {
      "iso": "GB",
      "e164number": "442036082900"
    }
  ],
  "default": [
    {
      "iso": "US",
      "e164number": "18557663835"
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