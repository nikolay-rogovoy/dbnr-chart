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

    /***/
    charts: SVGCharts = new SVGCharts('good');

    /** */
    get total() { return this.charts.getTotalSum(this.data); }

    maxX = 300;

    barWidth = 30;
    spacer = 2;

    textHeight = 10;
    maxText = 0;
    maxY = this.data.length * (this.barWidth + this.spacer);

    max_percent = 0;

    /***/
    constructor() {
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
        let scale = (this.maxX - this.maxText) / ((this.maxX - this.maxText) * this.data[0].value / this.total);
        let w = (this.maxX - this.maxText) * this.percents(i) / 100 * scale;
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
        return 0;
    }

    /** Получение Y координаты точки начала строки */
    getTextY(i) {
        let y = (this.getY(i) + this.barWidth / 2 + this.textHeight / 2);
        return y;
    }

    /**Инит компонента*/
    ngOnInit() {
        this.data = this.data.sort((a, b) => b.value - a.value);

        let total = this.total;

        for (let i = 0; i < this.data.length; i++) {
            let item = this.data[i]; //данные в формате: [label, value]
            let itemValue = +item.value;
            let itemLabel = item.label;
            if (itemLabel.length > this.maxText) {
                this.maxText = itemLabel.length;
            }
            let percents = +itemValue * 100 / total;
            if (percents > this.max_percent) {
                this.max_percent = percents;
            }
        }
        this.maxText += 7;
        this.maxText *= this.textHeight;
    }

    /**После загрузки вьюхи*/
    ngAfterViewChecked() {
    }
}
