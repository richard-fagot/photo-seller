import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PhotosComponent} from './photos/photos.component';
import {CommandesComponent} from './commandes/commandes.component';

const routes: Routes = [
  {path: 'photos', component: PhotosComponent},
  {path: 'commandes', component: CommandesComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})


export class AppRoutingModule { }
