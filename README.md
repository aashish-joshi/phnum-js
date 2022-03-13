# sonetel-phnum-js

A JS library for displaying Sonetel phone numbers on customer's website. Written in [TypeScript](https://www.typescriptlang.org/).

### 1. Prerequisites for development

- Windows/*nix/macOS operating system
- text editor
- node.js v10.x+
- npm v6.x+

### 2. Brief architecture description

**Folder Structure**

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

### 3. Installing the project

1. Clone the repository contents
2. Run `npm install` command

### 4. Compiling the library

**Basic usage:**
```
npm run build
```

This command starts the build process, which results in putting the compiled `sonetel-phnum.min.js` library in the `dist/` folder.

### 5. How to use the library?

#### 5.1 On the browser

To use the compiled library, simply import it into the website using a script tag.

```
<script src="dist/sonetel-phnum.min.js" defer></script>
```

The script will check for a HTML element on the page with ID ```sonetel-disp-num```:
```
<span id="sonetel-disp-num" data-excludenum="" data-uri="num.json"></span>
```

Once it finds the element, it will:

1. Fetch the source of the phone number list from the attribute ```data-uri```. The URI should return a JSON response specified in section 5.2
2. Look at the ```data-excludenum``` attribute for a comma separated list of phone numbers to ignore. e.g. ```data-excludenum="861087833345, 31858884900,442036082900"```

#### 5.2 JSON response format

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