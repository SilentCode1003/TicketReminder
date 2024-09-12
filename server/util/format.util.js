const format = (str, prefix) => str.replace(/_([a-z])/g, (g) => g[1].toUpperCase())

export const formatColumns = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(formatColumns)
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const camelCaseKey = format(key)
      acc[camelCaseKey] = formatColumns(obj[key])
      return acc
    }, {})
  }
  return obj
}