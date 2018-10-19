- npm init
version: (1.0.0) 0.0.1
license: (ISC) MIT

- add README.md

-----

1. using 'npm link'

[ref]
https://www.youtube.com/watch?v=N55jHr9qzpg

- add index.js

- add content to index.js with CommonJS style

module.exports = (name) => {
  return `Hello ${name}!`;
}

- npm link

done.
(& wait for app-test to link)

-----

2. using npm install (git+)

- npm unlink

- change 'Hello' to 'Hi hi'

(then, lib-test has to do nothing in this step)

-----

3. using Babel

- npm i -D babel-cli babel-core babel-preset-env

- add .gitignore
node_modules/

- move index.js to src/index.js
(cuz we want to use src/ to put ES6 code and dist/ to put Babel-transpiled code)

- modify package.json
"scripts": {
  "build": "babel src/ -d dist/",
  ...
}

- npm run build
dist/ will be created but index.js in it hasn't been transpiled

- modify package.json
"scripts": {
  "prebuild": "rm -rf dist/",
  ...
}
to remove dist/ every time before building

- add .babelrc
{
  "presets": [
    "env"
  ]
}

- npm run build
now dist/index.js is transpiled

- modify package.json
to let npm know what the primary main entry point is

"main": "index.js",
=>
"main": "dist/index.js",
