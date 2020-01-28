# generator-sap-a-team-haa 

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

```
     _-----_     ╭──────────────────────────╮
    |       |    │  Welcome to the awesome  │
    |--(o)--|    │  sap-a-team-haa project  │
   `---------´   │        generator!        │
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |     
   __'.___.'__   
 ´   `  |° ´ Y ` 

? Enter your project folder name (will be created if necessary). (git) 

```
Blah
```
? Enter your project folder name (will be created if necessary). my_haa_project
```
Blah
```
? Enter your project application name. myhaa
```
Blah
```
? HAA module name(will provide the INA interface). (haa-ina) 

? HAA module path haa-java
? HAA router name(the application router). haa-web
? HAA router path haa-entry
```
Blah
```
? Pick an authorization model Dedicated(Stand-Alone) or Shared(Multi-Tenant). (Use arrow keys)
❯ Dedicated 
  Shared 

? Pick an authorization model Dedicated(Stand-Alone) or Shared(Multi-Tenant). Dedicated
? UAA resource name haa-uaa
? UAA service name HAA_UAA
```
Blah
```
? Do you want to include a new(sample) HDI container or use an existing HDI container? (Use arro
w keys)
❯ New HDI Container 
  Existing HDI Container 

? Do you want to include a new(sample) HDI container or use an existing HDI container? New HDI C
ontainer
? HDI resource name haa-hdi
Note, must match HDI resource name due to bug in WebIDE-FS calculation view editor.
 HDI service name. HAA_HDI
? DB Module Name. haa-hdb
? DB Module path. haa-db
```
Blah
```
Leave this blank if you want the system to generate the schema name.
 DB Schema Name. (HAADB) 


```
Blah
```
? Your SAP Analytic Cloud Hostname (ateam-isveng.us10.sapanalytics.cloud) 

? Your SAP Analytic Cloud Hostname ateam-isveng.us10.sapanalytics.cloud
```
Blah
```
Make sure that you are logged into the Cloud Foundry landscape before deploying.
 SAP Cloud Landscape. (Use arrow keys)
❯ US East (VA) AWS + trial = us10 
  US West (WA) Azu = us20 
  US Central (IA) GCP = us30 
  Europe (Frankfurt) AWS + trial = eu10 
  Europe (Netherlands) Azu = eu20 
  Japan (Tokyo) AWS = jp10 
  Japan (Tokyo) Azu = jp20 

```
Blah
$ cf domains
```
? DNS Domain provisioned in your space. (cfapps.us10.hana.ondemand.com) 


```
Blah
![Image of Screen](img/C6C9C5D8-242D-4526-95F0-A6AC6850B4D1.png)

```
? Subaccount's subdomain. mysubdomain
Make sure a HANA As A Service(HaaS) instance is available(or permitted) in this space before dep
loying.
 CloudFoundry space you're deploying into. (your_space) 
```
Blah
```


Make sure a HANA As A Service(HaaS) instance is available(or permitted) in this space before dep
loying.
 CloudFoundry space you're deploying into. dev
```
Blah
```
app name my_haa_project
Your project must be inside a folder named my_haa_project
I'll automatically create this folder.  Change into it with "cd my_haa_project"
   create .gitignore
   create README.md
   create mta.yaml
   create xs-security.json
...
   create haa-db/src/data/tempId.hdbsequence
   create haa-db/src/views/temps.hdbcalculationview
Your INA project is ready.
Change into your project folder with 'cd my_haa_project'
Run this command to build and deploy.
mkdir -p target ; mbt build -p=cf -t=target --mtar=haa-cf.mtar ; cf deploy target/haa-cf.mtar -f
```
Blah
```
C02XN22LJGH6:git i830671$ cd my_haa_project

```
Blah
```

mkdir -p target ; mbt build -p=cf -t=target --mtar=haa-cf.mtar ; cf deploy target/haa-cf.mtar -f


```


![Image of Screen](img/C6C9C5D8-242D-4526-95F0-A6AC6850B4D1.png)



## License

MIT © [Andrew Lunde](https://github.com/alundesap)

