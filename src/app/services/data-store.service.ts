// data-store.service.ts
import { Injectable } from '@angular/core';
import { DataStore } from '@aws-amplify/datastore';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private initialized = false;

  constructor() { }

  async initialize(): Promise<boolean> {
    if (!this.initialized) {
      try {
        await DataStore.start();
        console.log('DataStore has started!');
        this.initialized = true;
        return true
      } catch (error) {
        console.error('Error starting DataStore:', error);
        throw error;
      }
    }
    return true
  }
}
