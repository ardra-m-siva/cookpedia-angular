import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent {
  allFeedbacks: any = []
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getFeedbacks()
  }
  
  getFeedbacks() {
    this.api.allTestimonyApi().subscribe((res: any) => {
      console.log(res);
      this.allFeedbacks = res
      console.log(this.allFeedbacks);
    })
  }

  updateFeedbackStatus(id:string,status:string){
    this.api.updateTestimonyStatusApi(id,status).subscribe((res:any)=>{
      this.getFeedbacks()
    })
  }
}
