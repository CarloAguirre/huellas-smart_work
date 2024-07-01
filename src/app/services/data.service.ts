import { Injectable } from '@angular/core';
import { DataStore } from 'aws-amplify';
import { Company, User } from '../../models';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  dataStoreReady: Promise<void>;

  constructor() {
    this.dataStoreReady = DataStore.start();
  }

  async getUserAndCompany() {
    try {
      await this.dataStoreReady;
      await this.syncDataStore();

      const cognitoUser = await Auth.currentAuthenticatedUser();
      const sub = cognitoUser.attributes.sub;

      const users = await DataStore.query(User);

      if (users.length > 0) {
        const user = users.find(u => u.sub === sub);
        const companies = await DataStore.query(Company);
        const company = companies.find(c => c.id === user?.companyID);
        return { user, company };
      } else {
        console.log('No se encontraron usuarios.');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener el usuario y la compañía:', error);
      return null;
    }
  }

  private async syncDataStore() {
    return new Promise<void>((resolve) => {
      const interval = setInterval(async () => {
        const users = await DataStore.query(User);
        if (users.length > 0) {
          clearInterval(interval);
          resolve();
        }
      }, 1000);
    });
  }
}
