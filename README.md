# sonetel-phnum-js

A JS library for displaying Sonetel phone numbers on customer's website. Written in [TypeScript](https://www.typescriptlang.org/).

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
sonetel-phnum-js/
    README.md
    node_modules/
    package.json
    src/
        index.ts
    dist/
        sonetel-phnum.min.js
    tsconfig.json
    package.json
    webpack.config.js
```


#### 1.2 Installing the project

1. Clone the repository contents
2. Run `npm install` command

#### 1.3 Compiling the library

<br>&nbsp;
**For Production**
<br>&nbsp;

This command starts the build process, which results in putting the compiled `sonetel-phnum.min.js` library in the `dist/` folder. The final JS is minified and ready for use in a production environment.

```
npm run build:prod
```

<br>&nbsp;
**For Development**
<br>&nbsp;
```
npm run build:dev
```
This command starts the build process for a development environment. It is almost the same as the production build except that the compiled `sonetel-phnum.min.js` is not minified for easy debugging.

<br>&nbsp;

### 2. How to use the library?
<br>&nbsp;

#### 2.1 On the browser
<br>&nbsp;

These are instructions for the end-user to use the compiled library. Start by importing the minified JS into the website using a script tag.

```
<script src="dist/sonetel-phnum.min.js" defer></script>
```

The script will look for an HTML element on the page with ID ```sonetel-disp-num```:
```
<span id="sonetel-disp-num" data-excludenum="" data-uri="num.json"></span>
```

Once it finds the element, it will:

1. Fetch the source of the phone number list from the attribute ```data-uri```. The URI should return a JSON response specified in section 5.2
2. Look at the ```data-excludenum``` attribute for a comma separated list of phone numbers to ignore. e.g. ```data-excludenum="861087833345, 31858884900,442036082900"```
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
