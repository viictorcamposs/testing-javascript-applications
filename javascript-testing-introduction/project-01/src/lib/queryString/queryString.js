module.exports = {
  objectToQueryString: obj => {
    {
      let result = ''

      Object.entries(obj).forEach(([key, value]) =>
        result.length <= 0
          ? (result = `${key}=${value}`)
          : (result += `&${key}=${value}`),
      )

      result = result.replaceAll(' ', '2%')
    }

    {
      const result = Object.entries(obj)
        .join('&')
        .replaceAll(',', '=')
        .replaceAll(' ', '2%')
    }

    {
      const result = Object.entries(obj)
        .map(([key, value]) => {
          return `${key}=${value}`
        })
        .join('&')
        .replaceAll(' ', '2%')

      return result
    }
  },
}
