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

    /** */
    get total () { return this.charts.getTotalSum(this.data); }

    textOffset = 24;

    maxX = 300;
    maxY = 300;
    outerRadius = (this.maxX - this.textOffset * 2) / 2;
    innerRadius = 33 * this.outerRadius / 100;

    get cx () { return this.maxX / 2; }
    get cy () { return this.maxY / 2; }

    rx = this.outerRadius;
    ry = this.outerRadius;

    sx = this.cx + this.outerRadius;
    sy = this.cy;

    ex = 0;
    ey = 0;

    rxi = this.innerRadius;
    ryi = this.innerRadius;
    sxi = this.cx + this.innerRadius;
    syi = this.cy;

    exi = 0;
    eyi = 0;

    textHeight = 10;

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
        return tx - this.textHeight * this.percents(i).toFixed(1).length / 2;
    }

    /** Получение ординаты расположения очередного элемента текста */
    getTextY(i){
        let phi_text = this.phi_text(i);
        let ty = this.maxY - +(Math.sin(360 * phi_text * Math.PI / 180) * this.outerRadius * 0.7 + this.cy).toFixed(4);
        return ty;
    }

    /** Достаем цвет заливки очередного элемента */
    getFillColor(i){
        let color = this.charts.getColor(i);
        return color;
    }

    /** Получение многоугольника очередной части чарта */
    getPath(i){
        let rx = this.rx;
        let ry = this.ry;
        let rxi = this.innerRadius;
        let ryi = this.innerRadius;

        let phi = this.phi(i);
        let phi_prev = this.phi(i-1);

        let sx = +(Math.cos((360 * phi_prev) * Math.PI / 180) * this.outerRadius + this.cx).toFixed(4);
        let sy = this.maxY - +(Math.sin((360 * phi_prev) * Math.PI / 180) * this.outerRadius + this.cy).toFixed(4);
        let sxi = +(Math.cos((360 * phi_prev) * Math.PI / 180) * this.innerRadius + this.cx).toFixed(4);
        let syi = this.maxY - +(Math.sin((360 * phi_prev) * Math.PI / 180) * this.innerRadius + this.cy).toFixed(4);     

        let ex = +(Math.cos((360 * phi) * Math.PI / 180) * this.outerRadius + this.cx).toFixed(4);
        let ey = this.maxY - +(Math.sin((360 * phi) * Math.PI / 180) * this.outerRadius + this.cy).toFixed(4);
        let exi = +(Math.cos((360 * phi) * Math.PI / 180) * this.innerRadius + this.cx).toFixed(4);
        let eyi = this.maxY - +(Math.sin((360 * phi) * Math.PI / 180) * this.innerRadius + this.cy).toFixed(4);

        let res = 'M' + sx + ' ' + sy + ' A ' + rx + ' ' + ry + ', 0, 0, 0, ' + ex + ' ' + ey + 'L ' + exi + ' ' + eyi + ' A ' + rxi + ' ' + ryi + ', 0, 0, 1, ' + sxi + ' ' + syi + ' L ' + sx + ' ' + sy;
        return res;
    }

    /**Инит компонента*/
    ngOnInit() {
        //document.querySelector('#my-div').innerHTML = this.getSVGData();
        this.data = this.data.sort((a, b) => b.value - a.value);
    }

    /**После загрузки вьюхи*/
    ngAfterViewChecked() {
    }

}
