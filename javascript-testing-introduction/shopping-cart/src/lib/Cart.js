import { remove, find } from 'lodash'
import Money from 'dinero.js'

Money.defaultCurrency = 'BRL'
Money.defaultPrecision = 2

const calculatePercentageDiscount = (amount, { quantity, condition }) => {
  if (quantity > condition?.minimum) {
    return amount.percentage(condition.percentage)
  }

  return Money({ amount: 0 })
}

const calculateQuantityDiscount = (amount, { quantity, condition }) => {
  const isEven = quantity % 2 === 0

  if (condition?.quantity && quantity > condition?.quantity) {
    return amount.percentage(isEven ? 50 : 40)
  }

  return Money({ amount: 0 })
}

const calculateDiscount = (amount, quantity, _condition) => {
  const list = Array.isArray(_condition) ? _condition : [_condition]

  const [higherDiscount] = list
    .map(condition => {
      if (condition.percentage) {
        return calculatePercentageDiscount(amount, {
          condition,
          quantity,
        }).getAmount()
      } else if (condition.quantity) {
        return calculateQuantityDiscount(amount, {
          condition,
          quantity,
        }).getAmount()
      }
    })
    .sort((a, b) => b - a)

  return Money({ amount: higherDiscount })
}

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
