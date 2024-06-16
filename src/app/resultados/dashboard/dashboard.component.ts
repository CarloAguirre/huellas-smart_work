import { Component, Input } from '@angular/core';
import {EmisionesResumen} from '../dashboard/interfaces/EmisionesResumen.interfaces'
import { Emision } from 'src/models';

@Component({
selector: 'app-dashboard',
templateUrl: './dashboard.component.html',
styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
@Input() chartOptions: any;
@Input() resumenEmisiones: EmisionesResumen[] = [];
@Input() alcanceUno: any;
@Input() alcanceDos: any;
@Input() alcanceTres: any;
@Input() totalAlcanceUno: any
@Input() totalAlcanceDos: any
@Input() totalAlcanceTres: any
@Input() totalAlcance: any;
@Input() emisiones: Emision[]=[];

constructor(){

}
getMaxCO2(): number {
let maxCO2 = 0;
this.emisiones.forEach(emision => {
if (emision.CO2 > maxCO2) {
maxCO2 = emision.CO2;
}
});
return maxCO2;
}
getCO2Percentage(emisionCO2: number): number {
const maxCO2 = this.getMaxCO2();
return maxCO2 ? (emisionCO2 / maxCO2) * 100 : 0;
}
getBarColor(alcance: string): string {
switch (alcance) {
case 'Alcance 1':
return '#9fd09f';
case 'Alcance 2':
return '#97bcdd';
case 'Alcance 3':
return '#ffba49';
default:
return '#cccccc'; // Color por defecto si el alcance no coincide con ninguno
}
}

}
