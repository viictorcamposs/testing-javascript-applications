import { remove, find } from 'lodash'
import Money from 'dinero.js'

import { calculateDiscount } from '../utils/discount.utils'

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
    return this.items.reduce((acc, { quantity, product, condition }) => {
      const amount = Money({ amount: product.price * quantity })

      let discount = Money({ amount: 0 })

      if (condition) {
        discount = calculateDiscount(amount, quantity, condition)
      }

      return acc.add(amount).subtract(discount)
    }, Money({ amount: 0 }))
  }

  summary() {
    const total = this.getTotal()
    const formattedAmount = total.toFormat('$0,0.00')
    const items = this.items

    return {
      total: total.getAmount(),
      formattedAmount,
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
