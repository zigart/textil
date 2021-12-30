import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { machine } from 'src/app/models/machine.model';
import { dataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  public machineList: BehaviorSubject<machine[]> = new BehaviorSubject<machine[]>([]);

  constructor(private dataservice: dataService) { }

  async load(){
    this.machineList.next(await this.dataservice.getMachines().toPromise());
  }
}
