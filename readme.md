# gif-resizer
>a simple package to resize gifs while maintaining aspect ratio

# Install
```
$ npm install gif-resizer
```

# Usage
```js
const gifResize = require("gif-resizer");
const fs = require("fs");

// you can also use a buffer
gifResize("tenor.gif", { width: 400, height: 390 }).then(file => {
    fs.writeFileSync("success.gif", file)
});
```
## Options 

* width: number
* height: number
* stretch: boolean
* colors: number
* scale: number