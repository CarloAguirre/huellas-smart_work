import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Emision, Establishment } from 'src/models';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private emisionesSource = new BehaviorSubject<Emision[]>([]);
  emisiones$ = this.emisionesSource.asObservable();

  private establecimientosSource = new BehaviorSubject<Establishment[]>([]);
  establecimientos$ = this.establecimientosSource.asObservable();

  updateEmisiones(emisiones: Emision[]) {
    this.emisionesSource.next(emisiones);
  }

  updateEstablecimientos(establecimientos: Establishment[]) {
    this.establecimientosSource.next(establecimientos);
  }
}
