import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import CartItem from './index'

const product = {
  title: 'Mac Book Pro',
  price: '2000.00',
  image:
    'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80',
}

describe('CartItem', () => {
  beforeEach(() => {
    render(<CartItem product={product} />)
  })

  it('should render component in the document', () => {
    expect(screen.getByTestId('cart-item')).toBeInTheDocument()
  })

  it('should render product passed as  props', () => {
    expect(screen.getByTestId('image')).toHaveAttribute('src', product.image)
    expect(screen.getByTestId('image')).toHaveAttribute('alt', product.title)
    expect(screen.getByText(new RegExp(product.price, 'i'))).toBeInTheDocument()
    expect(screen.getByText(new RegExp(product.title, 'i'))).toBeInTheDocument()
  })

  it('should display 1 as initial quantity', () => {
    expect(screen.getByTestId('quantity').textContent).toEqual('1')
  })

  it('should increase the quantity by 1 when second button gets clicked', async () => {
    const [_, button] = screen.getAllByRole('button')

    await userEvent.click(button)

    expect(screen.getByTestId('quantity').textContent).toBe('2')
  })

  it('should decrease the quantity by 1 when first button gets clicked', async () => {
    const [button] = screen.getAllByRole('button')

    await userEvent.click(button)

    expect(screen.getByTestId('quantity').textContent).toBe('0')
  })

  it('should not go below 0 in the quantity', async () => {
    const [button] = screen.getAllByRole('button')

    await userEvent.dblClick(button)

    expect(screen.getByTestId('quantity').textContent).toBe('0')
  })
})
