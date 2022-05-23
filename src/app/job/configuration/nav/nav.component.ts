import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @ViewChild('burger') burger!: ElementRef;
  @ViewChild('close') close!: ElementRef;
  @ViewChild('section') section!: ElementRef;
  constructor(private render:Renderer2) { }

  ngOnInit(): void {
  }

  showMenu(){
     this.render.setStyle(this.burger.nativeElement, 'display', 'none');
     this.render.setStyle(this.close.nativeElement, 'display', 'flex');
     this.render.setStyle(this.section.nativeElement, 'display', 'flex');
  }
  hideMenu(){

     this.render.setStyle(this.burger.nativeElement, 'display', 'flex');
     this.render.setStyle(this.close.nativeElement, 'display', 'none');
     this.render.setStyle(this.section.nativeElement, 'display', 'none');
  }

}
