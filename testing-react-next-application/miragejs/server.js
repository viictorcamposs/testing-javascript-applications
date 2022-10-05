import { Server } from 'miragejs'

export const makeServer = ({ environment = 'development' } = {}) => {
  return new Server({
    environment,
    routes() {
      this.namespace = 'api'

      this.get('products', () => ({
        products: [], // ! criar mock de lista de produtos
      }))
    },
  })
}
