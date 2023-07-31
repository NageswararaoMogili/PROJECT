import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { Recipe } from "../recipe.model";
import { RecipeServiceService } from "./recipe-service.service";

@Injectable({ providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
    
    constructor(private datastorageservice: DataStorageService, private recipeservice: RecipeServiceService){}

    resolve(route: ActivatedRouteSnapshot , state: RouterStateSnapshot){
        const recipes = this.recipeservice.getRecipe();

        if(recipes.length === 0){
            return this.datastorageservice.fetchData();
        }else{
            return recipes; 
        }
    }
}