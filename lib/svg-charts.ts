//класс-помощник в рисовании SVG диаграмм
import {IColorTheme} from './i-color-theme';
import {IChartData} from './i-chart-data';

export class SVGCharts {

    colorThemes: Array<IColorTheme> = [
        {
            name: 'good',
            colors: [
                '#ebb673',
                '#b06321',
                '#5a9588',
                '#9cd4e3',
                '#b0d8d9',
                '#bf768b',
                '#ded8df',
                '#c5d1e9',
                '#5ba1b0',
                '#acd1d1',
                '#dce2e1',
                '#d8caae',
                '#b18f69',
                '#4e5e73',
                '#7db5ba',
                '#b9e1eb',
                '#cfe4de',
                '#a9c8bd'
            ]
        },
        {
            name: 'blue',
            colors: [
                '#00FFFF',
                '#00FFFF',
                '#E0FFFF',
                '#AFEEEE',
                '#7FFFD4',
                '#40E0D0',
                '#48D1CC',
                '#00CED1',
                '#5F9EA0',
                '#4682B4',
                '#B0C4DE',
                '#B0E0E6',
                '#ADD8E6',
                '#87CEEB',
                '#87CEFA',
                '#00BFFF',
                '#1E90FF',
                '#6495ED',
                '#7B68EE',
                '#4169E1',
                '#0000FF',
                '#0000CD',
                '#00008B',
                '#000080',
                '#191970'
            ]
        },
        {
            name: 'green',
            colors: [
                '#ADFF2F',
                '#7FFF00',
                '#7CFC00',
                '#00FF00',
                '#32CD32',
                '#98FB98',
                '#90EE90',
                '#00FA9A',
                '#00FF7F',
                '#3CB371',
                '#2E8B57',
                '#228B22',
                '#008000',
                '#006400',
                '#9ACD32',
                '#6B8E23',
                '#808000',
                '#556B2F',
                '#66CDAA',
                '#8FBC8F',
                '#20B2AA',
                '#008B8B',
                '#008080'
            ]
        },
        {
            name: 'purple',
            colors: [
                '#E6E6FA',
                '#D8BFD8',
                '#DDA0DD',
                '#EE82EE',
                '#DA70D6',
                '#FF00FF',
                '#FF00FF',
                '#BA55D3',
                '#9370DB',
                '#8A2BE2',
                '#9400D3',
                '#9932CC',
                '#8B008B',
                '#800080',
                '#4B0082',
                '#6A5ACD',
                '#483D8B'
            ]
        },
        {
            name: 'brown',
            colors: [
                '#FFF8DC',
                '#FFEBCD',
                '#FFE4C4',
                '#FFDEAD',
                '#F5DEB3',
                '#DEB887',
                '#D2B48C',
                '#BC8F8F',
                '#F4A460',
                '#DAA520',
                '#B8860B',
                '#CD853F',
                '#D2691E',
                '#8B4513',
                '#A0522D',
                '#A52A2A',
                '#800000'
            ]
        },
        {
            name: 'grey',
            colors: [
                '#DCDCDC',
                '#D3D3D3',
                '#C0C0C0',
                '#A9A9A9',
                '#808080',
                '#696969',
                '#778899',
                '#708090',
                '#2F4F4F'
            ]
        },
    ];

    /***/
    colorTheme: Array<IColorTheme> = null;

    /***/
    colors: Array<string> = [];

    /***/
    textHeight = 10;

    constructor(public colorThemeName = 'good', public roller = 0) {
        this.colorTheme = this.colorThemes.filter(_ => _.name === colorThemeName);
        this.colors = this.colorTheme && this.colorTheme.length > 0
            ? this.colorTheme[0].colors
            : this.colorThemes[0].colors;
    }

