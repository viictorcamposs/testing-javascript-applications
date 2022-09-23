module.exports = {
  queryString: obj => {
    {
      let result = ''

      Object.entries(obj).forEach(([key, value]) => {
        if (value instanceof Object && !(value instanceof Array)) {
          throw new Error('Value cannot be an instance of object')
        } else {
          return result.length <= 0
            ? (result = `${key}=${value}`)
            : (result += `&${key}=${value}`)
        }
      })

      result = result.replaceAll(' ', '2%')
    }

    {
      const result = Object.entries(obj)
        .join('&')
        .replaceAll(',', '=')
        .replaceAll(' ', '2%')
    }

    {
      const keyValueToString = ([key, value]) => {
        if ((typeof value === 'object') & !Array.isArray(value)) {
          throw new Error('Value cannot be an instance of object')
        }

        return `${key}=${value}`
      }

      const result = Object.entries(obj)
        .map(keyValueToString)
        .join('&')
        .replaceAll(' ', '2%')

      return result
    }
  },
  parse: queryString =>
    Object.fromEntries(
      queryString.split('&').map(query => {
        let [key, value] = query.split('=')

        if (value.indexOf(',') > -1) {
          value = value.split(',')
        }

        return [key, value]
      }),
    ),
}
