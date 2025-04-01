import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RecipeModel } from '../model/recipeModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-recipe',
  standalone: false,
  templateUrl: './manage-recipe.component.html',
  styleUrl: './manage-recipe.component.css'
})
export class ManageRecipeComponent {
  @Input() id !:string
  recipeDetails: RecipeModel = {}
  cuisineArray: any = []
  mealArray: any = []
  ingredientsArray: any = []
  instructionArray: any = []
  mealType: any = []

  constructor(private api: ApiService,private router:Router) { }
 
  ngOnInit() {
    this.getAllRecipies()
  }
  getAllRecipies() {
    this.api.getAllRecipiesApi().subscribe((res: any) => {
      if(this.id){
        this.recipeDetails=res.find((item:any)=>item._id==this.id)
        this.ingredientsArray=this.recipeDetails.ingredients
        this.instructionArray=this.recipeDetails.instructions
        this.mealType=this.recipeDetails.mealType
      }
      res.forEach((item: any) => {
        !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine)
      })
      console.log(this.cuisineArray);
      const dummymeal = res.map((item: any) => item.mealType)
      console.log(dummymeal);

      const flatdummymeal = dummymeal.flat(Infinity)
      flatdummymeal.forEach((item: any) => {
        !this.mealArray.includes(item) && this.mealArray.push(item)
      })
      console.log(this.mealArray);

    })
  }

  addIngredients(ingredientsInput: any) {
    if (ingredientsInput.value) {
      this.ingredientsArray.push(ingredientsInput.value)
      ingredientsInput.value = ""
      console.log(this.ingredientsArray);

    }
  }

  removeIngredients(value: string) {
    this.ingredientsArray = this.ingredientsArray.filter((item: string) => item != value)
  }

  addInstruction(instructionsInput: any) {
    if (instructionsInput.value) {
      this.instructionArray.push(instructionsInput.value)
      instructionsInput.value = ""
      console.log(this.instructionArray);
    }
  }

  removeInstruction(value: string) {
    this.instructionArray = this.instructionArray.filter((item: string) => item != value)
  }

  mealTypeSelect(event: any) {
    if (event.target.checked) {
      !this.mealType.includes(event.target.name)&& this.mealType.push(event.target.name)
    } else {
      this.mealType = this.mealType.filter((item: string) => item != event.target.name)
    }
    console.log(this.mealType);
  }

  removeMeal(meal:string){
    this.mealType=this.mealType.filter((item:string)=>item!=meal)
  }

  addRecipe() {
    console.log(this.recipeDetails);
    this.recipeDetails.ingredients = this.ingredientsArray
    this.recipeDetails.instructions = this.instructionArray
    this.recipeDetails.mealType = this.mealType
    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, image, mealType } = this.recipeDetails
    if (name && ingredients!.length > 0 && instructions!.length > 0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length > 0) {
      // alert("proceed to api call")
      this.api.addRecipeApi(this.recipeDetails).subscribe({
        next:(res:any)=>{
          alert("Recipe Added Successfuly")
          this.recipeDetails={}
          this.ingredientsArray=[]
          this.instructionArray=[]
          this.mealType=[]
          this.router.navigateByUrl("/admin/recipe-list")
        },
        error:(reason:any)=>{
          alert(reason.error)
        }
      })
    }else{
      alert("Please fill the form completely")
    }
  }

  updateRecipe(){
    console.log(this.recipeDetails);
    this.recipeDetails.ingredients = this.ingredientsArray
    this.recipeDetails.instructions = this.instructionArray
    this.recipeDetails.mealType = this.mealType
    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, image, mealType } = this.recipeDetails
    if (name && ingredients!.length > 0 && instructions!.length > 0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length > 0) {
      // alert("proceed to api call")
      this.api.editRecipeApi(this.id,this.recipeDetails).subscribe((res:any)=>{
          alert("Recipe Updated Successfuly")
          this.recipeDetails={}
          this.ingredientsArray=[]
          this.instructionArray=[]
          this.mealType=[]
          this.router.navigateByUrl("/admin/recipe-list")
        }
      )
    }else{
      alert("Please fill the form completely")
    }

  }

}
