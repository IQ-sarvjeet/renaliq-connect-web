// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseApiUrl: 'https://renaliq-comm-api-dev-connect.azurewebsites.net',
  appUrl: 'https://agreeable-forest-060cbdb10.2.azurestaticapps.net',
  pageSize: 10,
  identity: {
    clientId: 'WebUI.Admin',
    clientSecret: 'eNuscFFwA8X4tJEYsQyjndUkrQhxN3Xu',
    grantType: 'password',
    scopes: 'ConnectApi offline_access'
  }
  //Username: tom@yopmail.com
  //Password: Pass@12345
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
