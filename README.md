# Display Best Number

A JS library for displaying the phone numbers that is closest to your visitor on your website. Written in [TypeScript](https://www.typescriptlang.org/).

If you have phone numbers from multiple countries, you can use this library to automatically display the number that is closest to the visitor on your website.

**DEMO**

* URL: [sonetel-numwidget-js.netlify.app](https://sonetel-numwidget-js.netlify.app)
* Demo using proxy server: [Proxy server link](https://proxy-lon.hidemyass-freeproxy.com/proxy/en-in/aHR0cHM6Ly9zb25ldGVsLW51bXdpZGdldC1qcy5uZXRsaWZ5LmFwcC8)

Change the location in the proxy server to see how different numbers are displayed. If the number list doesn't contain a number from the location of the proxy, then it will show the default number instead.

### 1. Prerequisites for development

- Windows/*nix/macOS operating system
- text editor
- node.js v10.x+
- npm v6.x+

#### 1.1 Brief architecture description

* The logic for fetching the website visitor's location and formatting/displaying the appropriate phone number resides in ```src/index.ts```.
* The library uses libphonenumber-js, a lightweight version of Google's libphonenumber library. This is included in the final JS file generated in ```dist/```.

<br>&nbsp;
**Folder Structure**
<br>&nbsp;
```
phnum-js/
    README.md
    node_modules/
    package.json
    src/
        index.ts
    dist/
        showBestNumber.min.js
    tsconfig.json
    package.json
    webpack.config.js
```


#### 1.2 Installing the project

1. Clone the repository
```bash
$ git clone git@github.com:aashish-joshi/phnum-js.git
```
2. Install NPM modules
```
$ npm ci
```

#### 1.3 Compiling the library

<br>&nbsp;
**For Production**
<br>&nbsp;

This command starts the build process, which results in putting the compiled `showBestNumber.min.js` library in the `dist/` folder. The final JS is minified and ready for use in a production environment.

```
$ npm run build:prod
```

<br>&nbsp;
**For Development**
<br>&nbsp;

```
$ npm run build:dev
```

This command starts the build process for a development environment. It is almost the same as the production build except that the compiled `showBestNumber.min.js` is not minified for easy debugging.
<br>&nbsp;

### 2. How to use the library?
<br>&nbsp;
Import the minified JS into the website using a script tag.

```
<script src="https://cdn.jsdelivr.net/gh/aashish-joshi/phnum-js@main/dist/showBestNumber.min.js" defer></script>
```

The script will look for an HTML element on the page with ID ```sonetel-disp-num```:
```
<span id="show-best-num" data-uri="num.json"></span>
```

Once it finds the element, it will fetch the source of the phone number list from the attribute ```data-uri```. The URI should return a JSON response specified in section 2.2

<br>&nbsp;

#### 2.2 JSON response format
<br>&nbsp;

The resource at ```data-uri``` should return a JSON response in the following format.

```
{
  "response": {
    "numbers": [
      {
        "iso": "US",
        "e164number": "18557663835"
      },
      ...
      {
        "iso": "GB",
        "e164number": "442036082900"
      }
    ],
    "default": {
      "iso": "US",
      "e164number": "18557663835"
    }
  }
}
```
