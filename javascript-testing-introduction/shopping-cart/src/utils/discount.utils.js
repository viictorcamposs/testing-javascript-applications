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
  debugger
  const isEven = quantity % 2 === 0

  if (condition?.quantity && quantity > condition?.quantity) {
    return amount.percentage(isEven ? 50 : 40)
  }

  return Money({ amount: 0 })
}

export const calculateDiscount = (amount, quantity, _condition) => {
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
