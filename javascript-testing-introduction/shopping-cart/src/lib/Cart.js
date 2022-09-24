import { remove, find } from 'lodash'
import Money from 'dinero.js'

Money.defaultCurrency = 'BRL'
Money.defaultPrecision = 2

const calculatePercentageDiscount = (amount, item) => {
  if (item.quantity > item.condition?.minimum) {
    return amount.percentage(item.condition.percentage)
  }

  return Money({ amount: 0 })
}

const calculateQuantityDiscount = (amount, item) => {
  const isEven = item.quantity % 2 === 0

  if (item.condition?.quantity && item.quantity > item.condition?.quantity) {
    return amount.percentage(isEven ? 50 : 40)
  }

  return Money({ amount: 0 })
}

export class Cart {
  items = []

  checkout() {
    const summary = this.summary()

    this.items = []

    return summary
  }

  getTotal() {
    return this.items.reduce((acc, item) => {
      const amount = Money({ amount: item.product.price * item.quantity })

      const discount = item.condition?.percentage
        ? calculatePercentageDiscount(amount, item)
        : item.condition?.quantity
        ? calculateQuantityDiscount(amount, item)
        : Money({ amount: 0 })

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
