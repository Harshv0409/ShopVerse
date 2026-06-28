import { initFederation } from '@angular-architects/native-federation';

// Shell — catalog aur auth dono remote MFEs load karta hai
initFederation({
  'catalog': 'http://localhost:4201/remoteEntry.json',
  'auth': 'http://localhost:4202/remoteEntry.json'
})
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
