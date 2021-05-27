# gif-resize
>a simple package to resize gifs while maintaining aspect ratio

# Install
```
$ npm install gif-resize
```

# Usage
```
const gifResize = require("gif-resize");
const fs = require("fs");

// you can also use a buffer
gifResize("tenor.gif", { width: 400, height: 390 }).then(file => {
    fs.writeFileSync("success.gif", file, "binary", (err) => {
        if (err) console.log(err);
    });
});
```
## Options 

* width: number
* height: number
* stretch: boolean