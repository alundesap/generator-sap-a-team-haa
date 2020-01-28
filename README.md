# generator-sap-a-team-haa [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> SAP A-Team HANA Analytics Adapter Project Generator

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

![Image of Screen](https://github.com/alundesap/generator-sap-a-team-haa/blob/master/img/C6C9C5D8-242D-4526-95F0-A6AC6850B4D1.png)


## License

MIT © [Andrew Lunde](https://github.com/alundesap)

