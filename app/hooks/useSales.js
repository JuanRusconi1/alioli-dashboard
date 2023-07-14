export async function useSales () {
  const fetchsales = await fetch('http://localhost:3500/api/sales')
  const sales = await fetchsales
  return sales
}
