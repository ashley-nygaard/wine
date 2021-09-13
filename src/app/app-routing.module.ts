import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WineListComponent } from "./wine-list/wine-list.component";

const routes: Routes = [
  {path: '**', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: WineListComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
