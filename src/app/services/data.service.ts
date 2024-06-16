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
            const companys = await DataStore.query(Company);
            const company = companys.find(c => c.id == user?.companyID)

            // console.log(user, company)
            return { user, company };
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
