import resolve from 'rollup-plugin-node-resolve';
import commonjs    from 'rollup-plugin-commonjs';
import angular from 'rollup-plugin-angular';
import typescript from 'rollup-plugin-typescript';
var sass = require('node-sass');
import uglify from 'rollup-plugin-uglify';

export default {
    input: 'lib/dbnr-chart-source.ts',
    name: 'dbnr-chart',
    sourcemap: true,
    external: [
        '@angular/common',
        '@angular/compiler',
        '@angular/forms',
        '@angular/core',
        "@angular/platform-browser",
    ],
    output: {
        format: 'umd',
        file: 'dist/dbnr-chart.umd.js'
    },

    plugins: [
        angular( // Template & Style preprocessing
            {
                preprocessors: {
                    template: template => template,
                    style: scss => {
                        let css;
                        if(scss){
                            css = sass.renderSync({ data: scss }).css.toString();
                        }else{
                            css = '';
                        }
                        return css;
                    },
                }
            }
        ),
        typescript({
            typescript:require('typescript')
        }),
        resolve({
            module: true,
            main: true
}),
        commonjs({
            include: 'node_modules/**',
        }),
        uglify()
    ],
    onwarn: warning => {
        const skip_codes = [
            'THIS_IS_UNDEFINED',
            'MISSING_GLOBAL_NAME'
        ];
        if (skip_codes.indexOf(warning.code) != -1) return;
        console.error(warning);
    }
};
