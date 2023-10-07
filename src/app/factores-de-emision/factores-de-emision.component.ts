// factores-de-emision.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataStore } from 'aws-amplify';
import { Factor} from 'src/models';  // La ruta puede variar según donde se generó tu modelo.
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-factores-de-emision',
  templateUrl: './factores-de-emision.component.html',
  styleUrls: ['./factores-de-emision.component.css']
})
export class FactoresDeEmisionComponent implements OnInit {
  selection = new SelectionModel<Factor>(true, []);

  factores: any[] = [];
  displayedColumns: string[] = ['select','ALCANCE', 'CATEGORIA', 'SUBCATEGORIA', 'ACTIVIDAD', 'CONCATENADO', 'COMBUSTIBLE', 'CONTAMINANTE', 'INCERTIDUMBRE', 'VALORFE', 'UNIDADFE', 'ORIGENFE'];

  public form: FormGroup = new FormGroup({
    cod: new FormControl('', Validators.required),
    ALCANCE: new FormControl('', Validators.required),
    CATEGORIA: new FormControl('', Validators.required),
    SUBCATEGORIA: new FormControl('', Validators.required),
    ACTIVIDAD: new FormControl('', Validators.required),
    CONCATENADO: new FormControl('', Validators.required),
    COMBUSTIBLE: new FormControl('', Validators.required),
    CONTAMINANTE: new FormControl('', Validators.required),
    INCERTIDUMBRE: new FormControl('', Validators.required),
    VALORFE: new FormControl('', Validators.required),
    UNIDADFE: new FormControl('', Validators.required),
    ORIGENFE: new FormControl('', Validators.required),
        //... puedes agregar todos los campos que necesites aquí.
});

public mostrandoFormulario = false;

constructor(private http: HttpClient, private cdRef: ChangeDetectorRef) { }
  
  async ngOnInit(): Promise<void> {
    let factoresDesdeDataStore: Factor[] = [];
    try {
      factoresDesdeDataStore = await DataStore.query(Factor);
    } catch (error) {
      console.error('Error al consultar DataStore:', error);
    }
    
    this.http.get<any>('/assets/factores.json').subscribe(data => {
      let combustiblesVistos = new Set();
    
      const factoresDesdeJson = data.factores;
      this.factores = [...factoresDesdeDataStore, ...factoresDesdeJson];

      
      this.factores = this.factores.filter((factor: any) => {
        if (!combustiblesVistos.has(factor.CONCATENADO)) {
          combustiblesVistos.add(factor.CONCATENADO);
          return true;  // conserva el factor en el array
        }
        return false;  // descarta el factor del array
      });
    });
  }
  mostrarFormulario(): void {
    this.mostrandoFormulario = true;
}

async agregarFactor(): Promise<void> {
    const nuevoFactor = this.form.value;
    try {
        await DataStore.save(new Factor(nuevoFactor));
        this.factores = [nuevoFactor, ...this.factores];
        this.cdRef.detectChanges();
        this.mostrandoFormulario = false; // Oculta el formulario
        this.form.reset(); // <-- Limpia el formulario
    } catch (error) {
        console.error("Error al guardar el nuevo factor:", error);
    }
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
  const seleccionados = this.selection.selected;

  // Elimina de DataStore
  for (let item of seleccionados) {
      try {
          await DataStore.delete(Factor, item.id);
      } catch (error) {
          console.error("Error al eliminar el factor:", error);
      }
  }

  // Actualiza el arreglo local
  this.factores = this.factores.filter(factor => !this.selection.isSelected(factor));

  // Limpia la selección
  this.selection.clear();
}


}
