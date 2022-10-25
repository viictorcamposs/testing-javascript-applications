import { screen, render, waitFor } from '@testing-library/react'

import ProductList from '../../pages/index'

describe('ProductList', () => {
  beforeEach(() => {
    render(<ProductList />)
  })

  it('should render product list', () => {
    expect(screen.getByTestId('product-list')).toBeInTheDocument()
  })

  it('should render the ProductCard component 10 times', async () => {
    await waitFor(() => {
      expect(screen.getAllByTestId('product-card')).toHaveLength(10)
    })
  })

  it.todo('should render the no product message')
  it.todo('should render the Search component')
  it.todo('should filter the product list when a search is performed')
  it.todo('should display error message when promise rejects')
  it.todo('should display the total quantity of products')
  it.todo('should display product (singular) when there is only 1 product')
})
