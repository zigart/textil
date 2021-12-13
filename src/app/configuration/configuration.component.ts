import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  
  public password:string ='';
  private truePassword:string;

  constructor(private router: Router) { 
    this.truePassword = "panichella"
  }

  ngOnInit(): void {}
  //   let pass = prompt("Contraseña");
  //   if (pass == "panichella") {
  //     this.router.navigate(['/inicio/configuracion/maquinas']);
  //   }else{
  //     this.router.navigate(['/inicio/trabajo']);
  //   }
  // }

  signIn(){
    let login = document.getElementById('login');
    let routerOutlet = document.getElementById('outlet');
    if (this.password === this.truePassword) {
      if(login && routerOutlet){
        login.style.display = "none";
        routerOutlet.style.display = "block";
      }
      this.router.navigate(['/inicio/configuracion/maquinas']);
    }
  }
}
