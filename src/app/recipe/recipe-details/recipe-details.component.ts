import { RecipeServiceService } from './../services/recipe-service.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit{
  recipe!:Recipe;
  id!: number;

  constructor(
            private recipeservice: RecipeServiceService,
            private route: ActivatedRoute,
            private router: Router
    ){}

    ngOnInit(): void {
        this.route.params
            .subscribe(
              (params: Params) => {
                this.id = +params['id']
                this.recipe = this.recipeservice.getNewRecipe(this.id)
              }
            );
    }

  addToShoppingList(){
    this.recipeservice.addToshoppingList(this.recipe.ingrediants)
    // this.slservice.addIngrediantToShoppinglist(this.recipe.ingrediants)
  }
  
  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDelete(){
    this.recipeservice.onDelete(this.id);
    this.router.navigate(['/recipes']);
  }
}
