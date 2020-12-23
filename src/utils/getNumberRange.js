const getNumberRange = (begin, final) => {
  const result = [] 
  for(let i = begin; i <= final; i++) {
    result.push(i.toString())
    if(i==final) {
      return result
    }
  } 
}

export default getNumberRange