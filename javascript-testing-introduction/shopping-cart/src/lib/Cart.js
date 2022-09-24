import { add, remove, find } from 'lodash'

export class Cart {
  items = []

  getTotal() {
    return this.items.reduce(
      (acc, { product, quantity }) => acc + product.price * quantity,
      0,
    )
  }

  add(item) {
    const itemToFind = { product: item.product }

    if (find(this.items, itemToFind)) {
      remove(this.items, itemToFind)
    }

    this.items.push(item)
  }

  remove(product) {
    remove(this.items, { product })
  }
}
