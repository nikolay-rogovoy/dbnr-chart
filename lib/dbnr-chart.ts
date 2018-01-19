import {AfterViewChecked, Component, Input, OnInit, ViewChild} from '@angular/core';
import {SVGCharts} from './svg-charts';
import {IChartData} from "./i-chart-data";
import {FormControl} from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: 'dbnr-chart',
  styleUrls: ['dbnr-chart.css'],
  templateUrl: 'dbnr-chart.html'
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
