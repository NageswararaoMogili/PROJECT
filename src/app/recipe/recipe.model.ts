import { Ingrediants } from 'src/app/shared/ingrediant.model';
export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingrediants: Ingrediants[];

    constructor(name: string , desc: string, imagepath: string, ingrediants:Ingrediants[]){
        this.name = name;
        this.description = desc;
        this.imagePath = imagepath;
        this.ingrediants = ingrediants;
    }
}