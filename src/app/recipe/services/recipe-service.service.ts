import { Recipe } from './../recipe.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingrediants } from 'src/app/shared/ingrediant.model';
import { ShoppingServiceService } from 'src/app/shopping/services/shopping-service.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {
  recipeChanged = new Subject<Recipe[]>();

  recipes: Recipe[] = [];

  constructor(private slservice: ShoppingServiceService) { }

  setRecipe(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipe(){
    return this.recipes.slice();
  }

  getNewRecipe(index: number){
    return this.recipes[index];
  }

  addToshoppingList(ingrediant: Ingrediants[]){
    this.slservice.addIngrediantToShoppinglist(ingrediant);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRiecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  onDelete(index: number){
    this.recipes.splice(index, 1)
    this.recipeChanged.next(this.recipes.slice());
  }
}
