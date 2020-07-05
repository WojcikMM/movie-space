// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  movieDbKey: 'c3bd0986d5d28b4cdd3563221afc09b2',
  movieDbUrl: 'https://api.themoviedb.org/3',
  posterUrlPrefix: 'https://image.tmdb.org/t/p/w300/',
  posterUrlPlaceholderUrl: '/assets/poster-not-found.jpg'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
