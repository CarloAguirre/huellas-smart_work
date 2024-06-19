import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataStore } from 'aws-amplify';
import { DataService } from './services/data.service';
import { Hub } from 'aws-amplify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'huella-smart-lite';
  user: any = null;
  company: any = null;
  establishments: any = null;

  constructor(
    private router: Router,
    private dataService: DataService,
    private changeDetector: ChangeDetectorRef  // Inyectar ChangeDetectorRef
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      await DataStore.start();
      console.log('DataStore has started!');

      // Escuchar eventos de autenticación
      Hub.listen('auth', (data) => {
        const { event } = data.payload;
        if (event === 'signIn') {
          this.handleSignIn();
        }
      });
    } catch (error) {
      console.error('Error starting DataStore:', error);
    }
  }

  async handleSignIn(): Promise<void> {
    await this.loadUserData();
    this.router.navigate(['/resultados']);  // Redirigir a la ruta "resultados"
  }

  async loadUserData() {
    try {
      const data = await this.dataService.getUserAndCompany();
      if (data) {
        this.user = data.user;
        this.company = data.company;
        console.log(this.user);
        this.changeDetector.detectChanges();  // Forzar la detección de cambios
      }
    } catch (error) {
      console.error("Error al obtener el usuario y la compañía:", error);
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
    } catch (error) {
      console.error('Hubo un error:', error);
    }
  }
}
