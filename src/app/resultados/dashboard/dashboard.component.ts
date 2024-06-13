import { Component, Input } from '@angular/core';
import {EmisionesResumen} from '../dashboard/interfaces/EmisionesResumen.interfaces'

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

  constructor(){

  }

  updateChart() {
    const totalAlcance1 = this.resumenEmisiones.reduce((acc, curr) => acc + curr.totalAlcance1, 0);
    const totalAlcance2 = this.resumenEmisiones.reduce((acc, curr) => acc + curr.totalAlcance2, 0);
    const totalAlcance3 = this.resumenEmisiones.reduce((acc, curr) => acc + curr.totalAlcance3, 0);

    const total = totalAlcance1 + totalAlcance2 + totalAlcance3;

    this.alcanceUno = totalAlcance1 > 0 ? ((totalAlcance1 / total) * 100).toFixed(2) : 0;
    this.alcanceDos = totalAlcance2 > 0 ? ((totalAlcance2 / total) * 100).toFixed(2) : 0;
    this.alcanceTres = totalAlcance3 > 0 ? ((totalAlcance3 / total) * 100).toFixed(2) : 0;

    this.chartOptions.series = [
      {
        name: "Alcance 1",
        data: [parseFloat(this.alcanceUno)]
      },
      {
        name: "Alcance 2",
        data: [parseFloat(this.alcanceDos)]
      },
      {
        name: "Alcance 3",
        data: [parseFloat(this.alcanceTres)]
      }

    ];
    this.chartOptions.xaxis.categories = ["Porcentaje"];

    this.chartOptions.title.text = "Porcentaje de Emisiones por Alcance";

    this.chartOptions.tooltip.y.formatter = function(val: any) {
      return val.toFixed(2) + "%";
    };
  }
  }

