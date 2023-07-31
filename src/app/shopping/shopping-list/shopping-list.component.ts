import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingrediants } from 'src/app/shared/ingrediant.model';
import { ShoppingServiceService } from '../services/shopping-service.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingrediants!: Ingrediants[]
  private igChangeSub!: Subscription;

    constructor(private shoppingservice: ShoppingServiceService){}

    ngOnInit(): void {
        this.ingrediants = this.shoppingservice.getIngrediant()
        this.igChangeSub = this.shoppingservice.ingrediantChanged
        .subscribe(
          (ingrediants: Ingrediants[]) => {
            this.ingrediants = ingrediants;
          }
        )
    }
    onEdit(index: number){
      this.shoppingservice.startedEditing.next(index)
    }

    ngOnDestroy(): void {
        this.igChangeSub.unsubscribe()
    }
  


}
