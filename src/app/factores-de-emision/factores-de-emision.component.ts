// factores-de-emision.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataStore } from 'aws-amplify';
import { Factor} from 'src/models';  // La ruta puede variar según donde se generó tu modelo.
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-factores-de-emision',
  templateUrl: './factores-de-emision.component.html',
  styleUrls: ['./factores-de-emision.component.css']
})
export class FactoresDeEmisionComponent implements OnInit {
  selection = new SelectionModel<Factor>(true, []);

  factores: any[] = [];
  displayedColumns: string[] = ['select','ID/COD','ALCANCE', 'CATEGORIA', 'SUBCATEGORIA', 'ACTIVIDAD', 'COMBUSTIBLE', 'CONTAMINANTE', 'INCERTIDUMBRE', 'VALORFE', 'UNIDADFE', 'ORIGENFE'];

  public form: FormGroup = new FormGroup({
    cod: new FormControl('', Validators.required),
    ALCANCE: new FormControl('', Validators.required),
    CATEGORIA: new FormControl('', Validators.required),
    SUBCATEGORIA: new FormControl('', Validators.required),
    ACTIVIDAD: new FormControl('', Validators.required),
    COMBUSTIBLE: new FormControl('', Validators.required),
    UNIDADFE: new FormControl('', Validators.required),
    FE_CO2: new FormControl('', [Validators.pattern(/^\d+(\.\d+)?$/)]),
    FE_CH4: new FormControl('', [Validators.pattern(/^\d+(\.\d+)?$/)]),
    FE_N2O: new FormControl('', [Validators.pattern(/^\d+(\.\d+)?$/)]),
    FE_SF6: new FormControl('', [Validators.pattern(/^\d+(\.\d+)?$/)]),
    FE_HFC: new FormControl('', [Validators.pattern(/^\d+(\.\d+)?$/)]),
    FE_PFC: new FormControl('', [Validators.pattern(/^\d+(\.\d+)?$/)]),
    FE_NF3: new FormControl('', [Validators.pattern(/^\d+(\.\d+)?$/)]),
    INCERTIDUMBRE: new FormControl('', Validators.required),
    ORIGENFE: new FormControl('', Validators.required),
        //... puedes agregar todos los campos que necesites aquí.
});

public mostrandoFormulario = false;

constructor(private http: HttpClient, private cdRef: ChangeDetectorRef, private snackBar: MatSnackBar) { }
  
async ngOnInit(): Promise<void> {
  let factoresDesdeDataStore: Factor[] = [];
  try {
    factoresDesdeDataStore = await DataStore.query(Factor);
  } catch (error) {
    console.error('Error al consultar DataStore:', error);
  }
  
  this.http.get<any>('/assets/factores.json').subscribe(data => {
    const factoresDesdeJson = data.factores;
    this.factores = [...factoresDesdeDataStore, ...factoresDesdeJson];
  });
}


