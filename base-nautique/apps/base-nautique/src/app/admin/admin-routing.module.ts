import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {AdminLayoutComponent} from './admin-layout/admin-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from './pages/activity/activity.component';
import {ReservationComponent} from './pages/reservation/reservation.component';
import { ActivitySlotComponent } from './pages/activity-slot/activity-slot.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'activities', component: ActivityComponent },
      { path: 'reservation', component: ReservationComponent },
      { path: 'activities/:id/slots', component: ActivitySlotComponent },
      // autres pages admin...
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
