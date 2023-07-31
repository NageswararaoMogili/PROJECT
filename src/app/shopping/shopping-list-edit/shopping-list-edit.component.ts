import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingrediants } from 'src/app/shared/ingrediant.model';
import { ShoppingServiceService } from '../services/shopping-service.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy{
  @ViewChild('f') slForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editedItem!: Ingrediants;

  constructor( private shoppingservice: ShoppingServiceService){}

  ngOnInit(): void {
    this.subscription = this.shoppingservice.startedEditing
        .subscribe(
          (index) =>{
            this.editedItemIndex = index;
            this.editMode = true;
            this.editedItem = this.shoppingservice.getEditIngrediant(index);
            this.slForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            })
          }
        )
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIngrediant =  new Ingrediants(value.name, value.amount);
    if(this.editMode){
      this.shoppingservice.updateIngradiant(this.editedItemIndex, newIngrediant)
    }else{
      this.shoppingservice.onIngrediantAdded(newIngrediant);
    }
    this.editMode = false;
    form.reset()
  }

  onReset(){
    this.slForm.reset()
    this.editMode = false;
  }
  onDelete(){
    this.shoppingservice.onDelete(this.editedItemIndex);
    this.onReset();
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

}
