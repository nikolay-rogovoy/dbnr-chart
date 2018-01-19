import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {SVGCharts} from '../svg-charts';
import {IChartData} from '../i-chart-data';

@Component({
    moduleId: module.id,
    selector: 'pie-chart-component',
    styleUrls: ['pie-chart-component.css'],
    templateUrl: 'pie-chart-component.html'
})
export class PieChartComponent implements  OnInit, AfterViewChecked {

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
