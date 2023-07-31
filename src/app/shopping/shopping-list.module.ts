import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingListEditComponent,
    ],
    imports:[
        SharedModule,
        RouterModule.forChild([
                {path: '' , component: ShoppingListComponent},
                {path: 'shoppingListEdit' , component: ShoppingListEditComponent},
            ]), 
        FormsModule
    ]
})
export class ShoppingListModule{}