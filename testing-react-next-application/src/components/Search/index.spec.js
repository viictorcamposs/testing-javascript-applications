import Search from './index'
import { render, screen } from '@testing-library/react'

describe('Search', () => {
  it('should render a form', () => {
    render(<Search />)

    expect(screen.getByRole('form')).toBeInTheDocument()
  })
})
