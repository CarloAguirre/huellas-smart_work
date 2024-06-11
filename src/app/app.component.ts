import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStore } from '@aws-amplify/datastore';
import { DataService } from './services/data.service';  // Importa DataService


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {  // Asegúrate de que tu componente implemente OnInit
  title = 'huella-smart-lite';
  user: any = null;  // Añade propiedad para guardar el usuario
  company: any = null;  // Añade propiedad para guardar la compañía
  establishments: any = null;

  constructor(
    private router: Router,
    private dataService: DataService  // Inyecta DataService en el constructor
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      await DataStore.start();  // Inicia DataStore
      console.log('DataStore has started!');
    } catch (error) {
      console.error('Error starting DataStore:', error);
      return;  // Si hay un error, sale temprano
    }
    this.loadUserData();  // Llama a la nueva función loadUserData en lugar de loadNickname
  }

  handleSignIn(event: any): void {
    this.loadUserData();  // Llama a loadUserData cuando el usuario inicia sesión
}

  async loadUserData() {
    try {
      const data = await this.dataService.getUserAndCompany();  // Llama a getUserAndCompany
      if (data) {
        this.user = data.user;
        this.company = data.company;
        console.log('Usuario:', this.user);
        console.log('Compañía:', this.company);
        console.log('Establecimientos:', this.establishments);

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
      // Limpiar el DataStore local
      await DataStore.clear();
      console.log('DataStore ha sido limpiado.');

      // Luego, usar la función de cerrar sesión provista por el slot
      signOutFunction();
    } catch (error) {
      console.error('Hubo un error:', error);
    }
  }
}
