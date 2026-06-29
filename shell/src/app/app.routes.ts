import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
  {
    path: 'catalog',
    loadComponent: () =>
      loadRemoteModule('catalog', './Component').then((m) => m.AppComponent)
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      loadRemoteModule('auth', './LoginComponent').then((m) => m.LoginComponent)
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      loadRemoteModule('auth', './RegisterComponent').then((m) => m.RegisterComponent)
  },
  {
    path: 'cart',
    component: CartComponent  // Cart shell mein hi hai, lazy load nahi chahiye
  },
  { path: '', redirectTo: 'catalog', pathMatch: 'full' }
];
