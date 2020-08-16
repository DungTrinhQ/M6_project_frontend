// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyCxWbL-j5KAcye5FSam863KjdLt7mIIXvY',
    authDomain: 'final-project-dangpham.firebaseapp.com',
    databaseURL: 'https://final-project-dangpham.firebaseio.com',
    projectId: 'final-project-dangpham',
    storageBucket: 'final-project-dangpham.appspot.com',
    messagingSenderId: '879217518671',
    appId: '1:879217518671:web:5c85cb8d65e6e0a8eaa23a',
    measurementId: 'G-6S2968B67L'
  },
  API_URL: 'http://localhost:8080/api/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
