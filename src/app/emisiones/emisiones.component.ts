import { Component, OnInit } from '@angular/core';
import { DataStore } from 'aws-amplify';
import { Emision} from 'src/models';  // La ruta puede variar según donde se generó tu modelo.
import { Factor} from 'src/models';  // La ruta puede variar según donde se generó tu modelo.
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-emisiones',
  templateUrl: './emisiones.component.html',
  styleUrls: ['./emisiones.component.css']
})

export class EmisionesComponent implements OnInit {
  selection = new SelectionModel<Emision>(true, []);
  factores: any[] = [];
  emisiones: Emision[] = [];
  displayedColumns: string[] = ['select', 'id', 'ALCANCE', 'CATEGORIA', 'SUBCATEGORIA', 'ACTIVIDAD', 'COMBUSTIBLE', 'UNIDADFE', 'CANTIDAD', 'CO2', 'CH4', 'N2O', 'SF6', 'HFC', 'PFC', 'NF3', 'InicioPeriodo', 'TerminoPeriodo'];
  alcances: string[] = [];
  categorias: string[] = [];
  subcategorias: string[] = [];
  actividades: string[] = [];
  combustibles: string[] = [];
  unidades: string[] = [];
  contaminantes: string[] = [];
  
  public form: FormGroup = new FormGroup({
    ALCANCE: new FormControl('', Validators.required),
    CATEGORIA: new FormControl({value: '', disabled: true}, Validators.required),
    SUBCATEGORIA: new FormControl({value: '', disabled: true}, Validators.required),
    ACTIVIDAD: new FormControl({value: '', disabled: true}, Validators.required),
    COMBUSTIBLE: new FormControl({value: '', disabled: true}, Validators.required),
    UNIDADFE: new FormControl({value: '', disabled: true}, Validators.required),
    CONTAMINANTE: new FormControl({value: '', disabled: true}, Validators.required),
    CANTIDAD: new FormControl('', Validators.required),
    InicioPeriodo: new FormControl('', Validators.required),
    TerminoPeriodo: new FormControl('', Validators.required),
});
  public mostrandoFormulario = false;

  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef, private snackBar: MatSnackBar) { }

  async ngOnInit(): Promise<void> {
    try {
      // Espera a que ambas fuentes de datos estén listas
      const [emisionesDesdeDataStore, factoresDesdeDataStore, factoresDesdeJson] = await Promise.all([
        DataStore.query(Emision),
        DataStore.query(Factor),
        this.http.get<any>('/assets/factores.json').toPromise()
      ]);
  
      this.emisiones = emisionesDesdeDataStore;
      this.factores = [...factoresDesdeDataStore, ...factoresDesdeJson.factores];
  
      // Ahora que tienes todos los factores, puedes procesarlos para obtener los alcances, categorías, etc.
      this.alcances = [...new Set(this.factores.map(factor => factor.ALCANCE))];
      console.log(this.alcances); // Ahora deberías ver los alcances aquí
  
      this.form.get('ALCANCE')?.valueChanges.subscribe(selectedAlcance => {
        this.form.patchValue({
          CATEGORIA: '',
          SUBCATEGORIA: '',
          ACTIVIDAD: '',
          COMBUSTIBLE: '',
          UNIDADFE: '',
          CONTAMINANTE: ''
      });
  

        this.categorias = [...new Set(this.factores.filter(factor => factor.ALCANCE === selectedAlcance).map(factor => factor.CATEGORIA))];
        this.form.get('CATEGORIA')?.enable();
  
        this.form.get('CATEGORIA')?.valueChanges.subscribe(selectedCategoria => {
          this.subcategorias = [...new Set(this.factores.filter(factor => factor.CATEGORIA === selectedCategoria).map(factor => factor.SUBCATEGORIA))];
          this.form.get('SUBCATEGORIA')?.enable();
          this.cdRef.detectChanges();
        });

        this.form.get('SUBCATEGORIA')?.valueChanges.subscribe(selectedSubCategoria => {
          this.actividades = [...new Set(this.factores.filter(factor => factor.SUBCATEGORIA === selectedSubCategoria).map(factor => factor.ACTIVIDAD))];
          this.form.get('ACTIVIDAD')?.enable();
          this.cdRef.detectChanges();
        });
        this.form.get('ACTIVIDAD')?.valueChanges.subscribe(selectedActividad => {
          this.combustibles = [...new Set(this.factores.filter(factor => factor.ACTIVIDAD === selectedActividad).map(factor => factor.COMBUSTIBLE))];
          this.form.get('COMBUSTIBLE')?.enable();
          this.cdRef.detectChanges();
        });

        this.form.get('COMBUSTIBLE')?.valueChanges.subscribe(selectedCombustible => {
          this.unidades = [...new Set(this.factores.filter(factor => factor.COMBUSTIBLE === selectedCombustible).map(factor => factor.UNIDADFE))];
          this.form.get('UNIDADFE')?.enable();
          this.cdRef.detectChanges();
        });


        this.form.get('UNIDADFE')?.valueChanges.subscribe(selectedUnidad => {
          this.contaminantes = [...new Set(this.factores.filter(factor => factor.UNIDADFE === selectedUnidad).map(factor => factor.CONTAMINANTE))];
          this.form.get('CONTAMINANTE')?.enable();
          this.cdRef.detectChanges();
        });
      }
      
      );
  
    } catch (error) {
      console.error('Error al consultar los datos:', error);
    }
  }
  




  
  
  mostrarFormulario(): void {
    this.mostrandoFormulario = true;
  }
  
  async agregarEmision(): Promise<void> {

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
        await DataStore.save(new Emision(registro));
        this.emisiones = [registro, ...this.emisiones];
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
    const numRows = this.emisiones.length;
    return numSelected === numRows;
  }
  
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.emisiones.forEach(row => this.selection.select(row));
  }
  
  async eliminarSeleccionados(): Promise<void> {
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar los registros seleccionados?');
      
    if (!confirmar) {
        return;
    }
  
    // Obtiene los códigos únicos de los elementos seleccionados
    const codigosAEliminar = [...new Set(this.selection.selected.map(item => item.id))];
  
      for (const id of codigosAEliminar) {
        const itemsConMismoCod = await DataStore.query(Emision, c => c.id.eq(id));
        
        for (const item of itemsConMismoCod) {
          try {
            await DataStore.delete(Emision, item.id);
          } catch (error) {
            console.error("Error al eliminar el factor:", error);
          }
        }
      }
  
      // Actualiza el arreglo local filtrando por los códigos que no deben ser eliminados
      this.emisiones = this.emisiones.filter(emision => !codigosAEliminar.includes(emision.id));
  
    // Limpia la selección
    this.selection.clear();
  }
  descargarCSV(): void {
    let csvData = this.convertToCSV(this.emisiones);
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
  

