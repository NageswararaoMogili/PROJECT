import { Injectable, OnInit, } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingrediants } from 'src/app/shared/ingrediant.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingServiceService implements OnInit{
  ingrediantChanged = new Subject<Ingrediants[]>();
  startedEditing = new Subject<number>();

  private ingrediants: Ingrediants[] = [
    new Ingrediants( 'Apple', 8),
    new Ingrediants( 'Tomato', 10)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  getIngrediant(){
    return this.ingrediants.slice()
  }

getEditIngrediant(index: number){
  return this.ingrediants[index];
}

  onIngrediantAdded(newingrediant: Ingrediants){
    this.ingrediants.push(newingrediant)
    this.ingrediantChanged.next(this.ingrediants.slice())
  }

  addIngrediantToShoppinglist(ingrediants: Ingrediants[]){
    this.ingrediants.push(...ingrediants);
    this.ingrediantChanged.next(this.ingrediants.slice())
  }

  updateIngradiant(index: number, newIngrediant: Ingrediants){
    this.ingrediants[index] = newIngrediant;
    this.ingrediantChanged.next(this.ingrediants.slice())
  }

  onDelete(index: number){
    this.ingrediants.splice(index, 1);
    this.ingrediantChanged.next(this.ingrediants.slice());
  }
}
