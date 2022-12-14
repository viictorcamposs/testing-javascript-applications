import { Cart } from './Cart'

describe('Cart', () => {
  let cart

  const product = {
    title: 'Adidas running shoes - men',
    price: 35388, // 353.88 | R$ 353,88
  }

  const product2 = {
    title: 'Adidas running shoes - women',
    price: 41872, // 418.72 | R$ 418,72
  }

  beforeEach(() => {
    cart = new Cart()
  })

  describe('getTotal()', () => {
    it('should return 0 when getTotal() is executed in a newly created instance', () => {
      expect(cart.getTotal().getAmount()).toEqual(0)
    })

    it('should multiply quantity and price and receive the total amount', () => {
      const item = {
        product,
        quantity: 2,
      }

      cart.add(item)

      expect(cart.getTotal().getAmount()).toEqual(70776)
    })

    it('should ensure no more than one product exists at a time', () => {
      cart.add({
        product,
        quantity: 2,
      })

      cart.add({
        product,
        quantity: 1,
      })

      expect(cart.getTotal().getAmount()).toEqual(35388)
    })

    it('should update total when a product gets included and then removed', () => {
      cart.add({
        product,
        quantity: 2,
      })

      cart.add({
        product: product2,
        quantity: 1,
      })

      cart.remove(product)

      expect(cart.getTotal().getAmount()).toEqual(41872)
    })
  })

  describe('checkout()', () => {
    it('should return an object with the total amount and the list of products', () => {
      cart.add({
        product,
        quantity: 5,
      })

      cart.add({
        product: product2,
        quantity: 4,
      })

      expect(cart.checkout()).toMatchSnapshot()
    })

    it('should return an object with the total amount and the list of products when summary() is called', () => {
      cart.add({
        product,
        quantity: 5,
      })

      cart.add({
        product: product2,
        quantity: 4,
      })

      expect(cart.summary()).toMatchSnapshot()
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0)
    })

    it('should include formatted amount in the summary', () => {
      cart.add({
        product,
        quantity: 5,
      })

      cart.add({
        product: product2,
        quantity: 4,
      })

      expect(cart.summary().formattedAmount).toEqual('R$3,444.28')
    })

    it('should reset the cart when checkout() is called', () => {
      cart.add({
        product,
        quantity: 3,
      })

      cart.checkout()

      expect(cart.getTotal().getAmount()).toEqual(0)
    })
  })

  describe('special conditions', () => {
    it('should apply percentage discount if quantity above minimum is passed', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      }

      cart.add({
        product,
        condition,
        quantity: 3,
      })

      expect(cart.getTotal().getAmount()).toEqual(74315)
    })

    it('should not apply a percentage discount if the quantity provided is below or equal to the minimum', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      }

      cart.add({
        product,
        condition,
        quantity: 2,
      })

      expect(cart.getTotal().getAmount()).toEqual(70776)
    })

    it('should apply quantity discount for even quantities', () => {
      const condition = {
        quantity: 2,
      }

      cart.add({
        product,
        condition,
        quantity: 4,
      })

      expect(cart.getTotal().getAmount()).toEqual(70776)
    })

    it('should apply quantity discount for odd quantities', () => {
      const condition = {
        quantity: 2,
      }

      cart.add({
        product,
        condition,
        quantity: 5,
      })

      expect(cart.getTotal().getAmount()).toEqual(106164)
    })

    it('should not apply a quantity discount if the quantity provided is below the condition', () => {
      const condition = {
        quantity: 2,
      }

      cart.add({
        product,
        condition,
        quantity: 1,
      })

      expect(cart.getTotal().getAmount()).toEqual(35388)
    })

    it('should receive two or more conditions and determine/apply the best discount. (first case)', () => {
      const condition1 = {
        percentage: 30, // max 30%
        minimum: 2,
      }

      const condition2 = {
        quantity: 2, // odd = 40% | even = 50%
      }

      cart.add({
        product,
        condition: [condition1, condition2],
        quantity: 5,
      })

      // 35388 * 5 = 176940 * 0,6 = 106164

      expect(cart.getTotal().getAmount()).toEqual(106164)
    })

    it('should receive two or more conditions and determine/apply the best discount. (second case)', () => {
      const condition1 = {
        percentage: 80, // max 80%
        minimum: 2,
      }

      const condition2 = {
        quantity: 2, // odd = 40% | even = 50%
      }

      cart.add({
        product,
        condition: [condition1, condition2],
        quantity: 5,
      })

      // 35388 * 5 = 176940 * 0,2 = 35388

      expect(cart.getTotal().getAmount()).toEqual(35388)
    })
  })
})
