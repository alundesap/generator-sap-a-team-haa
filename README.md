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
You'll be greeted with the yeoman project prompt.  
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
Enter a new folder name where your project will be generated.
```
? Enter your project folder name (will be created if necessary). my_haa_project
```
Now give your project application a name.
```
? Enter your project application name. myhaa
```
The next set of prompts relate to a java module that will provide the actual InA interface.
There seem to be a lot of opportunities to to specify various things.  This is so that you can use a neomenclature that matches an existing project and therefore make it easier to merge this project with your existing one.  If you're just trying things out then you can safely accept the defaults provided.
```
? HAA module name(will provide the INA interface). (haa-ina) 
? HAA module path haa-java
```
The next module is a NodeJS application router.  You can inspect the project mta.yaml file to see how it's used and adapt it to your project.
```
? HAA router name(the application router). haa-web
? HAA router path haa-entry
```
You can pick one of two authorization models.  Dedicated is simpler and Shared allows for creation of roles.
```
? Pick an authorization model Dedicated(Stand-Alone) or Shared(Multi-Tenant). (Use arrow keys)
❯Dedicated 
  Shared 
? UAA resource name haa-uaa
? UAA service name HAA_UAA
```
Your project can access an existing HDI container or the generator can provide a new sample one for you.
```
? Do you want to include a new(sample) HDI container or use an existing HDI container? (Use arro
w keys)
❯ New HDI Container 
  Existing HDI Container 
? HDI resource name haa-hdi
Note, must match HDI resource name due to bug in WebIDE-FS calculation view editor.
 HDI service name. HAA_HDI
? DB Module Name. haa-hdb
? DB Module path. haa-db
```
It's important to understand that if you specify a schema name, then you may run into troubles when you deploy your project in multiple spaces using the same HANA instance.  However, specifying a schema name makes it easier to integrate with external systems.  By leaving the schema name blank, you are asking the deployer to create a unique one whenever necessary.
```
Leave this blank if you want the system to generate the schema name.
 DB Schema Name. (HAADB) 
```
The presumption is that you will be using this project to facilitate a HANA Live Connection from within SAP Analytic Cloud(SAC).  Enter your account name so that the CORS settings are correct.
```
? Your SAP Analytic Cloud Hostname ateam-isveng.us10.sapanalytics.cloud
```
Select the SCP landscape where you will be deploying this project.
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
While each SCP landscape comes with it's own default domain, you can also use your own if it's been set up ahead of time in th e org and space that you will using.  You can check for this with the command...
```
cf domains
```
Otherwise, just accept the default for the landscape.
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

![Image of Screen](img/05562DDB-1AB0-4900-AF20-0AE83E4E3DCB.png)
![Image of Screen](img/0F468617-F035-4D11-A218-FFCEBBCAF146.png)
![Image of Screen](img/1412F42D-E1BF-4C95-B0C7-127ED7974098.png)
![Image of Screen](img/2253AF05-11B8-499E-8DFF-9AD31DF0D71A.png)
![Image of Screen](img/258FD7AF-27C3-4255-A7AB-7B7681706410.png)
![Image of Screen](img/4025213D-AE6A-4C89-9E75-3C782262A2A6.png)
![Image of Screen](img/46ED8BF1-9337-41F8-A3FF-6EA18D8B9A19.png)
![Image of Screen](img/49F0BCC8-1AD7-49CE-87AD-B5093F63BAFE.png)
![Image of Screen](img/5753733B-9AE8-481D-804A-81BE1AF9661A.png)
![Image of Screen](img/603FBEA0-41F5-4841-988B-AC3D25B78AC5.png)
![Image of Screen](img/724E249E-5DBD-4E11-986B-BEC9B7EE1ABE.png)
![Image of Screen](img/747B1CC9-4EA0-4439-B58B-EE65843F6B3C.png)
![Image of Screen](img/79B655BA-0DF7-407D-8F99-CCFE84007951.png)
![Image of Screen](img/7E8F98F4-ABE7-4782-8879-285BB7A0CE82.png)
![Image of Screen](img/8372BECA-F78D-4C9B-A25C-223F226F8E83.png)
![Image of Screen](img/86F5E8C9-DE96-41FD-91E2-84AF7E6CD389.png)
![Image of Screen](img/873EFF1A-E113-4E84-A7C0-57D9D8BA93F1.png)
![Image of Screen](img/8DEDEB3E-151C-4594-B1F4-8E1C03A4916F.png)
![Image of Screen](img/A68AEF1E-8AF8-446E-93FA-A1A8E6A421DA.png)
![Image of Screen](img/A7701013-D9BA-4EAB-B899-24CE1005617B.png)
![Image of Screen](img/A8315F47-0BB3-4D08-90DD-0D984E2B9E71.png)
![Image of Screen](img/A892C690-E0FA-46D1-B3C7-14053B1C7F6B.png)
![Image of Screen](img/ABBCFFB6-F75F-43B5-AFF0-F80E351CAB45.png)
![Image of Screen](img/B2CC10EF-1D2E-4C74-B560-0379F6F14204.png)
![Image of Screen](img/B62AFD54-1D23-488B-B655-05A8D4284906.png)
![Image of Screen](img/B9F1F42D-31A2-4248-BADB-167A1516B764.png)
![Image of Screen](img/BE538BF7-A0CC-4101-961B-C53131144519.png)
![Image of Screen](img/BE6F5C47-4D8D-40DA-8559-1912D91A62A8.png)
![Image of Screen](img/C6C9C5D8-242D-4526-95F0-A6AC6850B4D1.png)
![Image of Screen](img/F02F86B3-CF7F-42A9-8B6D-4BB6A8BDD2C2.png)
![Image of Screen](img/F4A6769F-39CC-43CD-A50E-8FAD6ECCAB62.png)
![Image of Screen](img/F681B7F0-CD6E-4EC0-86B2-45E4774899F9.png)
![Image of Screen](img/FB65B44A-0E0A-48C0-8A2A-1762A81AE60B.png)

