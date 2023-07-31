import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeServiceService } from "../recipe/services/recipe-service.service";
import { Recipe } from "../recipe/recipe.model";
import { map, take, tap, exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root'})
export class DataStorageService {

    constructor(
        private http: HttpClient,
        private recipesevice: RecipeServiceService,
        private authservice: AuthService
        ){}

    storeData(){
        const recipes = this.recipesevice.getRecipe();

        this.http.put('https://my-new-project-recipebook-default-rtdb.firebaseio.com/recipes.json', recipes )
            .subscribe( recipedata => {
                console.log(recipedata);
                
            })
    }

    fetchData(){
         return this.http
            .get<Recipe[]>(
                'https://my-new-project-recipebook-default-rtdb.firebaseio.com/recipes.json'
            ).pipe(
                map(
                    recipes => {
                        return recipes.map( recipe =>{
                            return  { ...recipe, ingrediants: recipe.ingrediants ? recipe.ingrediants : [] };
                        });
                    }),
                    tap(recipes =>{
                        this.recipesevice.setRecipe(recipes)
                    })
            )
         
    }
}