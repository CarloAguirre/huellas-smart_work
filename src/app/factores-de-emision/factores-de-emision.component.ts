import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-factores-de-emision',
  templateUrl: './factores-de-emision.component.html',
  styleUrls: ['./factores-de-emision.component.css']
})
export class FactoresDeEmisionComponent implements OnInit {
  factores: any[] = [];
  displayedColumns: string[] = ['ALCANCE', 'CATEGORIA', 'SUBCATEGORIA', 'ACTIVIDAD', 'CONCATENADO', 'COMBUSTIBLE', 'CONTAMINANTE', 'INCERTIDUMBRE', 'VALORFE', 'UNIDADFE', 'ORIGENFE'];


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('/assets/factores.json').subscribe(
      data => {
        let combustiblesVistos = new Set();
        
        this.factores = data.factores.filter((factor: any) => {
          if (!combustiblesVistos.has(factor.CONCATENADO)) {
            combustiblesVistos.add(factor.CONCATENADO);
            return true; // conserva el factor en el array
          }
          return false; // descarta el factor del array
        });
      },
      error => {
        console.error('Error al cargar factores.json:', error);
      }
    );
  }
  
  
}
