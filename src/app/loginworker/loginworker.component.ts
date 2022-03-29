import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { worker } from '../models/worker.model';
import { LoginService } from '../services/config/login.service';
import { dataService } from '../services/data.service';
import { WorkerpasswordGuard } from './workerpassword.guard';

@Component({
  selector: 'app-loginworker',
  templateUrl: './loginworker.component.html',
  styleUrls: ['./loginworker.component.scss'],
})
export class LoginworkerComponent implements OnInit {
  public password!: string;
  private workerPassword!: string;
  private workerID!: string;
  private worker!: worker;
  private subscription: Subscription = new Subscription();
  constructor(
    private dataService: dataService,
    private loginGuard: WorkerpasswordGuard,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private routeNav: Router
  ) {}

  ngOnInit(): void {}

  signIn() {
    this.workerID = this.route.snapshot.params['id'];
    
    this.subscription = this.dataService
      .getWorker(this.workerID)
      .subscribe((response) => {
        this.worker = response;
        this.loginService.workerID = this.workerID;
        this.loginService.worker = this.worker;
        //the password is taken from two way data binding
        this.loginGuard.getData(this.password);

        this.loginService.logedWorker.subscribe(
          (response) => {
            this.loginService.logedChildWorker = response;
          },
          (error) => {
            console.log(error);
          }
        );

        if (this.loginService.logedChildWorker == true) {
          this.loginService.showLoginWorker = false;
          this.routeNav.navigate(['trabajo'], { relativeTo: this.route });
        }
        this.password = '';
      });
  }

  displayOrNot(){
    if (this.loginService.showLoginWorker === true) {
      return 'flex'; 
    }else{
      return 'none';
    }
  }

}
