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

- change its content from module.exports (CommonJS) to export (ES6)

function greet(name) {
  return `Hi hi, ${name}!`;
}

export default greet;

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
to let npm know what the primary entry point is

"main": "index.js",
=>
"main": "dist/index.js",

c.f.,
app-test doesn't have to worry about it,
only libs, such as: lit-test,
have to use "main" to locate its primary entry point

-----

p.s.,
We can see the global symlink that was created by running:
> ls -al $(npm root -g)

and the local symlink that was created by running:
> ls -al ./node_modules
(which is used by app-test)

-----

if app-test wants to unlink from lib-test,
lib-test can't call 'unlink' before app-test call 'unlink lib-test'
that is, we have to follow the order below...

1. lib-test calls > npm link
2. app-test calls > npm link lib-test
3. app-test calls > npm unlink lib-test
4. lib-test calls > npm unlink

the order below won't work...
1. lib-test calls > npm link
2. app-test calls > npm link lib-test
3. lib-test calls > npm unlink
4. app-test calls > npm unlink lib-test

be careful!

-----

(4. Webpack alias, which is used by app-test)

-----

5. lib's own dependencies
add more dependencies to lib-test,
and test if after app-test 'npm i',
those dependencies are added automatically, or not.

- choose a lib for lib-test to use
first, I choose 'lodash' cuz it's most commonly used
but also cuz it's too popular, babel uses it as well
(that is, when installing babel, lodash is installed as well)
so, instead, I choose 'moment' to test

- the idea is, modify index.js to use moment
then see if app-test automatically add moment as dependency or not

- two approaches to test: 'npm link' and 'npm i'

5-1. npm link

- don't
> npm i moment
in lib-test

> npm link

go to app-test
> npm link lib-test
> npm start
to see if it works without installing moment

no, it can't
now install moment in app-test
> npm i moment
> npm start
no, it still can't

ok, uninstall moment in app-test first
> npm un moment

go back to lib-test
> npm i moment

don't have to
> npm run build
agin

go to app-test
> npm start
it works!

to sum up
when using 'npm link'
"we have to install lib-test's dependency", such as: moment
then app-test, without installing moment, can use lib-test

-----

5-2. npm i

first, uninstall moment

lib-test
> npm un moment
> npm run build
commit & push

