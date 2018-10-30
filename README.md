lib-test & app-test are tested in pairs,
and the notes are writeen uniformly in this doc

=====

in both lib-test & app-test...

> npm init
...
version: (1.0.0) 0.0.1
...
license: (ISC) MIT
...

- add README.md

- add .gitignore
node_modules/

=====

1. using 'npm link'

[ref]
https://www.youtube.com/watch?v=N55jHr9qzpg

- add index.js (for lib-test) using CommonJS style

module.exports = (name) => {
  return `Hello ${name}!`;
}

-----

- add app.js (for app-test) using CommonJS style

const greet = require('lib-test');
console.log(greet('Jerry'));

-----

in lib-test
> npm link

done.
(& wait for app-test to link)

-----

in app-test
> npm link lib-test

then
> node app.js
or
> node app

done.

p.s.,
if lib-test has modifications,
app-test can automatically use it without help of any command.

-----

p.s.,
in both lib-test & app-test
we can see the 'global' symlink that was created by running:
> ls -al $(npm root -g)

and,
in app-test
we can see the 'local' symlink that was created by running:
> ls -al ./node_modules

=====

2. using npm install (git+)

before continuing, we have to remove 'npm link' first
by following the order:

in app-test
> node unlink lib-test

in lib-test
> npm unlink

----

p.s.,
the order below:

in lib-test
> npm unlink

in app-test
> node unlink lib-test

won't work,
be cautious!

=====

in lib-test
- change 'Hello' to 'Hi hi'
(then, lib-test has to do nothing in this step)

-----

2-1. using npm install (git+) with HTTPS (which is recommended by GitHub)

- go to lib-test GitHub repo, press 'Copy or download' button

- choose 'Clone with HTTPS', copy the URL
in this case:
'https://github.com/ximpledev/lib-test.git'

in app-test
- modify package.json

"dependencies": {
  "lib-test": "git+(...)",
}

paste 'https://github.com/ximpledev/lib-test.git' after 'git+'
=>
"dependencies": {
  "lib-test": "git+https://github.com/ximpledev/lib-test.git"
}

in app-test
> npm i

(there could be a GitHub login dialog pop-op,
fill in username & password, and we're good to go)

> node app.js

done.

p.s.,
if lib-test has modifications,
app-test can't automatically use it

instead, we have to use npm commands...
> npm update

then app-test can use the latest lib-test

-----

2-2. using npm install (git+) with SSH

in app-test
> npm uninstall lib-test
to remove the dependency gotten using HTTPS

- go to lib-test GitHub repo, press 'Copy or download' button again

- choose 'Clone with SSH', copy the URL
in this case:
'git@github.com:ximpledev/lib-test.git'

in app-test
- modify package.json

"dependencies": {
  "lib-test": "git+ssh://(...)",
}

paste 'git@github.com:ximpledev/lib-test.git' after 'git+ssh://'
=>
"dependencies": {
  "lib-test": "git+ssh://git@github.com:ximpledev/lib-test.git"
}

p.s.,
if we haven't set up SSH, follow the steps below to set up
[ref]
https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/

-----

in app-test
> npm i
> node app.js

done.

-----

p.s.,
after testing how to use npm install (git+),
uninstall it and, for convenience, use 'npm link' instead, for simple tests, if you wish

=====

3. using Babel

in both lib-test & app-test
> npm i -D babel-cli babel-core babel-preset-env
(not babel-env, be cautious)

in lib-test
- move index.js to src/index.js
&
in app-test
- move app.js to src/app.js

cuz we want to use src/ to place our ES6 code
and dist/ to place transpiled code

-----

- change contents from CommonJS to ES6

in lib-test, src/index.js

function greet(name) {
  return `Hi hi, ${name}!`;
}

export default greet;

-----

in app-test, src/app.js

import greet from 'lib-test';
console.log(greet('Jerry'));

-----

in both lib-test & app-test
- modify package.json
"scripts": {
  "build": "babel src/ -d dist/",
  ...
}

> npm run build
dist/ will be created
but index.js/app.js in it haven't been transpiled

-----

in both lib-test & app-test
- modify package.json
"scripts": {
  "clean": "rm -rf dist/",
  "build": "npm run clean && babel src/ -d dist/",
  ...
}
to remove dist/ every time before building

in both lib-test & app-test
- add .babelrc
{
  "presets": [
    "env"
  ]
}

> npm run build
index.js/app.js in dist/ are now successfully transpiled

-----

in lib-test
- modify package.json
to let npm know what the primary entry point is

"main": "index.js",
=>
"main": "dist/index.js",

but in app-test
- we don't have to modify package.json
to let npm know what the primary main entry point is

just use
"main": "",
cuz it's not a lib

but instead,
in app-test
we modify package.json

"scripts": {
  "start": "node dist/app.js",
  ...
}

> npm start
to start this app

=====

4. Webpack alias

(in this step,
lib-test has to do nothing)

when using Webpack,
we can use its 'alias' to replace 'npm link', if you wish

e.g.,
in app-test, webpack.config.js

add
const LIB_DIR = path.resolve(__dirname, '../libs/lib-test');
...
module.exports = (env={}) => {
  ...
  return {
    ...
    resolve: {
      extensions: ['.js', '.jsx'], // default: ['.js', '.json']
        alias: {
          styles: path.resolve(SRC_DIR, 'styles'),
          images: path.resolve(SRC_DIR, 'assets/images'),
          'lib-test': LIB_DIR
        }
      }
    },
    ...
  }
}

