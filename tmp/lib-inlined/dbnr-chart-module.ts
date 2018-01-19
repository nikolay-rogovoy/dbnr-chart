import {NgModule}      from '@angular/core';

import {DbnrChart} from './dbnr-chart';
import {SafeHtml} from './safe-html'
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
    imports:
        [
            CommonModule, // Критические провайдеры, NgIf и NgFor
            FormsModule
        ],
    exports: [
        DbnrChart
    ],
    declarations: [
        DbnrChart,
        SafeHtml
    ]
})
export class DbnrChartModule { }
