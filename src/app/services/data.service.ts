import { Injectable } from '@angular/core';
import { DataStore } from 'aws-amplify';
import { Company, User, Establishment } from '../../models';
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
            await this.dataStoreReady;  // Espera a que DataStore esté listo
            const cognitoUser = await Auth.currentAuthenticatedUser();
            const sub = cognitoUser.username;
            const users = await DataStore.query(User);
            const user = users.find(u => u.sub === sub);
            const companyID = cognitoUser.attributes['custom:companyID'];
            const company = await DataStore.query(Company, companyID);

            // const establishments = await DataStore.query(Establishment, companyID)

            // const lala = establishments.filter(est => est.companyID === this.companyID) as Establishment[];
            return { user, company, companyID };
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
