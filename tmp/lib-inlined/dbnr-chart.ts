import {AfterViewChecked, Component, Input, OnInit, ViewChild} from '@angular/core';
import {SVGCharts} from './svg-charts';
import {IChartData} from "./i-chart-data";
import {FormControl} from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: 'dbnr-chart',
  styles: [`

  `],
  template: `
    <div style="min-width: 200px; min-height: 200px;" id="my-div">
    </div>
  `
})
export class DbnrChart implements  OnInit, AfterViewChecked {

    @Input()
    data: Array<IChartData> = [];

    /***/
    charts: SVGCharts = new SVGCharts('good');

    /***/
    constructor() {
    }

    /***/
    getSVGData() {
        return this.charts.getPieBarChart(this.data, '', true, 33);
    }

    /**Инит компонента*/
    ngOnInit() {
        document.querySelector('#my-div').innerHTML = this.getSVGData();
    }

    /**После загрузки вьюхи*/
    ngAfterViewChecked() {
    }

}
