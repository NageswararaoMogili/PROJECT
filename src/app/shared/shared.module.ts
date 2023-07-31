import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.componet";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "../home/home.component";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";

@NgModule({
    declarations:[
        PageNotFoundComponent,
        HomeComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
        AlertComponent
    ],
    exports:[
        PageNotFoundComponent,
        HomeComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
        AlertComponent,
        CommonModule
    ],
    imports:[
        CommonModule,
    ]
})
export class SharedModule{}