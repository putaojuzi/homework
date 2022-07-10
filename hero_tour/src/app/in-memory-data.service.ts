import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Dr Nice', power:'fly', location:'American' },
      { id: 12, name: 'Narco' , power:'swim', location:'California'},
      { id: 13, name: 'Bombasto', power:'fire', location:'Africa'},
      { id: 14, name: 'Celeritas', power:'ice', location:'North American'},
      { id: 15, name: 'Magneta' , power:'land', location:'Germany'},
      { id: 16, name: 'RubberMan' , power:'water', location:'England'},
      { id: 17, name: 'Dynama' , power:'giant', location:'American'},
      { id: 18, name: 'Dr IQ' , power:'fast', location:'California'},
      { id: 19, name: 'Magma' , power:'predict', location:'Africa'},
      { id: 20, name: 'Tornado' , power:'super rich', location:'Germany'}
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/