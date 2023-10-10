import { Component, OnInit } from '@angular/core';
import { DataStore } from 'aws-amplify';
import { Emision } from 'src/models'; // La ruta puede variar según donde se generó tu modelo.
import { SelectionModel } from '@angular/cdk/collections';

interface EmisionesResumen {
  periodo: string;
  totalTonCO2eq: number;
  totalAlcance1: number;
  totalAlcance2: number;
  totalAlcance3: number;
  totalCO2: number;
  totalCH4: number;
  totalN2O: number;
  totalSF6: number;
  totalHFC: number;
  totalPFC: number;
  totalNF3: number;
}

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css'],
})
export class ResultadosComponent implements OnInit {
  emisiones: Emision[] = [];
  resumenEmisiones: EmisionesResumen[] = []; // Añadir esta línea para almacenar el resumen
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
  

  async ngOnInit() {
    try {
      this.emisiones = await DataStore.query(Emision);
      const emisionesMensuales: { [key: string]: EmisionesResumen } = {};

      this.emisiones.forEach((emision) => {
        const fechaInicio = new Date(emision.InicioPeriodo);
        const fechaTermino = new Date(emision.TerminoPeriodo);
        const añoInicio = fechaInicio.getFullYear();
        const añoTermino = fechaTermino.getFullYear();

        for (let año = añoInicio; año <= añoTermino; año++) {
          const mesComienzo = año === añoInicio ? fechaInicio.getMonth() : 0;
          const mesFin = año === añoTermino ? fechaTermino.getMonth() : 11;

          for (let mes = mesComienzo; mes <= mesFin; mes++) {
            const inicioDelMesActual = new Date(año, mes, 1);
            const finDelMesActual = new Date(año, mes + 1, 0);
            const fechaInicioConsiderada =
              fechaInicio > inicioDelMesActual
                ? fechaInicio
                : inicioDelMesActual;
            const fechaTerminoConsiderada =
              fechaTermino < finDelMesActual ? fechaTermino : finDelMesActual;

            if (fechaInicioConsiderada <= fechaTerminoConsiderada) {
              const diasEnElMes = new Date(año, mes + 1, 0).getDate();
              const diasTotales =
                (fechaTermino.getTime() - fechaInicio.getTime()) /
                  (1000 * 3600 * 24) +
                1;
              const factorProporcional = diasEnElMes / diasTotales;

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
              emisionesMensuales[key].totalTonCO2eq += (emision.CO2 + emision.CH4 + emision.N2O + emision.SF6 + emision.HFC + emision.PFC + emision.NF3) / 1000;
            }
          }
        }
      });

      this.resumenEmisiones = Object.values(emisionesMensuales);
    } catch (error) {
      console.error('Error al consultar los datos:', error);
    }
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
    const row = Object.keys(array[0]).map((key) => (`"${key}"`)).join(',');

    str += row + '\r\n';

    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (const index in array[i]) {
            if (line !== '') line += ',';
            line += `"${array[i][index]}"`;
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
