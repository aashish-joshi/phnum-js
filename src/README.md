# How to customize

## 1. Prerequisites

- Windows/*nix/macOS operating system
- text editor
- node.js v16.x+
- npm v8.x+

## 1.1 Brief architecture description

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


## 1.2 Installing the project

1. Clone the repository
```bash
$ git clone git@github.com:aashish-joshi/phnum-js.git
```
2. Install NPM modules
```
$ npm ci
```

## 1.3 Compiling the library

<br>&nbsp;
**For Production**
<br>&nbsp;

This command starts the build process, which results in putting the compiled `showBestNumber.min.js` library in the `dist/` folder. The final JS is minified and ready for use in a production environment.

```
$ npm run build
```

<br>&nbsp;
**For Development**
<br>&nbsp;

```
$ npm run dev
```

This command starts the build process for a development environment. It is almost the same as the production build except that the compiled `showBestNumber.min.js` is not minified for easy debugging.
<br>&nbsp;