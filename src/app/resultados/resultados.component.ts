import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DataStore } from 'aws-amplify';
import { Emision } from 'src/models';
import { SelectionModel } from '@angular/cdk/collections';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmisionesResumen } from './dashboard/interfaces/EmisionesResumen.interfaces';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexFill,
  ApexLegend,
  ApexYAxis
} from "ng-apexcharts";
import { TotalCategorias, Emisiones } from './dashboard/interfaces/TotalCategorias.interfaces';
import { CategoryMap } from './dashboard/interfaces/CategoryMap.interfaces';
import { categoryMap } from './dashboard/data/category-map';
import { totalCategorias } from './dashboard/data/total-caregoria';
import { FormBuilder, FormGroup } from '@angular/forms';

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | any;
  stroke: ApexStroke | any;
  title: ApexTitleSubtitle | any;
  tooltip: ApexTooltip | any;
  fill: ApexFill | any;
  legend: ApexLegend | any;
  colors: string[] | any;
};

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css'],
})
export class ResultadosComponent implements OnInit {
  public chartOptions: Partial<ChartOptions>;
  public emisiones: Emision[] = [];
  public resumenEmisiones: EmisionesResumen[] = [];
  public alcanceUno: any = null;
  public alcanceDos: any = null;
  public alcanceTres: any = null;
  public totalAlcanceUno: any | null = null;
  public totalAlcanceDos: any | null = null;
  public totalAlcanceTres: any | null = null;
  public totalAlcance: any | null = null;
  public categoryMap: CategoryMap = categoryMap;
  public scopeMap: { [key: string]: keyof TotalCategorias } = {
    "Alcance 1": "alcanceUno",
    "Alcance 2": "alcanceDos",
    "Alcance 3": "alcanceTres"
  };
  public totalCategorias!: TotalCategorias;
  dateRangeForm: FormGroup;

  @ViewChild(DashboardComponent) dashboardComponent!: DashboardComponent;

