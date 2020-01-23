cf create-service xsuaa application <%= uaa_service_name %> -c xs-security.json

Be sure that an existing service instance with service name hana and plan type hdi-shared with the name <%= service_name %> is already in the <%= space %> space.

```
mbt build -p=cf -t=target --mtar=haa-dedext.mtar ; cf deploy target/haa-dedext.mtar -f
```