then you can use lib-test by importing it

e.g.,
import greet from 'lib-test';
const greeting = greet('Jerry');

-----

in my point of view,
'npm link' uses global folders,
that is, we can't use 'npm link' for two modules with the same name

'Webpack aliases' use relative paths

when using Webpack, Webpack alias is a better choice
but whether using Webpack or not, npm link is simpler

=====

5. lib's own dependencies

our goal:
add more dependencies to lib-test,
and test if after app-test 'npm i'
those dependencies are added automatically or not.

-----

- choose a 3rd-party module for lib-test to use

p.s.,
first, I choose 'lodash' cuz it's most commonly used
but also cuz it's too popular, babel uses it as well
(that is, when installing babel, lodash is installed as well)
so, instead, I choose 'moment' to test

- the idea is,
modify lib-test's src/index.js to use 'moment'
then see if app-test automatically add moment module as dependency or not

import moment from 'moment';

function greet(name) {
  return `Hello ${name}, it's ${moment().format('YYYY/MM/DD HH:mm:ss')}!`;
}

export default greet;

-----

- two approaches to test: 'npm link' and 'npm i'

5-1. npm link

in lib-test
don't
> npm i moment

just
> npm link

in app-test
> npm link lib-test
> npm start
to see if it works without lib-test installed moment first

no, it can't!

-----

now install moment in app-test
(and still, don't install moment in lib-test)

in app-test
> npm i moment
> npm start
no, it still can't

-----

ok, uninstall moment in app-test first
> npm un moment

go back to lib-test, and install moment
> npm i moment

don't have to
> npm run build
agin

go to app-test
> npm start
it works!

-----

to sum up
when using 'npm link'
"we have to install the module in lib-test", such as: moment module

then app-test, without installing that module, can use lib-test

-----

5-2. npm i

first, uninstall moment

in lib-test
> npm un moment
> npm run build
although moment hasn't been installed, it's ok to build successfully
then commit & push

in app-test
modify package.json

"dependencies": {
  "lib-test": "git+https://github.com/ximpledev/lib-test.git"
}

> npm i
notice that, moment isn't automatically installed after installing lib-test

> npm start
no, it doesn't work, moment module can't be find

-----

- go back to lib-test
> npm i moment
now in package.json

"dependencies": {
  "moment": "^2.22.2"
}

- don't have to
> npm run build
cuz the point is...
package.json has been updated, not the contents in dist/

- commit & push

- go to app-test
> npm start
can't work cuz still, moment can't be find

in app-test
> npm update
"the moment module has been installed in node_modules/
but not appear in package.json dependencies"

> npm start
it works!

-----

and now, interestingly,

in app-test, if we
> npm un moment
we can't uninstall moment module in node_modules/
cuz moment module desn't in package.json

but if we uninstall lib-test
moment modules (in node_modules/) will be uninstall as well.

-----

- to sum up
first,
we have to install the module (such as: moment)
whether using 'npm link' or 'npm i'

then,
the difference between 'npm link' & 'npm i' is...

when using 'npm link',
app-test doesn't install the lib-test's dependent modules (such as: moment) in node_modules/

but when using 'npm i',
app-test installs the lib-test's dependent modules (such as: moment) in node_modeles/,
but not appear in app-test's package.json
