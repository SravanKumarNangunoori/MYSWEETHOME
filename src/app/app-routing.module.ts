import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GeneralComponent } from './general/general.component';
import { CalendarlocalComponent } from './calendar/calendar.component';

const routes: Routes = [
  { path: 'home', component:HomeComponent  },
  { path :'general',component:GeneralComponent},
  {path:'calendar',component:CalendarlocalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
