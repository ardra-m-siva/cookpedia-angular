import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  selected = new Date()
  isSidebarOpen: boolean = true
  colWidth: string = "col-lg-10"
  userCount: number = 0
  recipeCount: number = 0
  downloadCount: number = 0
  requestCount: number = 0


  constructor(private router: Router, private api: ApiService) {
    if (localStorage.getItem("chart")) {
      let chartData = JSON.parse(localStorage.getItem("chart")||"")
      this.chartOptions = {
        chart: {
          type: "bar"
        },
        title: {
          text: "Analysis of Download recipes based on Cuisine",
          align: "left"
        },
        xAxis: {
          type: "category"
        },
        yAxis: {
          title: {
            text: "Total Download recipe Count"
          }
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        series: [{
          name: "Cuisine",
          colorByPoint: true,
          type: "bar",
          data: chartData
        }]
      }
    }
  }

  ngOnInit() {
    this.getUserCount()
    this.getRecipesCount()
    this.getDownloadCount()
    this.getRequestCount()
  }

  getRecipesCount() {
    this.api.getAllRecipiesApi().subscribe((res: any) => {
      this.recipeCount = res.length
    })
  }

  getUserCount() {
    this.api.allUserApi().subscribe((res: any) => {
      this.userCount = res.length
    })
  }

  getDownloadCount() {
    this.api.allDownloadListApi().subscribe((res: any) => {
      this.downloadCount = res.map((item: any) => item.count).reduce((a: any, b: any) => a + b)
    })
  }

  getRequestCount() {
    this.api.allTestimonyApi().subscribe((res: any) => {
      this.requestCount = res.filter((item: any) => item.status == "Pending").length
    })
  }

  menuBtnClick() {
    this.isSidebarOpen = !this.isSidebarOpen
    this.colWidth = "col"
  }

  logoutAdmin() {
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigateByUrl('/')
  }

  // angular meterial ui 
}
