export function handleIncrement(value, setter) {
    setter(() => {
        return value + 1
    })
}

export function handleDecrement(value, setter ) {
    if (value > 0) {
      setter(() => {
        return value - 1
      })
    }
  }