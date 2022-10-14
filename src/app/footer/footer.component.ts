import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
scrollToTop():void {
    const elementList = document.querySelectorAll('body');
    const element = elementList[0] as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth' });
}
}
