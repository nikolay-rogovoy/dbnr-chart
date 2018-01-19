import {NgModule}      from '@angular/core';
import {SafeHtml} from './safe-html'
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {PieChartComponent} from './pie-chart-component/pie-chart-component';
import {HorizontalChartComponent} from './horizontal-chart-component/horizontal-chart-component';
import {FunnelChartComponent} from './funnel-chart-component/funnel-chart-component';

@NgModule({
    imports: [
        CommonModule, // Критические провайдеры, NgIf и NgFor
        FormsModule
    ],
    exports: [
        PieChartComponent,
        HorizontalChartComponent,
        FunnelChartComponent
    ],
    declarations: [
        PieChartComponent,
        HorizontalChartComponent,
        FunnelChartComponent,
        SafeHtml
    ]
})
export class DbnrChartModule { }
