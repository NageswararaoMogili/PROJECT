import { NgModule } from "@angular/core";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeHomeComponent } from "../recipe-home/recipe-home.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { RecipeRoutingModule } from "./recipe-routing.module";
import { RecipesComponent } from "./recipes/recipes.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        RecipeDetailsComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeEditComponent,
        RecipeHomeComponent,
        RecipesComponent,
    ],
    imports:[
        SharedModule,
        ReactiveFormsModule,
        RouterModule,
        RecipeRoutingModule
    ]
    
})
export class RecipeModule {}