  constructor(private changeDetector: ChangeDetectorRef, private fb: FormBuilder) {
    this.chartOptions = {
      series: [
        {
          name: "Alcance 1",
          data: [this.alcanceUno]
        },
        {
          name: "Alcance 2",
          data: [this.alcanceDos]
        },
        {
          name: "Alcance 3",
          data: [this.alcanceTres]
        }
      ],
      colors: ['#9FD09F', '#97BCDD', '#ffba49'],
      chart: {
        type: "bar",
        height: 160,
        stacked: true,
        stackType: "100%"
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      title: {
        text: "My Footprint"
      },
      xaxis: {
        categories: [' ']
      },
      tooltip: {
        y: {
          formatter: function(val: any) {
            return val + "K";
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40
      }
    };

    this.dateRangeForm = this.fb.group({
      start: [null],
      end: [null]
    });
    this.totalCategorias = JSON.parse(JSON.stringify(totalCategorias));
  }

  selection = new SelectionModel<Emision>(true, []);
  displayedColumns: string[] = [
    'periodo',
    'totalTonCO2eq',
    'totalAlcance1',
    'totalAlcance2',
    'totalAlcance3',
    'totalCO2',
    'totalCH4',
    'totalN2O',
    'totalSF6',
    'totalHFC',
    'totalPFC',
    'totalNF3',
  ];

  mesAbreviado(mes: number): string {
    const meses = [
      'Ene', 'Feb', 'Mar', 'Abr',
      'May', 'Jun', 'Jul', 'Ago',
      'Sept', 'Oct', 'Nov', 'Dic'
    ];
    return meses[mes] || '';
  }

  applyDateFilter() {
    const { start, end } = this.dateRangeForm.value;
    if (start && end) {
      const filteredEmisiones = this.emisiones.filter(emision => {
        const inicio = new Date(emision.InicioPeriodo);
        const termino = new Date(emision.TerminoPeriodo);
        return (inicio >= start && termino <= end);
      });
      this.calculateEmisionesMensuales(filteredEmisiones);
    }
  }

  async ngOnInit() {
    try {
      this.emisiones = await DataStore.query(Emision);
      this.calculateEmisionesMensuales(this.emisiones);
    } catch (error) {
      console.error('Error al consultar los datos:', error);
    }
  }

  calculateEmisionesMensuales(emisiones: Emision[]) {
    const emisionesMensuales: { [key: string]: EmisionesResumen } = {};
    this.totalCategorias = JSON.parse(JSON.stringify(totalCategorias)); // Reiniciar totalCategorias
    this.totalAlcanceUno = 0;
    this.totalAlcanceDos = 0;
    this.totalAlcanceTres = 0;

    emisiones.forEach((emision) => {
      const fechaInicio = new Date(emision.InicioPeriodo);
      const fechaTermino = new Date(emision.TerminoPeriodo);
      const añoInicio = fechaInicio.getFullYear();
      const añoTermino = fechaTermino.getFullYear();

      let acumuladorFactor = 0; // Acumulador para los factores proporcionales

      for (let año = añoInicio; año <= añoTermino; año++) {
        const mesComienzo = año === añoInicio ? fechaInicio.getMonth() : 0;
        const mesFin = año === añoTermino ? fechaTermino.getMonth() : 11;

        for (let mes = mesComienzo; mes <= mesFin; mes++) {
          const inicioDelMesActual = new Date(año, mes, 1);
          const finDelMesActual = new Date(año, mes + 1, 0);
          const fechaInicioConsiderada = fechaInicio > inicioDelMesActual ? fechaInicio : inicioDelMesActual;
          const fechaTerminoConsiderada = fechaTermino < finDelMesActual ? fechaTermino : finDelMesActual;

          if (fechaInicioConsiderada <= fechaTerminoConsiderada) {
            const diasDelMesEnPeriodo = (fechaTerminoConsiderada.getTime() - fechaInicioConsiderada.getTime()) / (1000 * 3600 * 24) + 1;
            const diasTotales = (fechaTermino.getTime() - fechaInicio.getTime()) / (1000 * 3600 * 24) + 1;
            let factorProporcional = diasDelMesEnPeriodo / diasTotales;

            const esUltimoMes = año === añoTermino && mes === mesFin;
            if (esUltimoMes) {
              // Ajustar el factor proporcional del último mes
              factorProporcional = 1 - acumuladorFactor;
            }

            const key = `${this.mesAbreviado(mes)}-${año}`;

            if (!emisionesMensuales[key]) {
              emisionesMensuales[key] = {
                periodo: `${this.mesAbreviado(mes)}-${año}`,
                totalTonCO2eq: 0,
                totalAlcance1: 0,
                totalAlcance2: 0,
                totalAlcance3: 0,
                totalCO2: 0,
                totalCH4: 0,
                totalN2O: 0,
                totalSF6: 0,
                totalHFC: 0,
                totalPFC: 0,
                totalNF3: 0,
              };
            }

            // Suma basada en el alcance
            const totalEmissionForThisEntry = (emision.CO2 + emision.CH4 + emision.N2O + emision.SF6 + emision.HFC + emision.PFC + emision.NF3) * factorProporcional;

            if (emision.ALCANCE === "Alcance 1") {
              emisionesMensuales[key].totalAlcance1 += totalEmissionForThisEntry;
            } else if (emision.ALCANCE === "Alcance 2") {
              emisionesMensuales[key].totalAlcance2 += totalEmissionForThisEntry;
            } else if (emision.ALCANCE === "Alcance 3") {
              emisionesMensuales[key].totalAlcance3 += totalEmissionForThisEntry;
            }

            emisionesMensuales[key].totalCO2 += emision.CO2 * factorProporcional;
            emisionesMensuales[key].totalCH4 += emision.CH4 * factorProporcional;
            emisionesMensuales[key].totalN2O += emision.N2O * factorProporcional;
            emisionesMensuales[key].totalSF6 += emision.SF6 * factorProporcional;
            emisionesMensuales[key].totalHFC += emision.HFC * factorProporcional;
            emisionesMensuales[key].totalPFC += emision.PFC * factorProporcional;
            emisionesMensuales[key].totalNF3 += emision.NF3 * factorProporcional;
            emisionesMensuales[key].totalTonCO2eq += totalEmissionForThisEntry / 1000; // Ya has aplicado el factor proporcional
            if (esUltimoMes) {
              acumuladorFactor = 0;
            } else {
              acumuladorFactor += factorProporcional;
            }
          }
        }
      }

      const categoryKey = this.categoryMap[emision.CATEGORIA];
      const scopeKey = this.scopeMap[emision.ALCANCE];

      if (categoryKey && scopeKey) {
        this.totalCategorias[scopeKey][categoryKey]! += emision.CO2 + emision.CH4 + emision.HFC + emision.N2O + emision.NF3 + emision.PFC + emision.SF6;
      }
    });

    this.resumenEmisiones = Object.values(emisionesMensuales);
    this.totalAlcanceUno = this.resumenEmisiones.reduce((acc, curr) => acc + curr.totalAlcance1, 0) / 1000;
    this.totalAlcanceDos = this.resumenEmisiones.reduce((acc, curr) => acc + curr.totalAlcance2, 0) / 1000;
    this.totalAlcanceTres = this.resumenEmisiones.reduce((acc, curr) => acc + curr.totalAlcance3, 0) / 1000;
    this.totalAlcance = this.totalAlcanceUno + this.totalAlcanceDos + this.totalAlcanceTres;

    this.updateChart();
    this.changeDetector.detectChanges();
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.emisiones.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.emisiones.forEach((row) => this.selection.select(row));
  }

  private convertToCSV(objArray: any[]): string {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    const header = Object.keys(array[0]);
    const row = header.join(';'); // Usamos punto y coma como separador de campos

    str += row + '\r\n';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (const index in array[i]) {
        if (line !== '') line += ';'; // Usamos punto y coma como separador de campos
        let value = array[i][index];
        if (typeof value === 'number') {
          // Reemplazamos el punto por una coma para los decimales si es necesario
          value = value.toString().replace('.', ',');
        } else if (typeof value === 'string') {
          // Encerramos las cadenas entre comillas
          value = `"${value}"`;
        }
        line += value;
      }
      str += line + '\r\n';
    }
    return str;
  }

  private descargarCSV(data: string, filename = 'download.csv'): void {
    const blob = new Blob(['\ufeff' + data], { type: 'text/csv;charset=utf-8;' });
    const dwldLink = document.createElement('a');
    const url = URL.createObjectURL(blob);

    dwldLink.setAttribute('href', url);
    dwldLink.setAttribute('download', filename);
    dwldLink.style.visibility = 'hidden';

    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  public generarYDescargarCSV(): void {
    const csvData = this.convertToCSV(this.resumenEmisiones);
    this.descargarCSV(csvData, 'resumen-emisiones.csv');
  }
}
