'use strict';
const path = require('path');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const askName = require('inquirer-npm-name');
const _ = require('lodash');
const extend = require('deep-extend');
const mkdirp = require('mkdirp');

function makeProjectName(name) {
  name = _.kebabCase(name);
  return name;
}

module.exports = class extends Generator {

  initializing() {
    this.props = {};
    this.answers = {};
  }

  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the awesome ${chalk.red('sap-a-team-haa project')} generator!`)
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to do this?',
        default: true
      }
    ];

		  /*
    return askName(
      {
        name: 'name',
        message: 'Your project name',
        default: makeProjectName(path.basename(process.cwd())),
        filter: makeProjectName,
        validate: str => {
          return str.length > 0;
        }
      },
      this
    ).then(props => {
      this.props.name = props.name;
    });
		  */
	  
    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname // Default to current folder name
      },
      {
        type: "input",
        name: "haa_uaa_res_name",
        message: "UAA resource name",
        default: "haa-uaa"
      },
      {
        type: "input",
        name: "haa_uaa_svc_name",
        message: "UAA service name",
        default: "HAA-UAA"
      },
      {
        type: "input",
        name: "haa_hdi_res_name",
        message: "HDI resource name",
        default: "haa-hdi"
      },
      {
        type: "input",
        name: "haa_hdi_svc_name",
        message: "HDI service name",
        default: "HAA-HDI"
      }

    ]);

    this.log("app name", this.answers.name);
	  
  }


  default() {
    if (path.basename(this.destinationPath()) !== this.answers.name) {
      this.log(
        `Your project must be inside a folder named ${
          this.answers.name
        }\nI'll automatically create this folder.`
      );
      mkdirp(this.answers.name);
      this.destinationRoot(this.destinationPath(this.answers.name));
    }

    const readmeTpl = _.template(this.fs.read(this.templatePath('README.md')));

  /*
    this.composeWith(require.resolve('generator-node/generators/app'), {
      boilerplate: false,
      name: this.props.name,
      projectRoot: 'generators',
      skipInstall: this.options.skipInstall,
      readme: readmeTpl({
        generatorName: this.props.name,
        yoName: this.props.name.replace('generator-', '')
      })
    });

    this.composeWith(require.resolve('../subgenerator'), {
      arguments: ['app']
    });
  */

    //this.composeWith(require.resolve('../haa-router'));
    //this.composeWith(require.resolve('../haa-module'));
  }

  writing() {

    // README.md
    //this.fs.copy(
    //  this.templatePath('README.md'),
    //  this.destinationPath('README.md')
    //);

    this.fs.copyTpl(this.templatePath('README.md'),this.destinationPath('README.md'),{ uaa_service_name: 'HAA_UAA' });

    this.fs.copyTpl(this.templatePath('mta.yaml'),this.destinationPath('mta.yaml'),{ 
	    app_name: this.answers.name, 
	    haa_uaa_res_name: this.answers.haa_uaa_res_name,
	    haa_uaa_svc_name: this.answers.haa_uaa_svc_name,
	    haa_hdi_res_name: this.answers.haa_hdi_res_name,
	    haa_hdi_svc_name: this.answers.haa_hdi_svc_name
    });

    this.fs.copyTpl(this.templatePath('mta_to_cf.mtaext'),this.destinationPath('mta_to_cf.mtaext'),{ app_name: this.answers.name });

    this.fs.copy(this.templatePath('xs-security.json'), this.destinationPath('xs-security.json'));
		  
  }

  install() {
    // this.installDependencies({ bower: false });
  }
  
  end() {
    this.composeWith(require.resolve('../haa-module'));
    //this.composeWith(require.resolve('../haa-router'));
  }
};
