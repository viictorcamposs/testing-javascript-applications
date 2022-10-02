import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ProductCard from './index'

const product = {
  title: 'Rolex',
  price: '1200.00',
  image:
    'https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
}

const addToCart = jest.fn()

describe('ProductCard', () => {
  beforeEach(() => {
    render(<ProductCard product={product} addToCart={addToCart} />)
  })

  it('should render component in the document', () => {
    expect(screen.getByTestId('product-card')).toBeInTheDocument()
  })

  it('should render product passed as props', () => {
    expect(screen.getByText(new RegExp(product.title, 'i'))).toBeInTheDocument()
    expect(screen.getByText(new RegExp(product.price, 'i'))).toBeInTheDocument()
    expect(screen.getByTestId('image')).toHaveStyle({
      backgroundImage: product.image,
    })
  })

  it('should call props.addToCart() when button gets clicked', async () => {
    const button = screen.getByRole('button')

    await userEvent.click(button)

    expect(addToCart).toHaveBeenCalledTimes(1)
    expect(addToCart).toHaveBeenCalledWith(product)
  })
})
