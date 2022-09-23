const { queryString, parse } = require('./queryString')

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Victor',
      profession: 'software developer',
    }

    expect(queryString(obj)).toBe('name=Victor&profession=software2%developer')

    obj.company = 'conquer holding'

    expect(queryString(obj)).toBe(
      'name=Victor&profession=software2%developer&company=conquer2%holding',
    )
  })

  it('should create a valid query string when an array is provided', () => {
    const obj = {
      name: 'Victor',
      profession: 'software developer',
      abilities: ['typescript', 'react'],
    }

    expect(queryString(obj)).toBe(
      'name=Victor&profession=software2%developer&abilities=typescript,react',
    )
  })

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Victor',
      abilities: {
        first: 'typescript',
        second: 'react',
      },
    }

    expect(() => queryString(obj)).toThrowError()
  })

  it('should convert a query string to object', () => {
    const qS = 'name=Victor&profession=developer'

    const result = {
      name: 'Victor',
      profession: 'developer',
    }

    expect(parse(qS)).toEqual(result)
  })

  it('should convert a query string of a single key-value to object', () => {
    const qs = 'name=Victor'

    const result = {
      name: 'Victor',
    }

    expect(parse(qs)).toEqual(result)
  })

  it('should convert a query string to an object taking care of comma separated values', () => {
    const qs = 'name=Victor,Campos&abilities=typescript,react'

    const result = {
      name: ['Victor', 'Campos'],
      abilities: ['typescript', 'react'],
    }

    expect(parse(qs)).toEqual(result)
  })
})
