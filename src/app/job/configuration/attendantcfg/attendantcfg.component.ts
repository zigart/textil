import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import { LoginService } from 'src/app/services/config/login.service';
import { dataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-attendantcfg',
  templateUrl: './attendantcfg.component.html',
  styleUrls: ['./attendantcfg.component.scss']
})
export class AttendantcfgComponent implements OnInit {


  //FIXME: check the data type
  private attendantID!:string;
  public attendant!:any;
  public attendantForm!:FormGroup;
  
  constructor(private dataService:dataService, private activeRoute:ActivatedRoute, private loginService:LoginService) { 
    this.buildForm();
  }

  ngOnInit(): void {
    this.getAttendant();
  }

  /**
   *Get the attendantid and subscribe to getAttendant
   *
   * @memberof AttendantcfgComponent
   * @returns workers objects
   */
  
  getAttendant(){
    this.attendantID = this.activeRoute.snapshot.params['id'];
    this.dataService.getAttendant(this.attendantID).subscribe(
      response => {
        this.attendant = response;
      }
    )
  }

  changePassword(event:Event){
    event.preventDefault();
    const value = this.attendantForm.value;

    if(window.confirm('Desea modificar la contraseña?')){
      this.attendant.password = value.password;
      this.dataService.updateAttendant(this.attendantID, this.attendant).subscribe(
        Response => {
          this.loginService.getAttendant();
        },
        error => console.log(error)
      );
    }
  }

  buildForm(){
    this.attendantForm = new FormGroup({
    password: new FormControl('', [Validators.required])
  });
  }

}
