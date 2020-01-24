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

function check_new(so_far) { 
  if (so_far.new_ext == "new") { 
    return true; 
  } 
  else { 
    return false; 
  } 
}

function check_ext(so_far) { 
  if (so_far.new_ext == "ext") { 
    return true; 
  } 
  else { 
    return false; 
  } 
}

function get_landscape_domain(so_far) { 
  //return JSON.stringify(so_far);
  var retstr = "cfapps." + so_far.deploy_landscape + ".hanna.ondemand.com";
  //var existing_default = so_far.defaults.deploy_dnsdomain;
  //if (existing_default.substr(0,6) != "cfapps") {
  //  retstr = existing_default;
  //}
  return retstr;
}


module.exports = class extends Generator {

  initializing() {
    this.props = {};
    this.answers = {};
    this.config.defaults({ 
      "project_name": this.appname,
      "app_name": "haa",

      "haa_module_name": "haa-ina",
      "haa_module_dir": "haa-java",

      "haa_router_name": "haa-web",
      "haa_router_dir": "haa-entry",

      "haa_db_name": "haa-hdb",
      "haa_db_dir": "haa-db",

      "db_schema_name": "HAADB",

      "ded_shd": "ded",

      "haa_uaa_res_name": "haa-uaa",
      "haa_uaa_svc_name": "HAA_UAA",

      "new_ext": "new",

      "haa_hdi_res_name": "haa-hdi",
      "haa_hdi_svc_name": "HAA_HDI",

      "sac_host": "ateam-isveng.us10.sapanalytics.cloud",
      "deploy_landscape": "us10",
      "deploy_dnsdomain": "cfapps.<landscape>.hana.ondemand.com",
      "subacct_subdomain": "your_subdomain",
      "deploy_space": "your_space"
    });    
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
    
    // https://github.com/SBoudrias/Inquirer.js#question

    this.answers = await this.prompt([
      {
        type: "input",
        name: "project_name",
        message: "Enter your project folder name (will be created if necessary).",
        default: this.config.get("project_name") // Default to current folder name
      },
      {
        type: "input",
        name: "app_name",
        message: "Enter your project application name.",
        default: this.config.get("app_name") // Default to current folder name
      },

      {
        type: "input",
        name: "haa_module_name",
        message: "HAA module name(will provide the INA interface).",
        default: this.config.get("haa_module_name")
      },
      {
        type: "input",
        name: "haa_module_dir",
        message: "HAA module path",
        default: this.config.get("haa_module_dir")
      },
      {
        type: "input",
        name: "haa_router_name",
        message: "HAA router name(the application router).",
        default: this.config.get("haa_router_name")
      },
      {
        type: "input",
        name: "haa_router_dir",
        message: "HAA router path",
        default: this.config.get("haa_router_dir")
      },

      {
        type: "list",
        name: "ded_shd",
        message: "Pick an authorization model Dedicated(Stand-Alone) or Shared(Multi-Tenant).",
        choices: [{"name": "Dedicated", "value": "ded"},{"name": "Shared", "value": "shd"}],
        default: this.config.get("ded_shd") // Default to current folder name
      },
      {
        type: "input",
        name: "haa_uaa_res_name",
        message: "UAA resource name",
        default: this.config.get("haa_uaa_res_name")
      },
      {
        type: "input",
        name: "haa_uaa_svc_name",
        message: "UAA service name",
        default: this.config.get("haa_uaa_svc_name")
      },
      {
        type: "list",
        name: "new_ext",
        message: "Do you want to include a new(sample) HDI container or use an existing HDI container?",
        choices: [{"name": "New HDI Container", "value": "new"},{"name": "Existing HDI Container", "value": "ext"}],
        default: this.config.get("new_ext") // Default to current folder name
      },
      {
        type: "input",
        name: "haa_hdi_res_name",
        message: "HDI resource name",
        default: this.config.get("haa_hdi_res_name")
      },
      {
        when: check_new,
        type: "input",
        name: "haa_hdi_svc_name",
        message: "HDI service name.",
        default: this.config.get("haa_hdi_svc_name")
      },
      {
        when: check_ext,
        type: "input",
        name: "haa_hdi_svc_name",
        prefix: "Run this command 'cf s | grep hdi-shared' to list containers.\n",
        message: "HDI service name (Make sure it exists!)",
        default: this.config.get("haa_hdi_svc_name")
      },
      {
        when: check_new,
        type: "input",
        name: "haa_db_name",
        message: "DB Module Name.",
        default: this.config.get("haa_db_name")
      },
      {
        when: check_new,
        type: "input",
        name: "haa_db_dir",
        message: "DB Module path.",
        default: this.config.get("haa_db_dir")
      },
      {
        when: check_new,
        type: "input",
        name: "db_schema_name",
        message: "DB Schema Name.",
        default: this.config.get("db_schema_name")
      },
      {
        type: "input",
        name: "sac_host",
        message: "Your SAP Analytic Cloud Hostname",
        default: this.config.get("sac_host")
      },
      {
        type: "list",
        name: "deploy_landscape",
        message: "SAP Cloud Landscape.",
        choices: [
          {"name": "US East (VA) AWS = us10", "value": "us10"},
          {"name": "US West (WA) Azu = us20", "value": "us20"},
          {"name": "US Central (IA) GCP = us30", "value": "us30"},
          {"name": "Europe (Frankfurt) AWS = eu10", "value": "eu10"},
          {"name": "Europe (Netherlands) Azu = eu20", "value": "eu20"},
          {"name": "Japan (Tokyo) AWS = jp10", "value": "jp10"},
          {"name": "Japan (Tokyo) Azu = jp20", "value": "jp20"},
          {"name": "Brazil (São Paulo) AWS = br10", "value": "br10"},
          {"name": "Australia (Sydney) AWS = ap10", "value": "ap10"},
          {"name": "Canada (Montreal) AWS = ca10", "value": "ca10"},
          {"name": "Singapore AWS = ap11", "value": "ap11"}
        ],
        default: this.config.get("deploy_landscape")
      },
      {
        type: "input",
        name: "deploy_dnsdomain",
        message: "DNS Domain provisioned in your space.",
        default: get_landscape_domain
      },
      {
        type: "input",
        name: "subacct_subdomain",
        message: "Subaccount's subdomain.",
        default: this.config.get("subacct_subdomain")
      },
      {
        type: "input",
        name: "deploy_space",
        message: "CloudFoundry space you're deploying into.",
        default: this.config.get("deploy_space")
      }
   
    ]);

    this.log("app name", this.answers.project_name);
	  
  }


  default() {
    if (path.basename(this.destinationPath()) !== this.answers.project_name) {
      this.log(
        `Your project must be inside a folder named ${
          this.answers.project_name
        }\nI'll automatically create this folder.  Change into it with "cd ${
          this.answers.project_name
        }"`
      );
      mkdirp(this.answers.project_name);
      this.destinationRoot(this.destinationPath(this.answers.project_name));
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
    this.config.set("project_name", this.answers.project_name);
    this.config.set("app_name", this.answers.app_name);

    this.config.set("haa_module_name", this.answers.haa_module_name);
    this.config.set("haa_module_dir", this.answers.haa_module_dir);

    this.config.set("haa_router_name", this.answers.haa_router_name);
    this.config.set("haa_router_dir", this.answers.haa_router_dir);

    this.config.set("haa_db_name", this.answers.haa_db_name);
    this.config.set("haa_db_dir", this.answers.haa_db_dir);

    this.config.set("db_schema_name", this.answers.db_schema_name);

    this.config.set("haa_uaa_res_name", this.answers.haa_uaa_res_name);
    this.config.set("haa_uaa_svc_name", this.answers.haa_uaa_svc_name);
    this.config.set("haa_hdi_res_name", this.answers.haa_hdi_res_name);
    this.config.set("haa_hdi_svc_name", this.answers.haa_hdi_svc_name);
    this.config.set("sac_host", this.answers.sac_host);
    this.config.set("deploy_landscape", this.answers.deploy_landscape);
    this.config.set("deploy_dnsdomain", this.answers.deploy_dnsdomain);
    this.config.set("subacct_subdomain", this.answers.subacct_subdomain);
    this.config.set("deploy_space", this.answers.deploy_space);

    this.config.set("ded_shd", this.answers.ded_shd);
    this.config.set("new_ext", this.answers.new_ext);

    this.config.save();
    // README.md
    // this.fs.copy(
    //  this.templatePath('README.md.'+this.answers.ded_shd+this.answers.new_ext),
    //  this.destinationPath('README.md')
    // );

    this.fs.copyTpl(this.templatePath('README.md.'+this.answers.ded_shd+this.answers.new_ext),this.destinationPath('README.md'),
      { 
        "project_name": this.answers.project_name,
        "app_name": this.answers.app_name,

        "haa_module_name": this.answers.haa_module_name,
        "haa_module_dir": this.answers.haa_module_dir,

        "haa_router_name": this.answers.haa_router_name,
        "haa_router_dir": this.answers.haa_router_dir,

        "haa_db_name": this.answers.haa_db_name,
        "haa_db_dir": this.answers.haa_db_dir,
        "db_schema_name": this.answers.db_schema_name,

        "haa_uaa_res_name": this.answers.haa_uaa_res_name,
        "haa_uaa_svc_name": this.answers.haa_uaa_svc_name,
        "haa_hdi_res_name": this.answers.haa_hdi_res_name,
        "haa_hdi_svc_name": this.answers.haa_hdi_svc_name,
        "sac_host": this.answers.sac_host,
        "deploy_landscape": this.answers.deploy_landscape,
        "deploy_dnsdomain": this.answers.deploy_dnsdomain,
        "subacct_subdomain": this.answers.subacct_subdomain,
        "deploy_space": this.answers.deploy_space
      }
    );

    this.fs.copyTpl(this.templatePath('mta.yaml.'+this.answers.ded_shd+this.answers.new_ext),this.destinationPath('mta.yaml'),
      { 
        "project_name": this.answers.project_name,
        "app_name": this.answers.app_name,

        "haa_module_name": this.answers.haa_module_name,
        "haa_module_dir": this.answers.haa_module_dir,

        "haa_router_name": this.answers.haa_router_name,
        "haa_router_dir": this.answers.haa_router_dir,

        "haa_db_name": this.answers.haa_db_name,
        "haa_db_dir": this.answers.haa_db_dir,
        "db_schema_name": this.answers.db_schema_name,

        "haa_uaa_res_name": this.answers.haa_uaa_res_name,
        "haa_uaa_svc_name": this.answers.haa_uaa_svc_name,
        "haa_hdi_res_name": this.answers.haa_hdi_res_name,
        "haa_hdi_svc_name": this.answers.haa_hdi_svc_name,
        "sac_host": this.answers.sac_host,
        "deploy_landscape": this.answers.deploy_landscape,
        "deploy_dnsdomain": this.answers.deploy_dnsdomain,
        "subacct_subdomain": this.answers.subacct_subdomain,
        "deploy_space": this.answers.deploy_space
      }
    );

    this.fs.copyTpl(this.templatePath('xs-security.json.'+this.answers.ded_shd),this.destinationPath('xs-security.json'), 
      { 
        "haa_router_name": this.answers.haa_router_name,
        "deploy_dnsdomain": this.answers.deploy_dnsdomain,
        "app_name": this.answers.app_name
      }
    );

    this.fs.copy( this.templatePath('haa-entry/package.json'), this.destinationPath(this.answers.haa_router_dir + '/package.json'));
    this.fs.copy( this.templatePath('haa-entry/xs-app.json.'+this.answers.ded_shd), this.destinationPath(this.answers.haa_router_dir + '/xs-app.json'));
    this.fs.copyTpl(this.templatePath('haa-entry/resources/index.html'),this.destinationPath(this.answers.haa_router_dir + '/resources/index.html'), 
      { 
        "project_name": this.answers.project_name
      }
    );

    this.fs.copy( this.templatePath('haa-java/pom.xml'), this.destinationPath(this.answers.haa_module_dir + '/pom.xml'));
    this.fs.copy( this.templatePath('haa-java/target/java-xsahaa.war'), this.destinationPath(this.answers.haa_module_dir + '/target/java-xsahaa.war'));

    this.fs.copy( this.templatePath('haa-db/package.json'), this.destinationPath(this.answers.haa_db_dir + '/package.json'));
    this.fs.copy( this.templatePath('haa-db/src/.hdinamespace'), this.destinationPath(this.answers.haa_db_dir + '/src/.hdinamespace'));
    this.fs.copy( this.templatePath('haa-db/src/.hdiconfig'), this.destinationPath(this.answers.haa_db_dir + '/src/.hdiconfig'));
    this.fs.copy( this.templatePath('haa-db/src/db_grant_role.hdbprocedure'), this.destinationPath(this.answers.haa_db_dir + '/src/db_grant_role.hdbprocedure'));
    this.fs.copy( this.templatePath('haa-db/src/defaults/.hdinamespace'), this.destinationPath(this.answers.haa_db_dir + '/src/defaults/.hdinamespace'));
    this.fs.copyTpl(this.templatePath('haa-db/src/defaults/default_access_role.hdbrole'),this.destinationPath(this.answers.haa_db_dir + '/src/defaults/default_access_role.hdbrole'), 
      { 
        "app_name": this.answers.app_name
      }
    );
    this.fs.copy( this.templatePath('haa-db/src/roles/.hdinamespace'), this.destinationPath(this.answers.haa_db_dir + '/src/roles/.hdinamespace'));
    this.fs.copyTpl(this.templatePath('haa-db/src/roles/app_name_admin.hdbrole'),this.destinationPath(this.answers.haa_db_dir + '/src/roles/' + this.answers.app_name + '_admin.hdbrole'), 
      { 
        "app_name": this.answers.app_name
      }
    );
    this.fs.copy( this.templatePath('haa-db/src/data/.hdinamespace'), this.destinationPath(this.answers.haa_db_dir + '/src/data/.hdinamespace'));
    this.fs.copy( this.templatePath('haa-db/src/data/sensors.hdbcds'), this.destinationPath(this.answers.haa_db_dir + '/src/data/sensors.hdbcds'));
    this.fs.copy( this.templatePath('haa-db/src/data/sys.hdbsynonym'), this.destinationPath(this.answers.haa_db_dir + '/src/data/sys.hdbsynonym'));
    this.fs.copy( this.templatePath('haa-db/src/data/temp.csv'), this.destinationPath(this.answers.haa_db_dir + '/src/data/temp.csv'));
    this.fs.copy( this.templatePath('haa-db/src/data/temp.hdbtabledata'), this.destinationPath(this.answers.haa_db_dir + '/src/data/temp.hdbtabledata'));
    this.fs.copy( this.templatePath('haa-db/src/data/tempId.hdbsequence'), this.destinationPath(this.answers.haa_db_dir + '/src/data/tempId.hdbsequence'));

    /*
    this.fs.copyTpl(this.templatePath('mta.yaml'),this.destinationPath('mta.yaml'),{ 
	    app_name: this.answers.project_name, 
	    haa_uaa_res_name: this.answers.haa_uaa_res_name,
	    haa_uaa_svc_name: this.answers.haa_uaa_svc_name,
	    haa_hdi_res_name: this.answers.haa_hdi_res_name,
	    haa_hdi_svc_name: this.answers.haa_hdi_svc_name
    });

    this.fs.copyTpl(this.templatePath('mta_to_cf.mtaext'),this.destinationPath('mta_to_cf.mtaext'),{ app_name: this.answers.project_name });

    this.fs.copy(this.templatePath('xs-security.json'), this.destinationPath('xs-security.json'));
		*/
  }

  install() {
    // this.installDependencies({ bower: false });
  }
  
  end() {
    /*
    this.composeWith(require.resolve('../haa-module'), { 
	    app_name: this.answers.project_name, 
	    haa_uaa_res_name: this.answers.haa_uaa_res_name,
	    haa_uaa_svc_name: this.answers.haa_uaa_svc_name,
	    haa_hdi_res_name: this.answers.haa_hdi_res_name,
	    haa_hdi_svc_name: this.answers.haa_hdi_svc_name
    } );


    this.composeWith(require.resolve('../haa-router'), {
	    app_name: this.answers.project_name, 
	    haa_uaa_res_name: this.answers.haa_uaa_res_name
    } );
    */
    // mkdir -p target ; mbt build -p=cf -t=target --mtar=haa-cf.mtar ; cf deploy target/haa-cf.mtar -f
    this.log("Your INA project is ready.");
    this.log("Change into your project folder with 'cd "+this.answers.project_name+"'");
    this.log("Run this command to build and deploy.");
    var build_deploy_cmd = "mkdir -p target ; mbt build -p=cf -t=target --mtar=haa-cf.mtar ; cf deploy target/haa-cf.mtar -f";
    if (this.answers.ded_shd == "shd") {
      this.log("mkdir -p target ; mbt build -p=cf -t=target --mtar=haa-cf.mtar ; cf deploy target/haa-cf.mtar -f ; echo 'DO NOT forget to set up Role Collections!'");
    }
    else {
      this.log("mkdir -p target ; mbt build -p=cf -t=target --mtar=haa-cf.mtar ; cf deploy target/haa-cf.mtar -f");
    }
    if (this.answers.ded_shd == "shd") {
      this.log("Be sure to set up role collections and assign them to users.");
    }
    else {
      
    }
  }
};
