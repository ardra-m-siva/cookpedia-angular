import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  allFeedbacks:any=[]
allRecipies:any=[]

constructor(private api:ApiService){}

ngOnInit(){
  this.getAllRecipies()
  this.getFeedbacks()
}
getAllRecipies(){
  this.api.getAllRecipiesApi().subscribe((res:any)=>{
    this.allRecipies=res.slice(0,6)
    console.log(this.allRecipies);
    
  })
}

getFeedbacks(){
  this.api.getApprovedTestimonyApi().subscribe((res:any)=>{
    this.allFeedbacks=res
    console.log(this.allFeedbacks);
    
  })
}
}
