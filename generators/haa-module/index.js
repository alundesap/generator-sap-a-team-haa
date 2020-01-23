'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const yaml = require('js-yaml');

module.exports = class extends Generator {

  initializing() {
    this.props = {};
    this.answers = {};
    this.config.defaults({ 
      "haa_module_name": "java-xsahaa",
      "haa_uaa_res_name": "haa-uaa",
      "haa_hdi_res_name": "haa-hdi",
      "haa_hdi_svc_name": "HAA_HDI"
      });    
  }

  constructor(args, opts) {
    super(args, opts);

    // This makes `appname` a required argument.
    // this.argument("appname", { type: String, required: true });

    // This method adds support for a `--coffee` flag
    this.option("coffee");

    // And you can then access it later; e.g.
    this.scriptSuffix = this.options.coffee ? ".coffee" : ".js";

    // And you can then access it later; e.g.
    // this.log("Options appname:" + this.options.appname);
    // this.log("Passed Options app_name:" + JSON.stringify(this.options.app_name));
  }

  async prompting() {
    // Have Yeoman greet the user.
    //this.log(
    //  yosay(`Welcome to the fabulous ${chalk.red('generator-sap-a-team-haa')} generator!`)
    //);

    var prompts = [];
	  
	  prompts.push( {
        	type: "input",
	        name: "haa_module_name",
	        message: "HAA module name",
	        default: this.config.get("haa_module_name")
	  }
	  );

	  
	  prompts.push( {
        	type: "input",
	        name: "haa_module_dir",
	        message: "HAA module path",
	        default: "haa-java"
	  }
	  );

	  // If the options aren't passed in then prompt for them.
	  if(typeof(this.options.haa_uaa_res_name) === "undefined") {
	  	prompts.push( {
			type: "input",
			name: "haa_uaa_res_name",
			message: "UAA resource name",
			default: this.config.get("haa_uaa_res_name")
	  		}
	  	);
	  }

	  if(typeof(this.options.haa_hdi_res_name) === "undefined") {
	  	prompts.push( {
			type: "input",
			name: "haa_hdi_res_name",
			message: "HDI resource name",
			default: this.config.get("haa_hdi_res_name")
	  		}
	  	);
	  }

	  if(typeof(this.options.haa_hdi_svc_name) === "undefined") {
	  	prompts.push( {
			type: "input",
			name: "haa_hdi_svc_name",
			message: "HDI service name",
			default: this.config.get("haa_hdi_svc_name")
	  		}
	  	);
	  }

    this.answers = await this.prompt(prompts);

    this.config.set("haa_module_name", this.answers.haa_module_name);
    this.config.set("haa_uaa_res_name", this.answers.haa_uaa_res_name);
    this.config.set("haa_hdi_res_name", this.answers.haa_hdi_res_name);
    this.config.set("haa_hdi_svc_name", this.answers.haa_hdi_svc_name);

    this.config.save();

    // this.log("Passed Options app_name:" + JSON.stringify(this.options.app_name));

//    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
//      this.props = props;
//    });
  }

  writing() {

    this.fs.copy( this.templatePath('pom.xml'), this.destinationPath(this.answers.haa_module_dir + '/pom.xml'));
    this.fs.copy( this.templatePath('target/java-xsahaa.war'), this.destinationPath(this.answers.haa_module_dir + '/target/java-xsahaa.war'));


// https://github.com/sboudrias/mem-fs-editor
	  
    this.fs.copy( this.destinationPath('mta.yaml'), this.destinationPath('mta.yaml'), {
	    process: function (content) {
		var doc = yaml.safeLoad(content);
		var found = false;

		if (Array.isArray(doc.modules)) {
	        	doc.modules.forEach(function(module) { 
				if (module.name === "<?= haa_module_app ?>") {
					found = true;
				} 
			}
			);
		}
		else {
			doc.modules = [];
		}
		if (!found) {
			doc.modules.push(  
    {
      "name": "<?= haa_module_app ?>",
      "type": "java",
      "path": "<?= haa_module_dir ?>",
      "parameters": {
        "memory": "800M",
        "buildpack": "sap_java_buildpack"
      },
      "properties": {
        "TARGET_RUNTIME": "tomee",
        "SAP_JWT_TRUST_ACL": "[{\"clientid\":\"*\", \"identityzone\": \"*\"}]",
        "JBP_CONFIG_RESOURCE_CONFIGURATION": "['tomee/webapps/ROOT/WEB-INF/resources.xml': {'xsahaa-hdi-container':'<?= haa_hdi_svc_name ?>'}]"
      },
      "provides": [
        {
          "name": "<?= haa_module_app ?>",
          "properties": {
            "url": "${default-url}"
          }
        }
      ],
      "requires": [
        {
          "name": "<?= haa_uaa_res_name ?>"
        },
        {
          "name": "<?= haa_hdi_res_name ?>"
        }
      ]
    }
			);

		}
		return(yaml.safeDump(doc));  
	    }});
	
	  // Now make the name substitutions
	  // How to pass these values in when running not as a subgenerator but prompt for them if so?
	  // Passed in values override prompted for values.
	  
	  if(typeof(this.options.haa_uaa_res_name) !== "undefined") { this.answers.haa_uaa_res_name = this.options.haa_uaa_res_name; }
	  if(typeof(this.options.haa_hdi_res_name) !== "undefined") { this.answers.haa_hdi_res_name = this.options.haa_hdi_res_name; }
	  if(typeof(this.options.haa_hdi_svc_name) !== "undefined") { this.answers.haa_hdi_svc_name = this.options.haa_hdi_svc_name; }

    this.fs.copyTpl(this.destinationPath('mta.yaml'),this.destinationPath('mta.yaml'),{ 
	    haa_module_app: this.answers.haa_module_name,
	    haa_module_dir: this.answers.haa_module_dir,
            haa_uaa_res_name: this.answers.haa_uaa_res_name,
            haa_hdi_res_name: this.answers.haa_hdi_res_name,
            haa_hdi_svc_name: this.answers.haa_hdi_svc_name
    },{ delimiter: "?"} );

  }

  install() {
    // this.installDependencies();
    this.log("Double check your mta.yaml file.");
  }

  end() {
    this.config.save();
  }
};
