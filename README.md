#About

This is a boilerplate for new apps using a specific technology stack. It contains:

### Client side
- `ReactJS` for rendering components
- `Redux` for managing application state (client data store)

### Server side
- `node.js` web server
- `express.js` framework for app structure, routing, etc.

#Installation

### Download and install
1. Install and configure [node-gyp](https://github.com/nodejs/node-gyp)
1. Fork [the original repository](https://github.com/ionutmandra/IMReactStack)
1. Clone your forked repository `git clone https://github.com/<yourusername>/IMReactStack`
1. Open cmd in `folder` and run:
1. `git remote add upstream https://github.com/ionutmandra/IMReactStack`
1. `npm i`
1. `npm i gulp-cli -g`
1. `npm i nodemon -g`
1. `npm i mocha -g`
1. If node version has been updated run `npm rebuild`
 
### Start server & client
You can do one of the following:
- run `start.bat` in `folder` (optionally create a shortcut to it in `Startup` to have it run on Windows startup)

**- or -**
- open 2 consoles in `folder` and run:
- `nodemon server` (console 1)
- `gulp` (console 2)

### Production
- run `gulp deploy`. 
  This will:
  - minify css
  - uglify and minify source code
  - take off source maps
  - set process.env.NODE_ENV = 'production', so react code knows it's in production mode (https://facebook.github.io/react/downloads.html)
  - run unit tests
 
### Have fun :)
- open browser to localhost:8080 (or what the port says in the `nodemon` console)

# Chrome extensions

- [React developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
- [Redux dev tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

#Editor (optional)
1. install [Sublime Text 3](https://download.sublimetext.com/Sublime%20Text%20Build%203103%20x64%20Setup.exe)
1. `Preferences > Settings-user` should contain this (possibly among other settings):

    ```
    {...
     "folder_exclude_patterns":
     [
      ".svn",
      ".git",
      ".hg",
      "CVS",
      "node_modules"
     ],
      ...}
    ```
1. `Preferences > Key bindings-User` - add these:

    ```
    [
     { "keys": ["ctrl+m"], "command": "reindent" },
     { "keys": ["ctrl+-"], "command": "jump_back" },
    ]
    ```
1. [install the package manager](https://packagecontrol.io/installation) (`Ctrl + ~` then paste the code from the `Sublime text 3` tab)
1. `Ctrl + Shift + P > Package control: Install Package` > install `ReactJS`
1. `Ctrl + Shift + P > Package control: Install Package` > install `Babel`
1. `File > Open folder` - Select `folder`
1. open any `.js` file then `View > Syntax > Open all with current extension as > Babel > Javascript (babel)` - for correct syntax checking