  mostrarFormulario(): void {
    this.mostrandoFormulario = true;
}

async agregarFactor(): Promise<void> {

  if (!this.form.valid) {
    // Muestra un mensaje de error usando MatSnackBar
    this.snackBar.open('Por favor, completa todos los campos requeridos', 'Cerrar', {
        duration: 5000, // El mensaje se mostrará durante 5 segundos
    });
    return;
}
  const nuevoFactorBase = this.form.value;

  // Creamos el valor para CONCATENADO
  nuevoFactorBase.CONCATENADO = `${nuevoFactorBase.SUBCATEGORIA} - ${nuevoFactorBase.ACTIVIDAD} - ${nuevoFactorBase.COMBUSTIBLE}`;

  const contaminantes = [
    { nombre: "Dióxido de Carbono (CO2)", valor: parseFloat(nuevoFactorBase.FE_CO2)},
    { nombre: "Metano (CH4)", valor: parseFloat(nuevoFactorBase.FE_CH4) },
    { nombre: "Óxido Nitroso (N2O)", valor: parseFloat(nuevoFactorBase.FE_N2O) },
    { nombre: "Hexafluoruro de azufre (SF6)", valor: parseFloat(nuevoFactorBase.FE_SF6) },
    { nombre: "Hidrofluorocarbono (HFC)", valor: parseFloat(nuevoFactorBase.FE_HFC)},
    { nombre: "Perfluorocarbono (PFC)", valor: parseFloat(nuevoFactorBase.FE_PFC) },
    { nombre: "Trifluoruro de nitrógeno (NF3)", valor: parseFloat(nuevoFactorBase.FE_NF3)}
];



for (let contaminante of contaminantes) {
  // Si el valor del contaminante es vacío o nulo, continuamos con el siguiente
  if (!contaminante.valor) continue;

  let registro = {
    ...nuevoFactorBase,
    CONTAMINANTE: contaminante.nombre,
    VALORFE: contaminante.valor
  };

  // Elimina las propiedades que ya no son necesarias
  delete registro.FE_CO2;
  delete registro.FE_CH4;
  delete registro.FE_N2O;
  delete registro.FE_SF6;
  delete registro.FE_HFC;
  delete registro.FE_PFC;
  delete registro.FE_NF3;

  try {
      await DataStore.save(new Factor(registro));
      this.factores = [registro, ...this.factores];
  } catch (error) {
      console.error("Error al guardar el nuevo factor:", error);
  }
}


  this.cdRef.detectChanges();
  this.mostrandoFormulario = false;
  this.form.reset();
}


cancelarFormulario(): void {
    this.mostrandoFormulario = false;
}

isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.factores.length;
  return numSelected === numRows;
}

masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.factores.forEach(row => this.selection.select(row));
}

async eliminarSeleccionados(): Promise<void> {
  const confirmar = window.confirm('¿Estás seguro de que deseas eliminar los registros seleccionados?');
    
  if (!confirmar) {
      return;
  }

  // Obtiene los códigos únicos de los elementos seleccionados
  const codigosAEliminar = [...new Set(this.selection.selected.map(item => item.cod))];

    for (const cod of codigosAEliminar) {
      const itemsConMismoCod = await DataStore.query(Factor, c => c.cod.eq(cod));
      
      for (const item of itemsConMismoCod) {
        try {
          await DataStore.delete(Factor, item.id);
        } catch (error) {
          console.error("Error al eliminar el factor:", error);
        }
      }
    }

    // Actualiza el arreglo local filtrando por los códigos que no deben ser eliminados
    this.factores = this.factores.filter(factor => !codigosAEliminar.includes(factor.cod));

  // Limpia la selección
  this.selection.clear();
}
descargarCSV(): void {
  let csvData = this.convertToCSV(this.factores);
  let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
  let dwldLink = document.createElement("a");
  let url = URL.createObjectURL(blob);
  dwldLink.setAttribute("href", url);
  dwldLink.setAttribute("download", "factores.csv");
  dwldLink.style.visibility = "hidden";
  document.body.appendChild(dwldLink);
  dwldLink.click();
  document.body.removeChild(dwldLink);
}

convertToCSV(objArray: any[]): string {
  // Campos que quieres incluir en el CSV
  const camposPermitidos = [
    "cod", "ALCANCE", "CATEGORIA", "SUBCATEGORIA", "ACTIVIDAD", "CONCATENADO", 
    "COMBUSTIBLE", "CONTAMINANTE", "INCERTIDUMBRE", "VALORFE", "UNIDADFE", "ORIGENFE"
  ];
  
  let str = '';
  
  // Encabezado
  let header = camposPermitidos.join(",");
  str += header + '\r\n';

  for (let i = 0; i < objArray.length; i++) {
    let line = camposPermitidos.map(campo => objArray[i][campo]).join(",");
    str += line + '\r\n';
  }

  return str;
}


}
