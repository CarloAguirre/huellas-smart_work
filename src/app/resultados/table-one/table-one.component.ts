import { Component, Input } from '@angular/core';
import { AlcanceUnoPeriodo } from '../dashboard/interfaces/alcanceUno.interfaces';

@Component({
  selector: 'app-table-one',
  templateUrl: './table-one.component.html',
  styleUrls: ['./table-one.component.css']
})
export class TableOneComponent {

  @Input() alcanceUnoDetail!: AlcanceUnoPeriodo ;
}
