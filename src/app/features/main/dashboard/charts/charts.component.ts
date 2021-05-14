import { Component, OnInit } from '@angular/core';

const SALEDATA = [
  { name: "Mobiles", value: 105000 },
  { name: "Laptop", value: 55000 },
  { name: "AC", value: 15000 },
  { name: "Headset", value: 150000 },
  { name: "Fridge", value: 20000 }
];
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})


export class ChartsComponent implements OnInit {
  saleData=SALEDATA;
  constructor() { }

  ngOnInit() {
  }

  

}
