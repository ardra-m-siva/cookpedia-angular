import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  downloadedRecipe: any = []
  profileImg:string="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg"
  constructor(private api: ApiService) { }
  ngOnInit() {
    this.getDownloadRecipe()
    let user=JSON.parse(sessionStorage.getItem('user')||"")
    if(user.profilePic){
      this.profileImg=user.profilePic
    }
  }
  getDownloadRecipe() {
    this.api.getdownloadRecipeApi().subscribe((res:any)=>{
      this.downloadedRecipe=res
      console.log(this.downloadedRecipe);
      
    })
  }

  getFile(event:any){
    let uploadFile=event.target.files[0]
    let fr= new FileReader()
    fr.readAsDataURL(uploadFile)
    fr.onload=(event:any)=>{
      console.log(event.target.result);
      this.profileImg=event.target.result
    }
  }

  updateProfile(){
    this.api.editUserApi({profilePic:this.profileImg}).subscribe((res:any)=>{
      sessionStorage.setItem("user",JSON.stringify(res))
      this.profileImg=res.profilePic
      alert("Profile Updated Successfully")
    })
  }
}
