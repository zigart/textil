import { Component, OnInit } from '@angular/core';
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


  //FIXME: check de data type
  private attendantID!:string;
  public attendant!:any;
  public password!:string;
  constructor(private dataService:dataService, private activeRoute:ActivatedRoute, private loginService:LoginService) { }

  ngOnInit(): void {
    this.getAttendant();
  }

  getAttendant(){
    this.attendantID = this.activeRoute.snapshot.params['id'];
    this.dataService.getAttendant(this.attendantID).subscribe(
      response => {
        this.attendant = response;
        this.password = this.attendant.password;
      }
    )
  }

  //FIXME: find why if i update the password i need to press f5
  changePassword(){
    if(window.confirm('Desea modificar la contraseña?')){
      this.attendant.password = this.password;
      this.dataService.updateAttendant(this.attendantID, this.attendant).subscribe(
        Response => {
          console.log(Response);
          this.loginService.getAttendant();
        },
        error => console.log(error)
      );
    }
  }

}
