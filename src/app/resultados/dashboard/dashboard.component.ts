import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { EmisionesResumen } from '../dashboard/interfaces/EmisionesResumen.interfaces';
import { Emision } from 'src/models';

export type Categoria = {
  combustionEstacionaria: number | null;
  emisionesFugitivas: number | null;
  emisionesDeProcesos: number | null;
  combustionMovil: number | null;
  carlorVaporRefrigeracion: number | null;
  electricidadComprada: number | null;
  perdidasPorTransmision: number | null;
  bienesYServicios: number | null;
  residuosGenerados: number | null;
  transporteAguasArriba: number | null;
  transporteAguasAbajo: number | null;
  usoDeProductos: number | null;
  desplazamientoDeEmpleados: number | null;
  viajeDeNegocios: number | null;
};

export type TotalCategorias = {
  alcanceUno: Categoria;
  alcanceDos: Categoria;
  alcanceTres: Categoria;
};

type Alcance = 'alcanceUno' | 'alcanceDos' | 'alcanceTres';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {
  @Input() chartOptions: any;
  @Input() resumenEmisiones: EmisionesResumen[] = [];
  @Input() alcanceUno: any;
  @Input() alcanceDos: any;
  @Input() alcanceTres: any;
  @Input() totalAlcanceUno: any;
  @Input() totalAlcanceDos: any;
  @Input() totalAlcanceTres: any;
  @Input() totalAlcance: any;
  @Input() emisiones: Emision[] = [];
  @Input() totalCategorias!: TotalCategorias;

  public categoryMap: { [key: string]: keyof Categoria } = {
    "Combustión estacionaria": "combustionEstacionaria",
    "Emisiones fugitivas": "emisionesFugitivas",
    "Emisiones de procesos": "emisionesDeProcesos",
    "Combustión móvil": "combustionMovil",
    "Calor, vapor, refrigeración y aire comprimido comprados": "carlorVaporRefrigeracion",
    "Electricidad comprada": "electricidadComprada",
    "Pérdidas por transmisión y distribución": "perdidasPorTransmision",
    "Bienes y servicios comprados": "bienesYServicios",
    "Residuos generados en las operaciones": "residuosGenerados",
    "Transporte y distribución aguas arriba (cadena de suministro)": "transporteAguasArriba",
    "Transporte y distribución aguas abajo (cadena de valor)": "transporteAguasAbajo",
    "Uso de productos vendidos": "usoDeProductos",
    "Desplazamiento de los empleados": "desplazamientoDeEmpleados",
    "Viaje de negocio": "viajeDeNegocios"
  };

  alcanceKeys: Alcance[] = ['alcanceUno', 'alcanceDos', 'alcanceTres'];
  sortedCategories: { alcance: Alcance, key: keyof Categoria, value: number }[] = [];
  filteredCategories: { alcance: Alcance, key: keyof Categoria, value: number }[] = [];
  selectedAlcance: Alcance | 'all' = 'all';

  constructor() {
    this.totalCategorias = {
      alcanceUno: {
        combustionEstacionaria: 0,
        emisionesFugitivas: 0,
        emisionesDeProcesos: 0,
        combustionMovil: 0,
        carlorVaporRefrigeracion: 0,
        electricidadComprada: 0,
        perdidasPorTransmision: 0,
        bienesYServicios: 0,
        residuosGenerados: 0,
        transporteAguasArriba: 0,
        transporteAguasAbajo: 0,
        usoDeProductos: 0,
        desplazamientoDeEmpleados: 0,
        viajeDeNegocios: 0
      },
      alcanceDos: {
        combustionEstacionaria: 0,
        emisionesFugitivas: 0,
        emisionesDeProcesos: 0,
        combustionMovil: 0,
        carlorVaporRefrigeracion: 0,
        electricidadComprada: 0,
        perdidasPorTransmision: 0,
        bienesYServicios: 0,
        residuosGenerados: 0,
        transporteAguasArriba: 0,
        transporteAguasAbajo: 0,
        usoDeProductos: 0,
        desplazamientoDeEmpleados: 0,
        viajeDeNegocios: 0
      },
      alcanceTres: {
        combustionEstacionaria: 0,
        emisionesFugitivas: 0,
        emisionesDeProcesos: 0,
        combustionMovil: 0,
        carlorVaporRefrigeracion: 0,
        electricidadComprada: 0,
        perdidasPorTransmision: 0,
        bienesYServicios: 0,
        residuosGenerados: 0,
        transporteAguasArriba: 0,
        transporteAguasAbajo: 0,
        usoDeProductos: 0,
        desplazamientoDeEmpleados: 0,
        viajeDeNegocios: 0
      }
    };
  }

  ngOnInit(): void {
    // Eliminado el cálculo de categorías ordenadas aquí
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateSortedCategories();
    if (changes['totalCategorias']) {
      console.log('Total Categorias On Changes: ', this.totalCategorias);
    }
  }

  calculateSortedCategories(): void {
    const categories: { alcance: Alcance, key: keyof Categoria, value: number }[] = [];

    for (const alcance of this.alcanceKeys) {
      const categoria = this.totalCategorias[alcance];
      console.log(`Procesando alcance: ${alcance}`, categoria); // Debug
      for (const key of this.getCategoryKeys(categoria)) {
        const value = this.getCategoriaTotal(alcance, key);
        console.log(`Categoria: ${key}, Valor: ${value}`); // Debug
        if (value !== null && value !== 0) {
          categories.push({ alcance, key, value });
        }
      }
    }

    this.sortedCategories = categories.sort((a, b) => b.value - a.value);
    this.filterCategories();

    // Debug output
    console.log("Sorted Categories: ", this.sortedCategories);
  }

  filterCategories(): void {
    if (this.selectedAlcance === 'all') {
      this.filteredCategories = this.sortedCategories;
    } else {
      this.filteredCategories = this.sortedCategories.filter(category => category.alcance === this.selectedAlcance);
    }
  }

  getCategoryName(categoryKey: keyof Categoria): string {
    return Object.keys(this.categoryMap).find(key => this.categoryMap[key] === categoryKey) || '';
  }

  getTotalForAllAlcances(): number {
    let total = 0;
    for (const alcance of this.alcanceKeys) {
      total += this.getTotalForAlcance(alcance);
    }
    return total;
  }

  getTotalForAlcance(alcance: Alcance): number {
    const categorias = this.totalCategorias[alcance];
    return Object.values(categorias).reduce((acc: any, value) => acc + (value ?? 0), 0);
  }

  getPercentage(value: number, total: number): number {
    return total > 0 ? (value / total) * 100 : 0;
  }

  getBarColor(alcance: Alcance): string {
    switch (alcance) {
      case 'alcanceUno':
        return '#9fd09f';
      case 'alcanceDos':
        return '#97bcdd';
      case 'alcanceTres':
        return '#ffba49';
      default:
        return '#cccccc'; // Color por defecto si el alcance no coincide con ninguno
    }
  }

  getCategoryKeys(obj: Categoria): (keyof Categoria)[] {
    return Object.keys(obj) as (keyof Categoria)[];
  }

  getCategoriaTotal(alcance: Alcance, key: keyof Categoria): number {
    const value = this.totalCategorias[alcance][key];
    console.log(`getCategoriaTotal - Alcance: ${alcance}, Key: ${key}, Value: ${value}`);
    return value ?? 0;
  }

  setAlcance(alcance: Alcance | 'all'): void {
    this.selectedAlcance = alcance;
    this.filterCategories();
  }
}
