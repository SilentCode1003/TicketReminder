class Data {
    constructor(data, prefix) {
      for (const key in data) {
        this[key.replace(prefix, '')] = data[key]
      }
    }
  }
  
  export const Normalize = (data, prefix) => {
    if (!data) {
      throw new Error('Invalid Arguments')
    }
  
    let result = []
    for (const item of data) {
      result.push(new Data(item, prefix))
    }
    return result
  }