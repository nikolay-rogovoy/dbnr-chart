import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { SVGCharts } from '../svg-charts';
import { IChartData } from '../i-chart-data';

@Component({
    moduleId: module.id,
    selector: 'horizontal-chart-component',
    styleUrls: ['horizontal-chart-component.css'],
    templateUrl: 'horizontal-chart-component.html'
})
export class HorizontalChartComponent implements  OnInit, AfterViewChecked {
    @Input()
    data: Array<IChartData> = [];

    @Input()
    set roller(value){
        this.charts = new SVGCharts('good', value);
    };

    /***/
    charts: SVGCharts = new SVGCharts('good', 0);

    /** */
    get total() { return this.charts.getTotalSum(this.data); }

    @Input()
    width = 300;

    @Input()
    height = 300;

    barWidth = 30;
    spacer = 2;

    //textHeight = 10;
    maxText = 0;
    maxY = this.data.length * (this.barWidth + this.spacer);

    max_percent = 0;

    /***/
    constructor() {
    }

    /***/
    getText(i) {
        return this.data[i].label + ", " + this.data[i].value;
    }

    /** Получение процентного соотношения очередного элемента */
    percents(i) {
        if (this.data.length > i) {
            return this.data[i].value / this.total * 100;
        }
        return 0;
    }

    /** Получение X координы начала прямоугольника */
    getX(i) {
        return this.maxText;
        
    }

    /** Получение Y координы начала прямоугольника */
    getY(i) {
        let y = (this.barWidth + this.spacer) * i;
        return y;
    }

    /** Получение ширины прямоугольника */
    getWidth(i) {
        let scale = (this.width - this.maxText) / ((this.width - this.maxText) * this.data[0].value / this.total);
        let w = (this.width - this.maxText) * this.percents(i) / 100 * scale;
        return w;
    }

    /** Получение высоты прямоугольника */
    getHeight(i) {
        return this.barWidth;
    }

    /** Достаем цвет заливки очередного элемента */
    getFillColor(i) {
        let color = this.charts.getColor(i);
        return color;
    }

    /** Получение X координаты точки начала строки */
    getTextX(i) {
        return 10;
    }

    /** Получение Y координаты точки начала строки */
    getTextY(i) {
        let y = (this.getY(i) + this.barWidth / 2/* + this.textHeight / 2*/);
        return y;
    }

    /**Инит компонента*/
    ngOnInit() {
    }

    /**После загрузки вьюхи*/
    ngAfterViewChecked() {
    }
}
