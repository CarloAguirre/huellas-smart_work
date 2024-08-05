// app.component.ts

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataStore } from 'aws-amplify';
import { HttpClient } from '@angular/common/http'
import { DataService } from './services/data.service';
import { Hub } from 'aws-amplify';
import { Establishment, Emision, Factor } from 'src/models';
import { DataSharingService } from './services/data-sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'huella-smart-lite';
  user: any = null;
  company: any = null;
  companyID: string = '';
  userID: string  = 'null';
  userData: object | null = {};
  establishmentID: string = 'null';
  establecimientos: Establishment[] = [];
  emisiones: Emision[] = [];
  factoresJson: Factor[] = [];
  factores: Factor[] = [];
  factoresDesdeJson: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dataService: DataService,
    private dataSharingService: DataSharingService,
    private changeDetector: ChangeDetectorRef
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      await DataStore.start();

      Hub.listen('emisiones', async (data) => {
        const { event } = data.payload;
        if (event === 'nuevaEmision' || event === "borrarEmision") {
          await this.actualizarEmisiones();
        }
      });

      Hub.listen('auth', (data) => {
        const { event } = data.payload;
        if (event === 'signIn') {
          this.handleSignIn();
        }
      });
      Hub.listen('factores', (data) => {
        const { event } = data.payload;
        if (event === 'nuevoFactor') {
          this.actualizarFactores();
        }
      });
      await this.loadUserData();
    } catch (error) {
      console.error('Error starting DataStore:', error);
    }
  }


  async handleSignIn(): Promise<void> {
    const userData = await this.loadUserData();
    if (userData) {
      this.router.navigate(['/resultados']);
    } else {
      console.error('No se pudo obtener los datos del usuario.');
    }
  }

  async loadUserData() {
    try {
      const data = await this.dataService.getUserAndCompany();
      if (data && data.company && data.user) {
        this.user = data.user;
        this.company = data.company;
        this.companyID = data.user.companyID;
        this.userID = data.user.id;
        this.factores= await DataStore.query(Factor);

        this.userData = {
          user: this.user,
          userID: this.userID,
          company: this.company,
          companyID: this.companyID
        }
        this.dataSharingService.updateUserData(this.userData);

        this.establecimientos = await DataStore.query(Establishment, est => est.companyID.eq(this.companyID));
        this.dataSharingService.updateEstablecimientos(this.establecimientos);

        this.emisiones = await DataStore.query(Emision);
        this.dataSharingService.updateEmisiones(this.emisiones);

        this.factores = await DataStore.query(Factor, factor => factor.userID.eq(this.userID));
        this.http.get<any>('../assets/factores.json').subscribe(data => {
          this.factoresDesdeJson = data.factores;
          this.factores = [...this.factores, ...this.factoresDesdeJson];
          this.dataSharingService.updateFactores(this.factores);
        }, error => {
          console.error('Error al obtener los factores de emisión desde el archivo JSON:', error);
        });


        this.changeDetector.detectChanges();
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el usuario y la compañía:", error);
      return null;
    } finally {
      console.log('loadUserData completado.');
    }
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  async handleSignOut(signOutFunction: any) {
    try {
      await DataStore.clear();
      console.log('DataStore ha sido limpiado.');
      signOutFunction();
      this.router.navigate(['/'])
    } catch (error) {
      console.error('Hubo un error:', error);
    }
  }

  async actualizarEmisiones(): Promise<void> {
    try {
      this.emisiones = await DataStore.query(Emision);
      this.dataSharingService.updateEmisiones(this.emisiones);
      this.changeDetector.detectChanges();
      console.log('emisiones actualizadas!')
    } catch (error) {
      console.error('Error al actualizar las emisiones:', error);
    }
  }

  async actualizarFactores(): Promise<void> {
    try {
      this.factores = await DataStore.query(Factor, factor => factor.userID.eq(this.userID));
      this.factores = [...this.factores, ...this.factoresDesdeJson];
      this.dataSharingService.updateFactores(this.factores);
      this.changeDetector.detectChanges();
      console.log('Factores actualizadas!')
    } catch (error) {
      console.error('Error al actualizar las emisiones:', error);
    }
  }
}