    /***/
    getTotalSum(data: Array<IChartData>): number {
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
            let item = data[i]; //данные в формате: [label, value]
            let itemValue = +item.value;
            sum += itemValue;
        }
        return sum;
    }

    /***/
    getMaxValue(data: Array<IChartData>): number {
        let max = 0;
        for (let i = 0; i < data.length; i++) {
            let item = data[i]; //данные в формате: [label, value]
            let itemValue = +item.value;
            if (itemValue > max) {
                max = itemValue;
            }
        }
        return max;
    }    

    getColor(i){
        let color = this.colors[(i + this.roller) % this.colors.length];
        return color;
    }

    /** Получение горизонтальной столбцовой диаграммы */
    getHorBarChart(data: Array<IChartData>, title: string, drawLabels: boolean, barWidth: number, spacer: number): string {
        let text_before = true;
        let chartTitle = title ? title : 'Hor-Bar-Chart';
        if (text_before) {
            data.sort((a, b) => b.value - a.value);
            let total = this.getTotalSum(data);
            let maxX = 300;

            let res = '';
            res += '<text x="0" y="14" fill="#000">' + chartTitle + '</text>';

            let maxText = 0;
            let maxY = data.length * (barWidth + spacer);

            let max_percent = 0;
            for (let i = 0; i < data.length; i++) {
                let item = data[i]; //данные в формате: [label, value]
                let itemValue = +item.value;
                let itemLabel = item.label;
                if (itemLabel.length > maxText) {
                    maxText = itemLabel.length;
                }
                let percents = +itemValue * 100 / total;
                if (percents > max_percent) {
                    max_percent = percents;
                }
            }
            maxText += 5;
            maxText *= this.textHeight;

            if (!drawLabels)
                maxText = 0;

            let scale = (maxX - maxText) / ((maxX - maxText) * data[0].value / total);
            let y = 20;
            for (let i = 0; i < data.length; i++) {
                let color = this.colors[(i + this.roller) % this.colors.length];
                let item = data[i]; //данные в формате: [label, value]
                let itemValue = +item.value;
                let itemLabel = item.label;
                let percents = +itemValue * 100 / total;
                y += spacer;
                if (drawLabels)
                    res += '<text x="0" y="' + (y + barWidth / 2 + 5).toString() + '" fill="#777" class="caption">' + itemLabel + ', ' + percents.toFixed(2) + '%</text>';

                let w = (maxX - maxText) * percents / 100 * scale;
                let x0 = maxText;
                res += '<rect x="' + x0 + '" y="' + y.toString() + '" width="' + (w).toString() + '" height="' + barWidth.toString() + '" fill="' + color + '" />';
                y += barWidth;
            }

            res = '<svg viewBox="0 0 ' + maxX.toString() + ' ' + y.toString() + '" version="1.1" xmlns="http://www.w3.org/2000/svg">' + res;
            return res + '</svg>';
        } else {
            data.sort((a, b) => b.value - a.value);
            let total = this.getTotalSum(data);
            let res = '';
            res += '<text x="0" y="14" fill="#000">' + chartTitle + '</text>';

            let maxX = 300;
            let maxText = 0;
            let maxY = data.length * (barWidth + spacer);

            let max_percent = 0;
            for (let i = 0; i < data.length; i++) {
                let item = data[i]; //данные в формате: [label, value]
                let itemValue = +item.value;
                let itemLabel = item.label;
                if (itemLabel.length > maxText) {
                    maxText = itemLabel.length;
                }
                let percents = +itemValue * 100 / total;
                if (percents > max_percent) {
                    max_percent = percents;
                }
            }
            maxText += 5;
            maxText *= this.textHeight;

            let scale = (maxX - maxText) / ((maxX - maxText) * data[0].value / total);

            let y = +barWidth + spacer;
            for (let i = 0; i < data.length; i++) {
                let item = data[i]; //данные в формате: [label, value]
                let itemLabel = item.label;
                let itemValue = +item.value;
                y += +spacer;
                let percents = (itemValue * 100 / total);
                let color = this.colors[(i + this.roller) % this.colors.length];
                let w = (maxX - maxText) * percents / 100 * scale;
                let x0 = maxText + (maxX - maxText - w) / 2;
                res += '<rect x="0" y="' + y.toString() + '" width="' + w + '" height="' + barWidth.toString() + '" fill="' + color + '" />';
                if (drawLabels)
                    res += '<text x="' + (w + 3 * this.textHeight).toString() + '" y="' + (y + barWidth / 2 + 5).toString() + '" fill="#777" class="caption">' + itemLabel + ', ' + percents.toFixed(2) + '%</text>';
                y += +barWidth;
            }
            y += +spacer;
            maxX += 45;
            res = '<svg viewBox="0 0 300 ' + y.toString() + '" version="1.1" xmlns="http://www.w3.org/2000/svg">' + res;
            return res + '</svg>';
        }
    }

    /** Пай чарт */
    getPieBarChart(data: Array<IChartData>, title: string, drawLabels: boolean, innerRadius: number): string {
        data.sort((a, b) => b.value - a.value);
        let total = this.getTotalSum(data);
        let res = '';
        let chartTitle = title ? title : 'Pie-Chart';
        res += '<text x="0" y="14" fill="#000">' + chartTitle + '</text>';

        let textOffset = 24;

        let maxX = 300;
        let maxY = 300;
        let outerRadius = (maxX - textOffset * 2) / 2;
        innerRadius = innerRadius * outerRadius / 100;

        let cx = maxX / 2;
        let cy = maxY / 2;

        let rx = (outerRadius).toString();
        let ry = (outerRadius).toString();
        let sx = cx + outerRadius;
        let sy = cy;

        let ex = 0;
        let ey = 0;

        let rxi = (innerRadius).toString();
        let ryi = (innerRadius).toString();
        let sxi = cx + innerRadius;
        let syi = cy;

        let exi = 0;
        let eyi = 0;

        let phi = 0;
        let phi_text = 0;
        for (let i = 0; i < data.length; i++) {
            let color = this.colors[(i + this.roller) % this.colors.length];
            let itemValue = +data[i].value;
            phi += itemValue / total;
            phi_text = (phi - phi_text) / 2 + phi_text;
            let percents = (itemValue * 100 / total).toFixed(1).toString();
            ex = +(Math.cos((360 * phi) * Math.PI / 180) * outerRadius + cx).toFixed(4);
            ey = maxY - +(Math.sin((360 * phi) * Math.PI / 180) * outerRadius + cy).toFixed(4);
            
            exi = +(Math.cos((360 * phi) * Math.PI / 180) * innerRadius + cx).toFixed(4);
            eyi = maxY - +(Math.sin((360 * phi) * Math.PI / 180) * innerRadius + cy).toFixed(4);

            res +=  '<path d="M' + sx + ' ' + sy + ' A ' + rx + ' ' + ry + ', 0, 0, 0, ' + ex + ' ' + ey + 'L ' + exi + ' ' + eyi + ' A ' + rxi + ' ' + ryi + ', 0, 0, 1, ' + sxi + ' ' + syi + 'L ' + sx + ' ' + sy + '" fill="' + color + '" />';
            let tx = +(Math.cos((360 * phi_text) * Math.PI / 180) * outerRadius * 0.7 + cx).toFixed(4);
            let ty = maxY - +(Math.sin((360 * phi_text) * Math.PI / 180) * outerRadius * 0.7 + cy).toFixed(4);
            res += '<text x="' + ((tx - this.textHeight * percents.length / 2)) + '" y="' + (ty) + '" fill="#FFF" class="caption">' + percents + '%</text>';
            //res += '<circle cx="'+tx+'" cy="'+ty+'" r="2" fill="#F00" />';
            sx = ex;
            sy = ey;
            sxi = exi;
            syi = eyi;
            phi_text = phi;
        }
        // res += '<circle cx="'+cx+'" cy="'+cy+'" r="'+innerRadius+'" fill="#FFF" />';
        res = '<svg viewBox="0 0 ' + maxX.toString() + ' ' + maxY.toString() + '" version="1.1" xmlns="http://www.w3.org/2000/svg">' + res;
        return res + '</svg>';
    }

    /***/
    getFunBarChart(data: Array<IChartData>, title: string, drawLabels: boolean, barWidth: number, spacer: number): string {
        data.sort((a, b) => b.value - a.value);
        /*
        for (let i=0; i<data.length; i++){
            console.log(data[i].value);
        }
        /**/
        let total = this.getTotalSum(data);
        let maxX = 300;

        let res = '';
        let chartTitle = title ? title : 'Fun-Chart';
        res += '<text x="0" y="14" fill="#000">' + chartTitle + '</text>';

        let maxText = 0;
        let maxY = data.length * (barWidth + spacer);

        let max_percent = 0;
        for (let i = 0; i < data.length; i++) {
            let item = data[i]; //данные в формате: [label, value]
            let itemValue = +item.value;
            let itemLabel = item.label;
            if (itemLabel.length > maxText) {
                maxText = itemLabel.length;
            }
            let percents = +itemValue * 100 / total;
            if (percents > max_percent) {
                max_percent = percents;
            }
        }
        maxText += 5;
        maxText *= this.textHeight;

        if (!drawLabels)
            maxText = 0;

        let scale = (maxX - maxText) / ((maxX - maxText) * data[0].value / total);
        let y = 20;
        for (let i = 0; i < data.length; i++) {
            let color = this.colors[(i + this.roller) % this.colors.length];
            let item = data[i]; //данные в формате: [label, value]
            let itemValue = +item.value;
            let itemLabel = item.label;
            let percents = +itemValue * 100 / total;
            y += spacer;
            if (drawLabels)
                res += '<text x="0" y="' + (y + barWidth / 2 + 5).toString() + '" fill="#777" class="caption">' + itemLabel + ', ' + percents.toFixed(2) + '%</text>';

            let w = (maxX - maxText) * percents / 100 * scale;
            let x0 = maxText + (maxX - maxText - w) / 2;
            res += '<rect x="' + x0 + '" y="' + y.toString() + '" width="' + (w).toString() + '" height="' + barWidth.toString() + '" fill="' + color + '" />';
            y += barWidth;
        }

        res = '<svg viewBox="0 0 ' + maxX.toString() + ' ' + y.toString() + '" version="1.1" xmlns="http://www.w3.org/2000/svg">' + res;
        return res + '</svg>';
    }
}
