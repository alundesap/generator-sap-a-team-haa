# generator-sap-a-team-haa [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> SAP A-Team HANA Analytics Adapter Project

## Installation

First, install [Yeoman](http://yeoman.io) and generator-sap-a-team-haa using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-sap-a-team-haa
```

If you git clone this repo, get it to show up in Yeoman by using npm link from the repo directory. (sudo if perm issues)
```
npm link
sudo npm link
```
Yeoman looks for generators installed in:
```
cd /usr/local/lib/node_modules/
```

For SAP Application Studio (Beta).  Open a new terminal.
```
cd ~
mkdir generators
cd generators
git clone https://github.com/alundesap/generator-sap-a-team-haa.git
npm install -g generator-sap-a-team-haa
cd ~
cd projects
```

Then generate your new project:

```bash
yo sap-a-team-haa
```

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Andrew Lunde](https://github.com/alundesap)


[npm-image]: https://badge.fury.io/js/generator-sap-a-team-haa.svg
[npm-url]: https://npmjs.org/package/generator-sap-a-team-haa
[travis-image]: https://travis-ci.com/alundesap/generator-sap-a-team-haa.svg?branch=master
[travis-url]: https://travis-ci.com/alundesap/generator-sap-a-team-haa
[daviddm-image]: https://david-dm.org/alundesap/generator-sap-a-team-haa.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/alundesap/generator-sap-a-team-haa
