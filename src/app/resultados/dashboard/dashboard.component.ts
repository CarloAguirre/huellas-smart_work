import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { EmisionesResumen } from '../dashboard/interfaces/EmisionesResumen.interfaces';
import { Emision } from 'src/models';
import { TotalCategorias } from './interfaces/TotalCategorias.interfaces';

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
  @Input() totalCategorias!: TotalCategorias ;
  @Input() categoryMap: { [key: string]: keyof Categoria } = {};

  alcanceKeys: Alcance[] = ['alcanceUno', 'alcanceDos', 'alcanceTres'];
  sortedCategories: { alcance: Alcance, key: keyof Categoria, value: number }[] = [];
  filteredCategories: { alcance: Alcance, key: keyof Categoria, value: number }[] = [];
  selectedAlcance: Alcance | 'all' = 'all';

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalCategorias'] || changes['resumenEmisiones'] || changes['alcanceUno'] || changes['alcanceDos'] || changes['alcanceTres'] || changes['totalAlcanceUno'] || changes['totalAlcanceDos'] || changes['totalAlcanceTres'] || changes['totalAlcance'] || changes['emisiones'] || changes['chartOptions']) {
      this.calculateSortedCategories();
      this.changeDetector.detectChanges();
    }
  }

  calculateSortedCategories(): void {
    const categories: { alcance: Alcance, key: keyof Categoria, value: number }[] = [];

    for (const alcance of this.alcanceKeys) {
      const categoria = this.totalCategorias[alcance];
      for (const key of this.getCategoryKeys(categoria)) {
        const value = this.getCategoriaTotal(alcance, key);
        if (value !== null && value !== 0) {
          categories.push({ alcance, key, value });
        }
      }
    }

    this.sortedCategories = categories.sort((a, b) => b.value - a.value);
    this.filterCategories();
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

  getRelativePercentage(value: number): number {
    const maxValue = this.getMaxValue();
    return maxValue > 0 ? (value / maxValue) * 100 : 0;
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
        return '#cccccc';
    }
  }

  getCategoryKeys(obj: Categoria): (keyof Categoria)[] {
    return Object.keys(obj) as (keyof Categoria)[];
  }

  getCategoriaTotal(alcance: Alcance, key: keyof Categoria): number {
    const value = this.totalCategorias[alcance][key];
    return value ?? 0;
  }

  setAlcance(alcance: Alcance | 'all'): void {
    this.selectedAlcance = alcance;
    this.filterCategories();
  }

  getMaxValue(): number {
    return Math.max(...this.sortedCategories.map(category => category.value));
  }
}
