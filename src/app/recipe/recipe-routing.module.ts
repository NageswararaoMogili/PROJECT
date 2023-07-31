import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth/auth.guard";
import { RecipeHomeComponent } from "../recipe-home/recipe-home.component";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeResolverService } from "./services/recipe-resolver.service";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";

const routes : Routes = [
    { path: '' , component: RecipesComponent , canActivate: [AuthGuard],
        children: [
            {path: '' , component: RecipeHomeComponent},
            {path: 'new' , component: RecipeEditComponent},
            {path: ':id' , component: RecipeDetailsComponent , resolve: [RecipeResolverService]},
            {path: ':id/edit' , component: RecipeEditComponent, resolve: [RecipeResolverService]},
        ]},
    {path: 'recipeList' , component: RecipeListComponent}
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipeRoutingModule {

}