import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Pizza } from '@/_models';
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class PizzaService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Pizza[]>(`${config.apiUrl}/pizza`)
      .pipe(map(response => {
        return response;
      }));
  }

  delete(id: number) {
    return this.http.delete(`${config.apiUrl}/pizza/${id}`);
  }

  addPizza(pizza) {
    return this.http.post(`${config.apiUrl}/pizza/`, pizza);
  }

  updatePizza(id: number, pizza) {
    return this.http.put(`${config.apiUrl}/pizza/${id}`, pizza);
  }

  getPizza(id: number) {
    return this.http.get(`${config.apiUrl}/pizza/${id}`);
  }
}
