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
        (remove)="updateQTY('remove', product.id)"
        (add)="updateQTY('add', product.id)"
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
			name: 'sugar',
			price: 5,
			qty: 2
		},
		{
			id: 2,
			name: 'rice',
			price: 8,
			qty: 1
		}
	]

	constructor() {
		this.total = this.calcTotal()
	}

  updateQTY(action: 'add' | 'remove', id: number) {
    const product = this.products.find((p) => p.id === id)
    if(!product) return
    switch(action) {
      case 'add':
        product.qty++
        break
      case 'remove':
        if(product.qty > 0) product.qty--
        break
    }
    this.total = this.calcTotal()
  }

	calcTotal() {
		return this.products.reduce((acc, p) => acc + p.price * p.qty, 0)
	}
}
