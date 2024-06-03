import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Product, Stock } from './models'
import { getStock } from './stock'

@Component({
	selector: 'cart-item',
	standalone: true,
	imports: [],
	template: `
		<li>
			{{ product.name }} | {{ '$' + product.price }} |
			<button (click)="updateQTY('remove')">-</button>
			{{ product.qty }}
			<button (click)="updateQTY('add')">+</button>
			Only {{ stock?.qty ?? 0 }} left!
		</li>
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
export class CartItemComponent {
	stock: Stock | undefined
	item!: Product

	@Input({ required: true })
	set product(p: Product) {
		this.stock = getStock(p.id)
		this.item = p
	}
	get product() {
		return this.item
	}

	@Output() add = new EventEmitter()
	@Output() remove = new EventEmitter()

	updateQTY(action: 'add' | 'remove') {
		switch (action) {
			case 'add':
				this.add.emit()
				break
			case 'remove':
				this.remove.emit()
				break
		}
	}
}
