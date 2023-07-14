'use client'
import styles from '../../styles/principal.module.css'
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2'

export default function DashboardLefttSide ({ sales, filter, filteredSales, error }) {
  const [year, setYear] = useState(2023)
  const yearsOptions = () => {
    const array = []
    const startYear = 2022
    const endYear = new Date().getFullYear()
    for (let i = startYear; i <= endYear; i++) {
      array.push(i)
    }
    return array
  }
  return (
    <div className={styles.divLeftDashboard}>
      <div className={styles.divBarChart}>
        <div className={styles.titleBarChart}>
          <div className={styles.divTitleBarChart}>Resumen de ingresos
            <div className={styles.divSelect}>
              <select className={styles.select} onChange={(e) => { setYear(e.target.value) }}>
                {yearsOptions().map((year, i) => (
                  <option
                    key={i}
                    value={year}
                  >
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className={styles.barChart}>
          <BarChart year={year} sales={sales} />
        </div>
      </div>
      <div className={styles.divPieChart}>
        <div className={styles.titlePieChart}>
          Ingresos por metodo de pago
        </div>
        <div className={styles.pieChart}>
          {error
            ? <p className={styles.error}>{error}</p>
            : <CakeChartMethodOfPayment sales={filteredSales.length > 0 ? filteredSales : sales} />}
        </div>
      </div>
      <div className={styles.divBestSeller}>
        <div className={styles.titleBestSeller}>
          Top 5 productos mas vendidos
        </div>
        <div className={styles.bestSellerList}>
          {error
            ? <p className={styles.error}>{error}</p>
            : <ListBestSeller sales={filteredSales.length > 0 ? filteredSales : sales} />}
        </div>
      </div>
    </div>
  )
}

function BarChart (props) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
  )
  const { year, sales } = props

  const TotalsArray = (sales, year) => {
    const salesPerYear = sales.filter((sale) => sale.date.includes(year))
    if (salesPerYear.length > 0) {
      const finalValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      const salesMap = salesPerYear.map((sale) => {
        return {
          date: sale.date.slice(5, 7),
          total: sale.total
        }
      })
      salesMap.forEach((sale) => {
        if (sale.date === '01') {
          finalValues[0] += sale.total
        } else if (sale.date === '02') {
          finalValues[1] += sale.total
        } else if (sale.date === '03') {
          finalValues[2] += sale.total
        } else if (sale.date === '04') {
          finalValues[3] += sale.total
        } else if (sale.date === '05') {
          finalValues[4] += sale.total
        } else if (sale.date === '06') {
          finalValues[5] += sale.total
        } else if (sale.date === '07') {
          finalValues[6] += sale.total
        } else if (sale.date === '08') {
          finalValues[7] += sale.total
        } else if (sale.date === '09') {
          finalValues[8] += sale.total
        } else if (sale.date === '10') {
          finalValues[9] += sale.total
        } else if (sale.date === '11') {
          finalValues[10] += sale.total
        } else if (sale.date === '12') {
          finalValues[11] += sale.total
        }
      })
      return finalValues
    } else {
      return 0
    }
  }

  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]
  const data = {
    labels: months,
    datasets: [
      {
        label: 'Total Mensual',
        data: TotalsArray(sales, year),
        backgroundColor: 'rgba(49, 175, 212, 1)'
      }
    ]
  }
  const options = {
    responsive: true,
    maintainAsoectRatui: false,
    plugins: {
      legend: { display: false }
    }
  }
  return (
    <>
      {TotalsArray(sales, year)
        ? <Bar data={data} options={options} />
        : <p className={styles.error}>No hay comandas cargadas en el Año: {year}</p>}
    </>
  )
}

function CakeChartMethodOfPayment ({ sales, error }) {
  ChartJS.register(ArcElement, Tooltip, Legend)
  const methodOfPayment = ['Efectivo', 'Transferencia', 'Tarjeta']
  const totalPerMethod = (sales, date) => {
    const finalValue = [0, 0, 0]
    const lakedSales = sales.filter((sale) => sale.date.includes(date))
    const salesMap = lakedSales.map((sale) => {
      return {
        total: sale.total,
        methodPay: sale.paymentType
      }
    })

    salesMap.forEach((sale) => {
      if (sale.methodPay === methodOfPayment[0]) {
        finalValue[0] += sale.total
      } else if (sale.methodPay === methodOfPayment[1]) {
        finalValue[1] += sale.total
      } else {
        finalValue[2] += sale.total
      }
    })
    return finalValue
  }

  const options = {
    responsive: true,
    maintainAsoectRatui: false
  }
  const data = {
    labels: methodOfPayment,
    datasets: [
      {
        label: 'Ingresos Totales',
        data: totalPerMethod(sales, '2023'),
        backgroundColor: [
          'rgba(40,114,51, 0.7)',
          'rgba(0,102,166, 0.7)',
          'rgba(72,43,47, 0.7)'
        ],
        borderColor: [
          'rgba(40,114,51, 1)',
          'rgba(0,102,166, 1)',
          'rgba(72,43,47, 1)'
        ]
      }
    ]
  }
  return (
    <Pie data={data} options={options} />
  )
}

function ListBestSeller ({ sales }) {
  const countProducts = (sales) => {
    const array = []
    if (sales.length > 0) {
      sales.forEach((sale) => {
        sale.orderitem.forEach((itemSale) => {
          if (array.length > 0) {
            const index = array.findIndex((item) => item.productName.toLowerCase().includes(itemSale.productName.toLowerCase()))
            if (index !== -1) {
              array[index].quantity += itemSale.quantity
            } else {
              array.push({ productName: itemSale.productName, quantity: itemSale.quantity })
            }
          } else {
            array.push({ productName: itemSale.productName, quantity: itemSale.quantity })
          }
        })
      })
      array.sort((a, b) => {
        return b.quantity - a.quantity
      })
    }
    const results = array.slice(0, 5)
    return results
  }
  return (
    <ul className={styles.ulBestSeller}>
      {countProducts(sales).map((product, i) => (
        <li key={i} className={styles.liBestSeller}>
          <p>{product.productName}</p>
          <p>{product.quantity}u</p>
        </li>
      ))}
    </ul>
  )
}
