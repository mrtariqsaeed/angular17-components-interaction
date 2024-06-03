import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product, Stock } from './models';
import { getStock } from './stock';

@Component({
  selector: 'cart-item',
  standalone: true,
  template: `
    <li>
        {{ product.name }} | {{ '$' + product.price }} |
        <button (click)="removeItem()">-</button>
        {{ product.qty }}
        <button (click)="addItem()">+</button>
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
  _product!: Product
  stock: Stock | undefined

  @Input({ required: true })
  set product(p: Product) {
    this.stock = getStock().find((s) => s.id === p.id)
    this._product = p
  }
  get product() {
    return this._product
  }
  
  @Output() remove = new EventEmitter()
  @Output() add = new EventEmitter()

  removeItem() {
    this.remove.emit()
  }

  addItem() {
    this.add.emit()
  }
}
