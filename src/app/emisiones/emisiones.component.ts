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
  concatenados: string[] = [];
  unidades: string[] = [];
  
  public form: FormGroup = new FormGroup({
    ALCANCE: new FormControl('', Validators.required),
    CATEGORIA: new FormControl({value: '', disabled: true}, Validators.required),
    CONCATENADO: new FormControl({value: '', disabled: true}, Validators.required),
    UNIDADFE: new FormControl({value: '', disabled: true}, Validators.required),
    CANTIDAD: new FormControl('', Validators.required),
    InicioPeriodo: new FormControl('', Validators.required),
    TerminoPeriodo: new FormControl('', Validators.required),
});
  public mostrandoFormulario = false;

  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef, private snackBar: MatSnackBar) { }
  async cargarEmisiones(): Promise<void> {
    this.emisiones = await DataStore.query(Emision);
}
  async ngOnInit(): Promise<void> {
    try {
      // Espera a que ambas fuentes de datos estén listas
      const [emisionesDesdeDataStore, factoresDesdeDataStore, factoresDesdeJson] = await Promise.all([
        DataStore.query(Emision),
        DataStore.query(Factor),
        this.http.get<any>('/assets/factores.json').toPromise()
      ]);
  
      await this.cargarEmisiones();

      this.factores = [...factoresDesdeDataStore, ...factoresDesdeJson.factores];
  
      // Ahora que tienes todos los factores, puedes procesarlos para obtener los alcances, categorías, etc.
      this.alcances = [...new Set(this.factores.map(factor => factor.ALCANCE))];
      console.log(this.alcances); // Ahora deberías ver los alcances aquí
  
      this.form.get('ALCANCE')?.valueChanges.subscribe(selectedAlcance => {
        this.form.patchValue({
          CATEGORIA: '',
          CONCATENADO:'',
          UNIDADFE:'',
          CANTIDAD:'',

      });
  

        this.categorias = [...new Set(this.factores.filter(factor => factor.ALCANCE === selectedAlcance).map(factor => factor.CATEGORIA))];
        this.form.get('CATEGORIA')?.enable();
  
        this.form.get('CATEGORIA')?.valueChanges.subscribe(selectedCategoria => {
          this.concatenados = [...new Set(this.factores.filter(factor => factor.CATEGORIA === selectedCategoria).map(factor => factor.CONCATENADO))];
          this.form.get('CONCATENADO')?.enable();
          this.cdRef.detectChanges();
        });

        this.form.get('CONCATENADO')?.valueChanges.subscribe(selectedConcatenado => {
          this.unidades = [...new Set(this.factores.filter(factor => factor.CONCATENADO === selectedConcatenado).map(factor => factor.UNIDADFE))];
          this.form.get('UNIDADFE')?.enable();
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
  
  async agregarEmision() {
    if (this.form.valid) {
      // Extraer los valores del formulario
      const values = this.form.value;
      const factoresRelevantes = this.factores.filter(factor => factor.CONCATENADO === values.CONCATENADO);
      const cantidad = parseFloat(values.CANTIDAD);

      const formatDateToAWSDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');  // los meses en JS empiezan desde 0
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
      // Descomponer el valor de CONCATENADO en sus tres partes
      const [subcategoria, actividad, combustible] = values.CONCATENADO.split(' - ');
    // Inicializar valores de gases
    let CO2 = 0, CH4 = 0, N2O = 0, SF6 = 0, HFC = 0, PFC = 0, NF3 = 0;

    // Calcular emisiones basadas en factores relevantes
    factoresRelevantes.forEach(factor => {
      const emision = factor.VALORFE * cantidad;
      switch (factor.CONTAMINANTE) {
        case 'Dióxido de Carbono (CO2)':
          CO2 += emision;
          break;
        case 'Metano (CH4)':
          CH4 += emision;
          break;
        case 'Óxido Nitroso (N2O)':
          N2O += emision;
          break;
        case 'Hexafluoruro de azufre (SF6)':
          SF6 += emision;
          break;
        case 'Hidrofluorocarbonos (HFC)':
          HFC += emision;
          break;
        case 'Perfluorocarbonos (PFC)':
          PFC += emision;
          break;
        case 'Trifluoruro de nitrógeno (NF3)':
          NF3 += emision;
          break;
        default:
          console.error(`Contaminante no reconocido: ${factor.CONTAMINANTE}`);
      }
    });

      // Crear un objeto Emision basado en los valores del formulario
      const emision = new Emision(
        
        
        {
          
        Company: 'Nombre de la empresa',  // Debes decidir de dónde obtener este valor
        ALCANCE: values.ALCANCE,
        CATEGORIA: values.CATEGORIA,
        SUBCATEGORIA: subcategoria,
        ACTIVIDAD: actividad,
        COMBUSTIBLE: combustible,
        UNIDADFE: values.UNIDADFE,
        CANTIDAD: cantidad,
        CO2: CO2,
        CH4: CH4,
        N2O: N2O,
        SF6: SF6,
        HFC: HFC,
        PFC: PFC,
        NF3: NF3,
        InicioPeriodo: formatDateToAWSDate(values.InicioPeriodo),
        TerminoPeriodo: formatDateToAWSDate(values.TerminoPeriodo),
      });
  
      // Guardar el objeto Emision en DataStore
      try {
        await DataStore.save(emision);
        this.snackBar.open('Emisión guardada con éxito!', 'Cerrar', {
          duration: 2000,
        }
                
        );
        this.cancelarFormulario();
        await this.cargarEmisiones();
      } catch (error) {
        this.snackBar.open('Error al guardar la emisión', 'Cerrar', {
          duration: 2000,
        });
        console.error('Error al guardar en DataStore:', error);
      }
    } else {
      this.snackBar.open('Por favor, completa todos los campos requeridos', 'Cerrar', {
        duration: 2000,
      });
    }
  }
  
  cancelarFormulario() {
    
    this.mostrandoFormulario = false;
    this.form.reset();
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
  

