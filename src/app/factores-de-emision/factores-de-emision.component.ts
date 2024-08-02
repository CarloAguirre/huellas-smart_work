// factores-de-emision.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataStore } from 'aws-amplify';
import { Factor } from 'src/models';  // La ruta puede variar según donde se generó tu modelo.
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../services/data.service';
import * as XLSX from 'xlsx';
import { ElementRef, ViewChild } from '@angular/core';
import { DataSharingService } from '../services/data-sharing.service';

@Component({
  selector: 'app-factores-de-emision',
  templateUrl: './factores-de-emision.component.html',
  styleUrls: ['./factores-de-emision.component.css']
})


export class FactoresDeEmisionComponent implements OnInit {
  selection = new SelectionModel<Factor>(true, []);
  factores: any[] = [];
  displayedColumns: string[] = ['select', 'ID/COD', 'ALCANCE', 'CATEGORIA', 'SUBCATEGORIA', 'ACTIVIDAD', 'COMBUSTIBLE', 'CONTAMINANTE', 'INCERTIDUMBRE', 'VALORFE', 'UNIDADFE', 'ORIGENFE'];
  nombreArchivo: string = 'Seleccionar archivo';  // Añade esta línea

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

  constructor(
    private http: HttpClient,
    private cdRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private dataService: DataService, // Inyecta DataService
    private dataSharingService: DataSharingService

  ) { }
  company: any | null = null;
  userID: string | null = null;

  async ngOnInit(): Promise<void> {
    try {
      this.dataSharingService.emisiones$.subscribe(emisiones => {
        this.factores = emisiones;
      });

      // Finalmente, obtén los factores de emisión adicionales desde el archivo JSON
      this.http.get<any>('/assets/factores.json').subscribe(data => {
        const factoresDesdeJson = data.factores;
        this.factores = [...this.factores, ...factoresDesdeJson];
      }, error => {
        console.error('Error al obtener los factores de emisión desde el archivo JSON:', error);
      });

    } catch (error) {
      console.error('Error en ngOnInit:', error);
    }
  }

  formularioAbierto: boolean = false;

  mostrarFormulario(): void {
    this.formularioAbierto = true;
  }

  cerrarFormulario(): void {
    this.formularioAbierto = false;
  }

  manejarClick(): void {
    if (this.formularioAbierto) {
      this.cerrarFormulario();  // si el formulario está abierto, ciérralo
    } else {
      this.mostrarFormulario();  // si el formulario está cerrado, ábrelo
    }
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
      { nombre: "Dióxido de Carbono (CO2)", valor: parseFloat(nuevoFactorBase.FE_CO2) },
      { nombre: "Metano (CH4)", valor: parseFloat(nuevoFactorBase.FE_CH4) },
      { nombre: "Óxido Nitroso (N2O)", valor: parseFloat(nuevoFactorBase.FE_N2O) },
      { nombre: "Hexafluoruro de azufre (SF6)", valor: parseFloat(nuevoFactorBase.FE_SF6) },
      { nombre: "Hidrofluorocarbono (HFC)", valor: parseFloat(nuevoFactorBase.FE_HFC) },
      { nombre: "Perfluorocarbono (PFC)", valor: parseFloat(nuevoFactorBase.FE_PFC) },
      { nombre: "Trifluoruro de nitrógeno (NF3)", valor: parseFloat(nuevoFactorBase.FE_NF3) }
    ];



    for (let contaminante of contaminantes) {
      // Si el valor del contaminante es vacío o nulo, continuamos con el siguiente
      if (!contaminante.valor) continue;

      let registro = {
        ...nuevoFactorBase,
        CONTAMINANTE: contaminante.nombre,
        VALORFE: contaminante.valor,
        company: this.company,  // Usa this.company
        userID: this.userID          // Usa this.userID
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
    this.formularioAbierto = false;
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
  public generarYDescargarCSVFactores(): void {
    const csvData = this.convertToCSV(this.factores);
    this.descargarCSV(csvData, 'factores.csv');
  }



  handleFile(event: any): void {
    const target: DataTransfer = <DataTransfer>(event.target);

    if (target.files.length !== 1) {
      console.error('No se puede usar múltiples archivos');
      return;
    }

    if (target.files.length !== 1) {
      console.error('No se puede usar múltiples archivos');
      return;
    }

    // Actualiza el nombre del archivo
    this.nombreArchivo = target.files[0].name;

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      this.factoresDesdeExcel = XLSX.utils.sheet_to_json(ws);
      console.log("Datos cargados desde Excel:", this.factoresDesdeExcel);
    };

    reader.readAsBinaryString(target.files[0]);
  }
  factoresDesdeExcel: any[] = [];
  @ViewChild('fileInput') fileInput!: ElementRef;

  async procesarFactores(): Promise<void> {
    if (this.factoresDesdeExcel.length === 0) {
      // Muestra una notificación al usuario
      this.snackBar.open('No hay datos para procesar. Por favor, selecciona un archivo primero.', 'Cerrar', { duration: 4000 });
      return;
    }
    const errores: any[] = [];
    const exitosos: any[] = [];

    for (const factorData of this.factoresDesdeExcel) {
      try {
        await this.agregarFactorDesdeExcel(factorData);
        exitosos.push(factorData);
      } catch (e: any) {
        errores.push({ data: factorData, error: e.message });
      }
    }
    this.factores = [...exitosos, ...this.factores];  // Modificación aquí

    // Notifica al usuario sobre los resultados
    this.snackBar.open(
      `${exitosos.length} factores agregados con éxito. ${errores.length} factores tuvieron errores.`,
      'Cerrar',
      { duration: 4000 }
    );
    this.fileInput.nativeElement.value = '';  // Resetea el control del archivo
    this.nombreArchivo = 'Seleccionar archivo';
    this.factoresDesdeExcel = [];



  }

  async agregarFactorDesdeExcel(factorData: any): Promise<void> {
    if (!this.company || !this.userID) {
      throw new Error('Datos de usuario o compañía no disponibles.');
    }

    const nuevoFactor = new Factor({
      cod: factorData.cod,  // Asumiendo que el nombre de la columna en Excel es 'codigo'
      ALCANCE: factorData.ALCANCE,
      CATEGORIA: factorData.CATEGORIA,
      SUBCATEGORIA: factorData.SUBCATEGORIA,
      ACTIVIDAD: factorData.ACTIVIDAD,
      COMBUSTIBLE: factorData.COMBUSTIBLE,
      CONTAMINANTE: factorData.CONTAMINANTE,
      INCERTIDUMBRE: factorData.INCERTIDUMBRE,
      VALORFE: factorData.VALORFE,
      UNIDADFE: factorData.UNIDADFE,
      ORIGENFE: factorData.ORIGENFE,
      CONCATENADO: `${factorData.SUBCATEGORIA} - ${factorData.ACTIVIDAD} - ${factorData.COMBUSTIBLE}`,
      companyID: this.company,
      userID: this.userID
    });

    try {
      await DataStore.save(nuevoFactor);
    } catch (error) {
      console.error('Error al guardar el nuevo factor:', error);
      throw error;
    }
  }


}




