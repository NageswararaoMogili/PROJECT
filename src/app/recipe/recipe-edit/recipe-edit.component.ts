import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeServiceService } from './../services/recipe-service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  recipes: Recipe[];
  id!: number;
  allowEdit = false;
  recipeForm!: FormGroup;

  constructor(
      private router: Router, 
      private route: ActivatedRoute,
      private recipeservice: RecipeServiceService) { }

  ngOnInit(): void {
    this.recipeservice.recipeChanged.subscribe(
      (recipe: Recipe[]) => {
        this.recipes = recipe
      }
    );
    this.route.params
      .subscribe(
        (Params: Params) => {
          this.id = +Params['id'];
          this.allowEdit = Params['id'] != null;
          this.initForm();
        }
      )
  }

  onAddIngred() {
    (<FormArray>this.recipeForm.get('ingrediants')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(
          null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  private initForm(){
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeIngrediant = new FormArray<any>([]);
    if (this.allowEdit) {
      const recipe = this.recipeservice.getNewRecipe(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;
      if (recipe['ingrediants']) {
        for (let ingrediant of recipe.ingrediants) {
          recipeIngrediant.push(
            new FormGroup({
              name: new FormControl(ingrediant.name, Validators.required),
              amount: new FormControl(
                ingrediant.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
            })
          )
        };
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      Imagepath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingrediants: recipeIngrediant
    })
  }
  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['Imagepath'],
      this.recipeForm.value['ingrediants']
      );
      
    if(this.allowEdit){
      this.recipeservice.updateRiecipe(this.id, newRecipe)
      
    }else{
      this.recipeservice.addRecipe(newRecipe)
    }
     this.onCancel();
    }
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingrediants')).controls;
  }
  onDeleteIngred(index: number){
    (<FormArray>this.recipeForm.get('ingrediants')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }


}
