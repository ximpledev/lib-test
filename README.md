- add README.md

- npm init
version: (1.0.0) 0.0.1
license: (ISC) MIT

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

