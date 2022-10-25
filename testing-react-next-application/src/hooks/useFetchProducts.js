import { useEffect, useState } from 'react'
import axios from 'axios'

export const useFetchProducts = () => {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    let mounted = true

    axios
      .get('/api/products')
      .then(response => {
        if (mounted) {
          setProducts(response.data.products)
        }
      })
      .catch(() => {
        if (mounted) {
          setError(true)
        }
      })

    return () => (mounted = false)
  }, [])

  return { products, error }
}
