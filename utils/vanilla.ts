export const isObectEmpty = (value: Object) => {
  return (
    value
    && Object.keys(value).length === 0
    && Object.getPrototypeOf(value) === Object.prototype
  )
}