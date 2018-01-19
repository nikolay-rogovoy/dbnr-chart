import {AfterViewChecked, Component, OnInit} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'funnel-chart-component',
    styleUrls: ['funnel-chart-component.css'],
    templateUrl: 'funnel-chart-component.html'
})
export class FunnelChartComponent implements  OnInit, AfterViewChecked {

    /***/
    constructor() {
    }

    /**Инит компонента*/
    ngOnInit() {
    }

    /**После загрузки вьюхи*/
    ngAfterViewChecked() {
    }

}
