import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { SearchPipe } from '../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  imports: [HeaderComponent, FooterComponent,SearchPipe,FormsModule,NgxPaginationModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  p: number = 1;
  searchKey:string=""
  allRecipies: any = []
  cusineArray: any = []
  mealArray: any = []
  dummyAllRecipies:any=[]

  constructor(private api: ApiService,private router:Router) { }

  ngOnInit() {
    this.getAllRecipies()
  }
  getAllRecipies() {
    this.api.getAllRecipiesApi().subscribe((res: any) => {
      this.allRecipies = res
      this.dummyAllRecipies=this.allRecipies
      this.allRecipies.forEach((item:any) => {
        !this.cusineArray.includes(item.cuisine) && this.cusineArray.push(item.cuisine)
      })
      console.log(this.cusineArray);
      const dummymeal=this.allRecipies.map((item:any)=>item.mealType)
      console.log(dummymeal);
      
      const flatdummymeal=dummymeal.flat(Infinity)
      flatdummymeal.forEach((item:any)=>{
        !this.mealArray.includes(item) && this.mealArray.push(item)
      })
      console.log(this.mealArray);
      
    })
  }

  filterAllRecipes(key:string,value:string){
    this.allRecipies=this.dummyAllRecipies.filter((item:any)=>item[key].includes(value))
  }

  viewRecipe(recipeId:string){
    if(sessionStorage.getItem('token')){
      this.router.navigateByUrl(`recipe/${recipeId}/view`)
    }else{
      alert("Login to view the recipe details")
    }

  }
}
