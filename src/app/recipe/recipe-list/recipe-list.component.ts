import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeServiceService } from './../services/recipe-service.service';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes!: Recipe[];
  subscription!: Subscription;
  constructor(
      private recipeService: RecipeServiceService,
      private router: Router, 
      private route: ActivatedRoute){}
      
  ngOnInit(): void {
    this.subscription = this.recipeService.recipeChanged
            .subscribe(
              (recipe: Recipe[]) => {
                this.recipes = recipe;
              }
            )
      this.recipes = this.recipeService.getRecipe();
  }
  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
