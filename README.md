# luzhanqi-util

Common utility functions for the Luzhanqi project.

## Installation

```bash
npm i @chinese-board-games/luzhanqi-util
```

## Usage

### ES6 import
```js
import * as luzhanqiUtil from '@chinese-board-games/luzhanqi-util';
// ...
luzhanqiUtil.isValidRow(0);
```

### CommonJS require
```js
const luzhanqiUtil = require('@chinese-board-games/luzhanqi-util');
// ...
luzhanqiUtil.isValidRow(0);
```

### AMD require
```js
require(['luzhanqiUtil'], function (luzhanqiUtil) {
  // ...
  luzhanqiUtil.isValidRow(0);
});
```

### Script tag
```html
<!doctype html>
<html>
  ...
  <script src="https://unpkg.com/@chinese-board-games/luzhanqi-util"></script>
  <script>
    // ...
    // Global variable
    luzhanqiUtil.isValidRow(0);
    // Property in the window object
    window.luzhanqiUtil.isValidRow(0);
    // ...
  </script>
</html>
```
## Examples
Coming soon!

## API
The JSDocs for this project are hosted [here](https://chinese-board-games.github.io/luzhanqi-util/).

## Local Build
1. Make sure you have Node v10 or greater installed on your system
2. Clone the repository: `git clone https://github.com/chinese-board-games/luzhanqi-util.git`
3. Install the dependencies: `npm install`
4. Run the tests: `npm test`

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
