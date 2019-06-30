import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'tabs', loadChildren: './main-screen/main-screen.module#MainScreenPageModule' },
  { path: 'splash-screen', loadChildren: './splash-screen/splash-screen.module#SplashScreenPageModule' },
  { path: 'my-cart', loadChildren: './my-cart/my-cart.module#MyCartPageModule' },  { path: 'finish-order', loadChildren: './finish-order/finish-order.module#FinishOrderPageModule' },
  { path: 'order-history', loadChildren: './order-history/order-history.module#OrderHistoryPageModule' },
  { path: 'ad-details', loadChildren: './ad-details/ad-details.module#AdDetailsPageModule' },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
