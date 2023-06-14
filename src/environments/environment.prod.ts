// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  //baseApiUrl: 'https://connect-api.renaliq.com/',
  //appUrl: 'https://connect.renaliq.com',
  baseApiUrl: 'https://webapp-provider-prod-uat-v2-api.azurewebsites.net',
  appUrl: 'https://connect-uat.renaliq.com',
  identity: {
    clientId: 'WebUI.Admin',
    clientSecret: 'eNuscFFwA8X4tJEYsQyjndUkrQhxN3Xu',
    grantType: 'password',
    scopes: 'ConnectApi offline_access'
  },

  //grantType: 'password',
  //scope: 'ConnectApi',
  //clientId: 'WebUI.Admin',
  //clientSecret: 'eNuscFFwA8X4tJEYsQyjndUkrQhxN3Xu',

  pageSize: 10,
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
