import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Constans } from 'src/app/common/common.model';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  mobileQuery: MediaQueryList;
  constructor(    
    public app: AppService,
    media: MediaMatcher,

    ) {
      this.mobileQuery = media.matchMedia(Constans.IPAD_WIDTH_LANDSCAPE);

     }
  
  public get showNav() {
    return this.app.showNav || !this.mobileQuery.matches;
  }

  ngOnInit() {
  }


  close(){}
}
