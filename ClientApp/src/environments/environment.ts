// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'https://localhost:44316/',
  "AzureAd": {
    "clientId": "[ClientID]",
    "authority": "https://login.microsoftonline.com/[TENANT ID GUID]",
    "redirectUri": "https://localhost:44366/",
    "TenantId": "[TENANT ID GUID]"
  }
};
