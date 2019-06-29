import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { MainScreenPage } from './main-screen.page';
import { NgModule } from '@angular/core';

const routes: Routes = [

  {
    path: '',
    component: MainScreenPage,
    children: [{ path: 'splash-screen', loadChildren: '../splash-screen/splash-screen.module#SplashScreenPageModule' },
    { path: 'my-profile', loadChildren: '../my-profile/my-profile.module#MyProfilePageModule' },
    { path: 'add-ad', loadChildren: '../add-ad/add-ad.module#AddAdPageModule' }
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsRoutingModule { }