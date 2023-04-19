
export default function usePagination (array, numberPage, quantity) {
  const first = (numberPage * quantity) - quantity
  const second = (numberPage * quantity)
  const results = array.slice(numberPage === 1 ? 0 : first, second)

  return results
}
