# Run.js

Global node.js task runner.

## Setup
1. `brew install node` (if you don't have node.js)

2. Clone this repo

3. `alias js="node <clone-path>/main.js"`

4. In the same directory, create `runfile.js`:
```javascript
module.exports = (js) => {
  js.task('taskname', 'Short description', () => {
    console.log(This task is pretty useless!);
  });
  
  ...
};
```

## Usage
Run using:
```
js <taskname> <args...>
```
