import { Component } from '@angular/core';
// import AppService
import {AppService} from '../app.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AppService] // provider setup
})
export class DashboardComponent {}

