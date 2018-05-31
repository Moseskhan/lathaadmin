// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyCKYuOqX7qzomCdUsZhA4ZmP0QIg8AqszM",
    authDomain: "lathadataservice.firebaseapp.com",
    databaseURL: "https://lathadataservice.firebaseio.com",
    projectId: "lathadataservice",
    storageBucket: "lathadataservice.appspot.com",
    messagingSenderId: "560965208474"
  }
};
