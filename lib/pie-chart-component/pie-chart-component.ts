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


    @Input()
    set roller(value){
        this.charts = new SVGCharts('good', value);
    };

    /***/
    charts: SVGCharts = new SVGCharts('good', 0);

    /** */
    get total () { return this.charts.getTotalSum(this.data); }

    textOffset = 24;

    @Input()
    width = 300;

    @Input()
    height = 300;


    get cx () { return this.width / 2; }
    get cy () { return this.height / 2; }

    get outerRadius() {
        return (this.width - this.textOffset * 2) / 2;
    }

    get innerRadius() {
        return 33 * this.outerRadius / 100;
    }

    textWidth = 9;

    /***/
    constructor() {

    }

    /** Получение процентного соотношения очередного элемента */
    percents(i) {
        if (this.data.length > i){
            return this.data[i].value / this.total * 100;
        }
        return 0;
    }

    /** Получение угла поворота расположения очередного элемента диаграммы */
    phi(i) {
        if (this.data.length > i) {
            let ang = 0;
            let total = this.total;
            for (let k=0; k<=i; k++){
                ang += this.data[k].value / total;
            }
            return ang;
        }
        return 0;
    }

    /** Получение угла поворота расположения очередного элемента текста */
    phi_text(i) {
        if (this.data.length > i) {
            if (i === 0)
                return this.phi(i)/2;
            else{
                let phi_cur = this.phi(i);
                let phi_prev = this.phi(i - 1);
                return (phi_cur-phi_prev)/2 + phi_prev;
            }
        }
        return 0;
    }    

    /** Получение абсциссы расположения очередного элемента текста */
    getTextX(i){
        let phi_text = this.phi_text(i);
        let tx = +(Math.cos(360 * phi_text * Math.PI / 180) * this.outerRadius * 0.7 + this.cx).toFixed(4);
        return tx - this.textWidth * this.percents(i).toFixed(1).length / 2;
    }

    /** Получение ординаты расположения очередного элемента текста */
    getTextY(i){
        let phi_text = this.phi_text(i);
        let ty = this.height - +(Math.sin(360 * phi_text * Math.PI / 180) * this.outerRadius * 0.7 + this.cy).toFixed(4);
        return ty;
    }

    /** Достаем цвет заливки очередного элемента */
    getFillColor(i){
        let color = this.charts.getColor(i);
        return color;
    }

    /** Получение многоугольника очередной части чарта */
    getPath(i){
        let rxi = this.innerRadius;
        let ryi = this.innerRadius;

        let phi = this.phi(i);
        let phi_prev = this.phi(i-1);

        let sx = +(Math.cos((360 * phi_prev) * Math.PI / 180) * this.outerRadius + this.cx).toFixed(4);
        let sy = this.height - +(Math.sin((360 * phi_prev) * Math.PI / 180) * this.outerRadius + this.cy).toFixed(4);
        let sxi = +(Math.cos((360 * phi_prev) * Math.PI / 180) * this.innerRadius + this.cx).toFixed(4);
        let syi = this.height - +(Math.sin((360 * phi_prev) * Math.PI / 180) * this.innerRadius + this.cy).toFixed(4);

        let ex = +(Math.cos((360 * phi) * Math.PI / 180) * this.outerRadius + this.cx).toFixed(4);
        let ey = this.height - +(Math.sin((360 * phi) * Math.PI / 180) * this.outerRadius + this.cy).toFixed(4);
        let exi = +(Math.cos((360 * phi) * Math.PI / 180) * this.innerRadius + this.cx).toFixed(4);
        let eyi = this.height - +(Math.sin((360 * phi) * Math.PI / 180) * this.innerRadius + this.cy).toFixed(4);

        let res = 'M' + sx + ' ' + sy + ' A ' + this.outerRadius + ' ' + this.outerRadius + ', 0, 0, 0, ' + ex + ' ' + ey + 'L ' + exi + ' ' + eyi + ' A ' + rxi + ' ' + ryi + ', 0, 0, 1, ' + sxi + ' ' + syi + ' L ' + sx + ' ' + sy;
        return res;
    }

    /**Инит компонента*/
    ngOnInit() {
    }

    /**После загрузки вьюхи*/
    ngAfterViewChecked() {
    }

}
