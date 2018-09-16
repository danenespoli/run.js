# Run.js

Global node.js task runner.

## Setup
Clone this repo and run: `alias js="node <clone-path>/main.js"`

In the same directory, create `runfile.js`:
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
