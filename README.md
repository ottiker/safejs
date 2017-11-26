# safejs
A more abstract SAFE DOM API

## Methods
#### Factory
Example:
```js
import Safejs = from "./index.js"

Safejs({
    id: "my.safe.web.app",
    name: "WebApp Test8",
    vendor: "vendor inc.",
    containers: {
        "_documents": ["Read", "Insert", "Update", "Delete"]
    },
    own_container: true
}).then((appInst) => {

    // use app instance..
    app.fs.read(address).then(console.log.bind(console));

    // use app instance..
    app.fs.readUtf8(address).then(console.log.bind(console));
});
```

#### App.fs.read
#### App.fs.readUtf8
#### App.fs.write
#### ...
