# Validate - Validation-Tests to test invariants
> [Home](https://github.com/MikeMitterer/ts-validate)

## Deploy-Varianten aus packages.json

   - yarn clean
   
   - yarn deploy 
   Erstellt die nötigen Files in `lib`
   
   - yarn deploy:node
   Erstellt im `bin`-Folder das File app.js dass mit `node bin app.js` aufgerufen werden kann
   
   - yarn deploy:web
   Browser-Part wird in `dist` veröffentlicht. Kann mit `simplehttpserver dist/` getestet werden
   
   - yarn test | jest
   Führt die Unit-Tests aus
   
   
## Upgrade aller packages

    yarn-upgrade-latest






