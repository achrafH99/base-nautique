import { ActivityComponent } from './pages/activity/activity.component';
import { HomeComponent } from './pages/home/home.component';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
      { path: '', component: HomeComponent },
      {path:'activity/:id', component:ActivityComponent },
        {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  }
];
