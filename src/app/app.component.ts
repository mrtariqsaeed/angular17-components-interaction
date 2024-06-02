import { Component, signal } from '@angular/core'

@Component({
	selector: 'app-root',
	standalone: true,
	template: `
		<h1>Shopping Cart</h1>

		@for (product of products; track product.id) {
      <li>
        {{ product.name }} | {{ '$' + product.price }} |
        <button (click)="reduceItem(product.id)">-</button>
        {{ product.quantity }}
        <button (click)="addItem(product.id)">+</button>
      </li>
		}

		<b>Total: {{ total }}</b>
	`,
	styles: `
    li {
      list-style: none;
      margin: 10px 0;
      padding: 10px;
      background: #ddd;
    }
  `
})
export class AppComponent {
	total = 0
	products = [
		{
			id: 1,
			name: 'sugar',
			price: 5,
			quantity: 2
		},
		{
			id: 2,
			name: 'rice',
			price: 8,
			quantity: 1
		}
	]

	constructor() {
		this.total = this.calcTotal()
	}

	addItem(id: number) {
		const product = this.products.find((p) => p.id === id)
		if (product) product.quantity++
		this.total = this.calcTotal()
	}

	reduceItem(id: number) {
		const product = this.products.find((p) => p.id === id)
		if (product && product.quantity > 0) product.quantity--
		this.total = this.calcTotal()
	}

	calcTotal() {
		return this.products.reduce((acc, p) => acc + p.price * p.quantity, 0)
	}
}
