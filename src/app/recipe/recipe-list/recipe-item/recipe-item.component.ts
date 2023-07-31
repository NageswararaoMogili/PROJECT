import { RecipeServiceService } from '../../services/recipe-service.service';
import { Recipe } from './../../recipe.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit{
  @Input()
  recipe: Recipe;
  @Input() index!: number;

  ngOnInit(): void {
  }

}
