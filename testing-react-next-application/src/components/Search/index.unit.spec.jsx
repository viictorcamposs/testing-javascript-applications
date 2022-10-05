import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Search from './index'

const handleSearch = jest.fn()

describe('Search', () => {
  it('should render a form element', () => {
    render(<Search handleSearch={handleSearch} />)

    expect(screen.getByRole('form')).toBeInTheDocument()
  })

  it('should render an input element with the type equals to search', () => {
    render(<Search handleSearch={handleSearch} />)

    expect(screen.getByRole('searchbox')).toHaveProperty('type', 'search')
  })

  it('should call props.handleSearch() when form is submitted', async () => {
    render(<Search handleSearch={handleSearch} />)

    const form = screen.getByRole('form')

    await fireEvent.submit(form)

    expect(handleSearch).toHaveBeenCalledTimes(1)
  })

  it('should call props.handleSearch() with the user input', async () => {
    render(<Search handleSearch={handleSearch} />)

    const form = screen.getByRole('form')
    const input = screen.getByRole('searchbox')

    const inputText = 'some text here'

    await userEvent.type(input, inputText)
    await fireEvent.submit(form)

    expect(handleSearch).toHaveBeenCalledWith(inputText)
  })
})
