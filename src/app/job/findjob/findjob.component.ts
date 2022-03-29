import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DateTime } from 'luxon';
import { Subscription } from 'rxjs';
import { dataService } from 'src/app/services/data.service';
import { WorkersService } from 'src/app/services/workers/workers.service';


/**
 * this component asign a job
 *
 * @export
 * @class FindjobComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'app-findjob',
  templateUrl: './findjob.component.html',
  styleUrls: ['./findjob.component.scss'],
})
export class FindjobComponent implements OnInit, OnDestroy {
  public workerID!: string;
  public checkboxValue: boolean = true;
  public workersReviewAndDivide: any;
  private subscription: Subscription = new Subscription();
  public workers: Array<{ id: number; lastReview: any; lastDivider: any }> = [];
  public timeReview: string = '2021-01-01T00:00:00.000-03:00';
  public timeDivider: string = '2021-01-01T00:00:00.000-03:00';
  public booleanMostRecentReview: boolean = false;
  public booleanMostRecentDivider: boolean = false;
  public mostRecentDivider: DateTime = DateTime.fromISO(
    '2021-01-01T00:00:00.000-03:00'
  );
  public routes: Array<string> = ['inicio/password/'+ this.workerID + '/revisar', 'inicio/password/' +this.workerID +'/separar'];
  public mostRecent: any = {
    id: '',
    lastDivition: '2021-01-01T00:00:00.000-03:00',
    lastReview: '2021-01-01T00:00:00.000-03:00',
  };
  public worker!: any;
  private currentWork: any = {
    _id: '',
    work: '',
    machine: {},
  };
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private dataService: dataService,
    private workerService: WorkersService
  ) {}
  /**
   * @function ngOnInit
   *
   * @description get workers and asign default boolean values
   *
   * @param booleanMostRecentDivider
   * @param booleanMostRecentReview
   *
   * @memberof FindjobComponent
   */
  ngOnInit(): void {
    this.workerID = this.activeRoute.parent?.snapshot.params['id'];
    this.subscription = this.dataService.getWorkers().subscribe((response) => {
      this.workersReviewAndDivide = response;
    });

    this.booleanMostRecentDivider = false;
    this.booleanMostRecentReview = false;

    this.dataService.getWorker(this.workerID).subscribe(
      response => {
        this.worker = response;
      }
    )
  }

  /**
   * @function ngOnDestroy
   *
   * @description
   * destroy the subscription
   *
   * @memberof FindjobComponent
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
 

  check() {
    this.workerID = this.activeRoute.parent?.snapshot.params['id'];
    this.dataService.getCurrentWork(this.workerID).subscribe(
      (response) => {
        this.currentWork = response;
        if (this.currentWork.work == 'divide') {
          this.router.navigate(['inicio/password/' + this.workerID+ '/separar']);
        } else if (this.currentWork.work == 'review') {
          this.router.navigate(['inicio/password/' + this.workerID+ '/revisar']);
        }
      },
      (error) => {
        if(error.status == 404){
          this.statusCheck();
        }
      }
    );
  }

  /**
 * @function statusCheck
 * 
 * @description if the date of this worker its the most recent in review then it will be redirected to another
 function that auth if its the last divider if both are true he will be redirected to smallJobs
 * 
 *
 * @memberof FindjobComponent
 */
  statusCheck() {
    //get worker ID

    //FIXME: i cant resolve this problem today
    this.workerService.getWorker(this.workerID);
    //Redefine the booleans
    this.booleanMostRecentDivider = false;
    this.booleanMostRecentReview = false;

    //get workers
    this.workersReviewAndDivide.forEach((i: any) => {
      this.workers.push({
        id: i._id,
        lastReview: i.lastReview,
        lastDivider: i.lastDivition,
      });
    });

    //these functions define if the worker is the last or not
    this.lastReviewer();
    this.lastDivider();

    //redirige

    this.redirectDependingValue();
  }
  /**
 * @function lastReviewer
 * 
 * @description compares the lastReviewer dates and return the last reviewer. also changes the boolean to true
 if the workerID its the same of the lastReviewer
 *
 * @memberof FindjobComponent
 * 
 * @returns last reviewer and boolean true or false
 */
  lastReviewer() {
    //FIXME: change type of value. i'm working with string type but i need work with date type

    this.workers.forEach((i: any) => {
      if (
        DateTime.fromISO(i.lastReview) > DateTime.fromISO(this.timeReview) &&
        DateTime.fromISO(i.lastReview) >
          DateTime.fromISO(this.mostRecent.lastReview)
      ) {
        this.mostRecent = {};
        this.mostRecent = i;
      }

      this.timeReview = i.lastReview;
    });

    if (this.workerID == this.mostRecent.id) {
      this.booleanMostRecentReview = true;
    }
  }
  /**
 * @function lastDivider
 * 
 * @description compares the lastDividers dates and return the last divider. also changes the boolean to true
 if the workerID its the same of the lastDivider
 *
 * @memberof FindjobComponent
 * 
 * @returns last divider and boolean true or false
 */
  lastDivider() {
    this.workers.forEach((i: any) => {
      if (
        DateTime.fromISO(i.lastDivider) > DateTime.fromISO(this.timeDivider) &&
        DateTime.fromISO(i.lastDivider) >
          DateTime.fromISO(this.mostRecent.lastDivider)
      ) {
        this.mostRecent = {};
        this.mostRecent = i;
      }
      this.timeDivider = i.lastDivider;
    });
    
    if (this.workerID == this.mostRecent.id) {
      this.booleanMostRecentDivider = true;
    }
  }

  /**
   * @function redirectDependingValue
   *
   * @description depending of the booleans this function redirect to some section
   *
   * @memberof FindjobComponent
   *
   * @returns redirection
   */
  redirectDependingValue() {
    if (
      this.booleanMostRecentReview &&
      !this.booleanMostRecentDivider &&
      this.worker.activeDivider
    ) {
      this.router.navigate(['inicio/password/' + this.workerID+ '/separar']);
    } else if (
      this.booleanMostRecentReview &&
      !this.booleanMostRecentDivider &&
      !this.worker.activeDivider
    ) {
      this.router.navigate(['inicio/trabajos-secundarios/', this.workerID]);
    } else if (
      !this.booleanMostRecentReview &&
      this.booleanMostRecentDivider &&
      this.worker.activeReviewer
    ) {
      this.router.navigate(['inicio/password/' + this.workerID+ '/revisar']);
    } else if (
      !this.booleanMostRecentReview &&
      this.booleanMostRecentDivider &&
      !this.worker.activeReviewer
    ) {
      this.router.navigate(['trabajos-secundarios', {relativeTo: this.activeRoute }]);
    } else if (
      (this.booleanMostRecentReview && this.booleanMostRecentDivider) ||
      (!this.worker.activeReviewer && !this.worker.activeDivider)
    ) {
      this.router.navigate(['inicio/password/' + this.workerID+ '/revisar']);
    } else if (
      !this.booleanMostRecentReview &&
      !this.booleanMostRecentDivider &&
      this.worker.activeReviewer &&
      !this.worker.activeDivider
    ) {
      this.router.navigate(['inicio/password/' + this.workerID+ '/revisar']);
    } else if (
      !this.booleanMostRecentReview &&
      !this.booleanMostRecentDivider &&
      !this.worker.activeReviewer &&
      this.worker.activeDivider
    ) {
      this.router.navigate(['inicio/password/' + this.workerID + '/separar']);
    } else if (this.worker.activeReviewer && this.worker.activeDivider && !this.worker.lastDivider && this.worker.lastReview) {
      this.router.navigate(['inicio/password/' + this.workerID + '/revisar']);
    }
  }
}
