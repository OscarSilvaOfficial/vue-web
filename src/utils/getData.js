const getGroupId = (name, groups) => {
  let counter = 0
  for (let n of groups) {
    counter++
    console.log(n.name)
    if (name == n.name) {
      break
    }
  }
  return counter
}

export {getGroupId} 