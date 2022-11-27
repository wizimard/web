import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { PizzaService } from '@/_services';

@Component({ templateUrl: 'pizza.component.html' })
export class PizzaComponent implements OnInit {
	pizzas = [];
	pizzaForm = this.fb.group({
    type: ['', Validators.min(3) ],
    name: ['', Validators.required ],
    model: ['', Validators.min(3) ],
    price: [0, Validators.min(1) ],
  });

  constructor(
    private pizzaService: PizzaService,
    private fb: FormBuilder
  ) {
		this.getAll();
		this.setForm();
  }

  ngOnInit() {}

	updatePizza(id: number) {
	 this.pizzaService
    .getPizza(id)
    .subscribe(data => {
      this.setForm(data);
    },
    error => {
      console.log(error);
    });
  }

  deletePizza(id: number) {
    this.pizzaService.delete(id).subscribe(() => {
      this.getAll();
    })  
  }


	onSubmit() {
    const pizza = {
      type: this.pizzaForm.controls.type.value,
      name: this.pizzaForm.controls.name.value,
      model: this.pizzaForm.controls.model.value,
      price: this.pizzaForm.controls.price.value,
    };

    if (this.pizzaForm.controls.id.value) {
      this.pizzaService
        .updatePizza(this.pizzaForm.controls.id.value, pizza)
        .subscribe(() => {
          this.getAll()
        });
    } else {
      this.pizzaService.addPizza(pizza)
        .subscribe(
          data => {
            this.pizzas.push(data);
          },
          error => {
            console.log(error);
          });
    }

    this.setForm();
  }

  private getAll(){
    this.pizzaService.getAll()
      .subscribe(
        data => {
          this.pizzas = data;
        },
        error => {
          console.log(error);
        });
  }

	private setForm(data = null) {
    this.pizzaForm = this.fb.group({
      type: [ (data && data.type) ? data.type : 0, Validators.min(3) ],
      name: [ (data && data.name) ? data.name : '', Validators.required ],
      model: [(data && data.model) ? data.model :  0, Validators.min(3) ],
      price: [(data && data.price) ? data.price : 0, Validators.min(1) ],
      id: [(data && data.id) ? data.id : null]
    });
  }

}
