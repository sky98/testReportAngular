import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from '../../models/activity';
import { Report } from '../../models/report';
import { ActivitiesService } from '../../services/activities.service';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  activity: Activity = {
    id : 0,
    created_at: "",
    description: "",
  };
  model: any;
  activities: Activity[] = [];
  reports: Report[] = [];
  total: number = 0;
  hours_left: number = 0;
  report: Report = {
    activity_id: 0,
    report_date: "",
    reported_hours : 0
  };

  constructor(private activitiesService: ActivitiesService,
              private reportsService: ReportsService,
              private router: Router) {
    this.activitiesService.index().subscribe( (data: any) =>{
      this.activities = data.data;  
    }, (error) => {
      console.log('An error has ocurred');
    });
  }

  contador(id: number){
    this.total = 0;
    for (let report of this.reports){
      this.total += report.reported_hours;
    }
    this.report.activity_id = id;
    this.hours_left = 8 - this.total;
  }

  posReport(){
    this.report.report_date = this.model.year+'-'+this.model.month+'-'+this.model.day;
    if(this.report.activity_id != 0 && this.report.report_date != "" && this.report.reported_hours != 0){
      this.reportsService.post(this.report).subscribe( (data) =>{
        console.log(data)
        if(data != null)
         window.location.reload();
      }, (error)=>{
        alert("No se ha podido registrar exitosamente el reporte")
      });      
    }
    else{
      alert("Favor diligenciar todos los campos")
    }    
  }

  posActivity(){
    if(this.activity.description != null){
      this.activitiesService.pos(this.activity).subscribe((data)=>{
        if(data.id != 0)
          window.location.reload();
      }, (error)=>{
        alert("No se ha podido registrar exitosamente la actividad")
      });
    }
    else{
      alert("Favor diligenciar todos los campos")
    }
  }

  getReports(id: number){
    this.reports = [];
    this.reportsService.getReportsForActivity(id).subscribe( (data: any) =>{
      this.reports = data.data;
      this.contador(id);
    }, (error) =>{
      console.log('An error has ocurred');
    });
  }

  ngOnInit(): void {
  }

}
