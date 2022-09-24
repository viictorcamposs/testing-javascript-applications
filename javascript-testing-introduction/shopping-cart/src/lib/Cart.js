import { add, remove, find } from 'lodash'

export class Cart {
  items = []

  checkout() {
    const summary = this.summary()

    this.items = []

    return summary
  }

  getTotal() {
    return this.items.reduce(
      (acc, { product, quantity }) => acc + product.price * quantity,
      0,
    )
  }

  summary() {
    const total = this.getTotal()
    const items = this.items

    return {
      total,
      items,
    }
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
