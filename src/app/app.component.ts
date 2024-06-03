import { Component } from '@angular/core'
import { Product } from './models'
import { CartItemComponent } from './cart-item.component'

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CartItemComponent],
	template: `
		<h1>Shopping Cart</h1>
		@for (product of products; track product.id) {
		<cart-item
			[product]="product"
			(add)="updateQTY('add', product.id)"
			(remove)="updateQTY('remove', product.id)"
		/>
		}
		<b>Total: {{ '$' + total }}</b>
	`
})
export class AppComponent {
	total = 0
	products: Product[] = [
		{
			id: 1,
			name: 'Sugar',
			price: 5,
			qty: 2
		},
		{
			id: 2,
			name: 'Rice',
			price: 8,
			qty: 1
		}
	]

	constructor() {
		this.total = this.calcTotal()
	}

	calcTotal() {
		return this.products.reduce((acc, p) => acc + p.price * p.qty, 0)
	}

	updateQTY(action: 'add' | 'remove', id: number) {
		const p = this.products.find(i => i.id === id)
		if(!p) return
		switch(action) {
			case 'add':
				p.qty++
				break
			case 'remove':
				if(p.qty > 0) p.qty--
				break
		}
		this.total = this.calcTotal()
	}
}
