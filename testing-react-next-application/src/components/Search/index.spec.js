import Search from './index'
import { render, screen, fireEvent } from '@testing-library/react'

const handleSearch = jest.fn()

describe('Search', () => {
  it('should render a form element', () => {
    render(<Search handleSearch={handleSearch} />)

    expect(screen.getByRole('form')).toBeInTheDocument()
  })

  it('should call props.handleSearch() when form is submitted', async () => {
    render(<Search handleSearch={handleSearch} />)

    const form = screen.getByRole('form')

    await fireEvent.submit(form)

    expect(handleSearch).toHaveBeenCalledTimes(1)
  })
})
