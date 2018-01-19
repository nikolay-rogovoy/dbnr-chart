var charts = new SVGCharts();
let data = [
    { label: 'KBE', value: 350},
    { label: 'Rehau', value: 250 },
    { label: 'КП40', value: 200 },
    { label: 'EWS32', value: 100 },
    { label: 'TopLine', value: 150 },
];

let horBarSVG = charts.getHorBarChart(data, 'Пример hor bar диаграммы', true, 30, 2);
let pieBarSVG = charts.getPieBarChart(data, 'Пример pie диаграммы', true, 35);
let funBarSVG = charts.getFunBarChart(data, 'Пример funnel диаграммы', true, 30, 2);
document.querySelector('#hor-bar-chart').innerHTML = horBarSVG;
document.querySelector('#pie-bar-chart').innerHTML = pieBarSVG;
document.querySelector('#fun-bar-chart').innerHTML = funBarSVG;
/*
let allColors = charts.getColorsFromTheme('blue');
allColors += charts.getColorsFromTheme('brown');
allColors += charts.getColorsFromTheme('green');
allColors += charts.getColorsFromTheme('purple');
allColors += charts.getColorsFromTheme('grey');
document.querySelector('#colors').innerHTML = allColors;
/**/