import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: [
    `
  .error-box {
      background: url(assets/img/error.png)  center center #fff;
      height: 100%;
      width: 100%;
      position: fixed;
  }
  
  .error-box .footer {
      width: 100%;
      left: 0px;
      right: 0px;
  }
  
  .error-body {
      padding-top: 5%;
  }
  
  .error-body h1 {
      font-size: 210px;
      font-weight: 900;
      text-shadow: 4px 4px 0 #ffffff, 6px 6px 0 #263238;
      line-height: 210px;
  }
    `
  ]
})
export class NopagefoundComponent implements OnInit {
  
  year: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
