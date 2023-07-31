import { NgModule } from '@angular/core';
import { PreloadingStrategy, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path:'recipes', loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule)},
  {path:'shoppingList', loadChildren: () => import('./shopping/shopping-list.module').then(m => m.ShoppingListModule)},
  {path:'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'pageNotFound' , component: PageNotFoundComponent},
  {path: '**' , redirectTo: '/pageNotFound', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadingStrategy })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
