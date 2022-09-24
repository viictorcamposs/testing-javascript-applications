import { remove, find } from 'lodash'
import Money from 'dinero.js'

Money.defaultCurrency = 'BRL'
Money.defaultPrecision = 2

export class Cart {
  items = []

  checkout() {
    const summary = this.summary()

    this.items = []

    return summary
  }

  getTotal() {
    return this.items.reduce((acc, { product, quantity, condition }) => {
      const amount = Money({ amount: product.price * quantity })
      let discount = Money({ amount: 0 })

      if (condition && condition.percentage && quantity >= condition.minimum) {
        discount = amount.percentage(condition.percentage)
      }

      return acc.add(amount).subtract(discount)
    }, Money({ amount: 0 }))
  }

  summary() {
    const total = this.getTotal().getAmount()
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
