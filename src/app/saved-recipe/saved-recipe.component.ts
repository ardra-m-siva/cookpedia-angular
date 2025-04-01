import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-saved-recipe',
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './saved-recipe.component.html',
  styleUrl: './saved-recipe.component.css'
})
export class SavedRecipeComponent {

  allRecipes:any=[]
  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllSavedRecipes()
  }

  getAllSavedRecipes(){
    this.api.getUserSaveRecipeApi().subscribe((res:any)=>{
      this.allRecipes=res
      console.log(this.allRecipes);
      
    })
  }

  removeRecipe(id:string){
    this.api.removeUserSaveRecipeApi(id).subscribe((res:any)=>{
      this.getAllSavedRecipes()
    })
  }

  
}
