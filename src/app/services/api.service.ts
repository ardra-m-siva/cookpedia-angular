import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  server_url = "http://localhost:3000"
  constructor(private http: HttpClient) { }

  // get all apis

  getAllRecipiesApi() {
    return this.http.get(`${this.server_url}/all-recipies`)
  }
  // add testimoni api

  addTestimonyApi(reqBody: any) {
    return this.http.post(`${this.server_url}/add-testimony`, reqBody)
  }

  // register
  registerApi(reqBody: any) {
    return this.http.post(`${this.server_url}/register`, reqBody)
  }

  // register
  loginApi(reqBody: any) {
    return this.http.post(`${this.server_url}/login`, reqBody)
  }
  // append token method
  appendToken() {
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")    
    if (token) {
       headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }
  // viewRecipe
  viewRecipeApi(recipeId: any) {
    return this.http.get(`${this.server_url}/recipe/${recipeId}/view`,this.appendToken())
  }

   // related-recipes
   relatedRecipeApi(cuisine: string) {
    return this.http.get(`${this.server_url}/related-recipes?cuisine=${cuisine}`,this.appendToken())
  }

    // related-recipes
    downloadRecipeApi(recipeId: string,reqBody:any) {
      return this.http.post(`${this.server_url}/recipe/${recipeId}/download`,reqBody,this.appendToken())
    }

    // related-recipes
    saveRecipeApi(recipeId: string,reqBody:any) {
      return this.http.post(`${this.server_url}/recipe/${recipeId}/save`,reqBody,this.appendToken())
    }

    // related-recipes
    getUserSaveRecipeApi() {
      return this.http.get(`${this.server_url}/get-saved-recipe`,this.appendToken())
    }

     // related-recipes
     removeUserSaveRecipeApi(id:string) {
      return this.http.delete(`${this.server_url}/saved-recipe/${id}/remove`,this.appendToken())
    }

    getdownloadRecipeApi() {
      return this.http.get(`${this.server_url}/user-downloads`,this.appendToken())
    }
    
    editUserApi(reqBody:any) {
      return this.http.post(`${this.server_url}/user/edit`,reqBody,this.appendToken())
    }

   // related-recipes
   allUserApi() {
    return this.http.get(`${this.server_url}/all-users`,this.appendToken())
  }

    allDownloadListApi() {
      return this.http.get(`${this.server_url}/download-list`,this.appendToken())
    }

    allTestimonyApi() {
      return this.http.get(`${this.server_url}/all-testimony`,this.appendToken())
    }

    updateTestimonyStatusApi(id:string,status:string) {
      return this.http.get(`${this.server_url}/feedback/${id}/update?status=${status}`,this.appendToken())
    }

    getApprovedTestimonyApi() {
      return this.http.get(`${this.server_url}/all-approved-testimony`)
    }

    // alter the portion not as it is present
    addRecipeApi(reqBody:any) {
      return this.http.post(`${this.server_url}/add-recipe`,reqBody,this.appendToken())
    }

     // alter the portion not as it is present
     editRecipeApi(id:string,reqBody:any) {
      return this.http.put(`${this.server_url}/recipe/${id}/edit`,reqBody,this.appendToken())
    }

      // alter the portion not as it is present
      deleteRecipeApi(id:string) {
        return this.http.delete(`${this.server_url}/recipe/${id}/delete`,this.appendToken())
      }


      getChartData(){
        this.allDownloadListApi().subscribe((res: any) => {    
          let downloadArrayList: any = []
          let output: any = {}
          res.forEach((item: any) => {
            let cuisine = item.recipeCuisine
            let currentCount = item.count
            if (output.hasOwnProperty(cuisine)) {
              output[cuisine] += currentCount
            } else {
              output[cuisine] = currentCount
            }
          });
          console.log(output);
          for(let cuisine in output){
            downloadArrayList.push({name:cuisine,y:output[cuisine]})
          }
          console.log(downloadArrayList);
          localStorage.setItem("chart",JSON.stringify(downloadArrayList))
        })
      }
}
