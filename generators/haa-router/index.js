'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const yaml = require('js-yaml');

module.exports = class extends Generator {

  initializing() {
    this.props = {};
    this.answers = {};
    var the_module_name = "";
    if((this.config.get("haa_module_name")).length == 0) {
      the_module_name = "java-xsahaa";
    }
    else {
      the_module_name = this.config.get("haa_module_name");
    }

    this.config.set("haa_module_name", the_module_name);

    this.config.save();

    this.config.defaults({ 
      "haa_module_name": the_module_name,
      "haa_uaa_res_name": "haa-uaa",
      "haa_hdi_res_name": "haa-hdi",
      "haa_hdi_svc_name": "HAA_HDI",
      "haa_router_name": "haa-web",
      "haa_router_dir": "haa-entry",
      "sac_host": "ateam-isveng.us10.sapanalytics.cloud"
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

    var prompts = [];
	  
	  prompts.push( {
		type: "input",
		name: "haa_router_name",
		message: "HAA router name",
		default: this.config.get("haa_router_name")
	  }
	  );

	  prompts.push( {
		type: "input",
		name: "haa_router_dir",
		message: "HAA router path",
		default: this.config.get("haa_router_dir")
	  }
	  );

	  prompts.push( {
		type: "input",
		name: "sac_host",
		message: "SAP Analytic Cloud Hostname",
		default: this.config.get("sac_host")
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

	
	  // If the options aren't passed in then prompt for them.
	  if((this.config.get("haa_module_name")).length == 0) {
	  	prompts.push( {
			type: "input",
	        	name: "haa_module_name",
		        message: "HAA module name",
		        default: this.config.get("haa_module_name")
	  		}
	  	);
	  }

    this.answers = await this.prompt(prompts);
    if(typeof(this.answers.haa_module_name) !== "undefined") {    
      this.config.set("haa_module_name", this.answers.haa_module_name);
    }
    else {
      this.answers.haa_module_name = this.config.get("haa_module_name");
    }
    if(typeof(this.options.haa_uaa_res_name) === "undefined") {
      this.config.set("haa_uaa_res_name", this.answers.haa_uaa_res_name);
    }
    this.config.set("haa_router_name", this.answers.haa_router_name);
    this.config.set("haa_router_dir", this.answers.haa_router_dir);
    this.config.set("sac_host", this.answers.sac_host);

    this.config.save();

  }

  writing() {

    this.fs.copyTpl(this.templatePath('resources/index.html'),this.destinationPath(this.answers.haa_router_dir + '/resources/index.html'),{ something: '/' });
    this.fs.copyTpl(this.templatePath('package.json'),this.destinationPath(this.answers.haa_router_dir + '/package.json'),{ module_name: this.props.name });
    this.fs.copy( this.templatePath('xs-app.json'), this.destinationPath(this.answers.haa_router_dir + '/xs-app.json'));

    this.log("Attempting to adjust your mta.yaml file.");

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
      "name": "<?= haa_router_app ?>",
      "type": "nodejs",
      "path": "<?= haa_router_dir ?>",
      "parameters": {
        "memory": "128M",
        "buildpack": "nodejs_buildpack"
      },
      "requires": [
        {
          "name": "<?= haa_uaa_res_name ?>"
        },
        {
          "name": "<?= haa_module_name ?>",
          "group": "destinations",
          "properties": {
            "name": "XSAHAA_BACKEND",
            "url": "~{url}",
            "forwardAuthToken": true,
            "timeout": 600000
          }
        }
      ],
      "properties": {
        "CORS": [
          {
            "uriPattern": "^/sap/bc/ina/(.*)$",
            "allowedOrigin": [
              {
                "host": "<?= sac_host ?>",
                "protocol": "https"
              }
            ],
            "allowedMethods": [
              "GET",
              "POST",
              "HEAD",
              "OPTIONS",
              "PUT",
              "DELETE"
            ],
            "allowedHeaders": [
              "Origin",
              "Accept",
              "X-Requested-With",
              "Content-Type",
              "Access-Control-Request-Method",
              "Access-Control-Request-Headers",
              "Authorization",
              "X-Sap-Cid",
              "X-Csrf-Token",
              "Accept-Language"
            ],
            "exposeHeaders": [
              "Accept",
              "Authorization",
              "X-Requested-With",
              "X-Sap-Cid",
              "Access-Control-Allow-Origin",
              "Access-Control-Allow-Credentials",
              "X-Csrf-Token",
              "Content-Type"
            ]
          }
        ],
        "INCOMING_CONNECTION_TIMEOUT": 600000
      }
    }
			);

		}
		return(yaml.safeDump(doc));  
	    }});
	  // Now make the name substitutions
	  
	  //if(typeof(this.options.haa_module_name) !== "undefined") { this.answers.haa_module_name = this.options.haa_module_name; }
	  if(typeof(this.options.haa_uaa_res_name) !== "undefined") { this.answers.haa_uaa_res_name = this.options.haa_uaa_res_name; }

    this.fs.copyTpl(this.destinationPath('mta.yaml'),this.destinationPath('mta.yaml'),{ 
	    haa_router_app: this.answers.haa_router_name,
	    haa_router_dir: this.answers.haa_router_dir,
	    haa_uaa_res_name: this.answers.haa_uaa_res_name,
	    haa_module_name: this.answers.haa_module_name,
	    sac_host: this.answers.sac_host
    },{ delimiter: "?"} );
  }

  install() {
    // this.installDependencies({ bower: false });
    this.log("Double check your mta.yaml file.");
  }

  end() {
    //var inyaml = this.fs.read( this.destinationPath('mta.yaml') );
    //var doc = yaml.safeLoad(inyaml);
    //this.log("YAML Object:\n" + JSON.stringify(doc, null, 2) + "\n\n");
    this.config.save();
  }
};
