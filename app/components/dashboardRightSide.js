'use client'
import styles from '../../styles/principal.module.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useState } from 'react'
import { Doughnut } from 'react-chartjs-2'

const totalValue = (sales) => {
  const totalValue = sales.reduce((acum, sale) => acum += sale.total, 0)
  return totalValue.toLocaleString('US')
}

export default function DashboardRightSide ({ sales, categories, changeFilter, filter, filteredSales, error }) {
  const [search, changeSearch] = useState(false)
  return (
    <div className={styles.divRightDashboard}>
      <div className={styles.divSelectDate}>
        <div className={styles.titleSelectDate}>
          <div>Buscar por <button className={styles.buttonDate} style={search ? { backgroundColor: '#fac710' } : null} onClick={(e) => { changeSearch(true) }}>mes</button> / <button className={styles.buttonDate} style={!search ? { backgroundColor: '#fac710' } : null} onClick={(e) => { changeSearch(false) }}>día</button></div>
          {filter
            ? <p>{filter}</p>
            : null}
        </div>
        <SelectMonth changeFilter={changeFilter} search={search} />
      </div>
      <div className={styles.divTotalSales}>
        <p className={styles.titleTotalSales}>Ingresos totales por ventas</p>
        {error
          ? <p className={styles.error}>{error}</p>
          : <p className={styles.priceTotalSales}>${totalValue(filteredSales.length > 0 ? filteredSales : sales)}</p>}
      </div>
      <div className={styles.divCakeChart}>
        <div className={styles.titleCakeChart}>Ventas por categoria </div>
        <div className={styles.cakeChart}>
          {error
            ? <p className={styles.error}>{error}</p>
            : <CakeChart sales={filteredSales.length > 0 ? filteredSales : sales} categories={categories} />}
        </div>
      </div>
    </div>
  )
}

function SelectMonth ({ changeFilter, search }) {
  const [date, setDate] = useState('')
  const optionsMonths = () => {
    const date = new Date()
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
    const array = []
    const startYear = 2023
    const endMonth = date.getMonth()
    const endYear = date.getFullYear()
    for (let i = startYear; i <= endYear; i++) {
      if (i < endYear) {
        for (let m = 1; m <= 12; m++) {
          array.push({ date: `${months[m - 1]} ${i}`, value: `${i}-${`0${m}`.slice(-2)}` })
        }
      } else if (i === endYear) {
        for (let m = 1; m <= endMonth + 1; m++) {
          array.push({ date: `${months[m - 1]} ${i}`, value: `${i}-${`0${m}`.slice(-2)}` })
        }
      }
    }
    array.push({ date: 'Seleccionar', value: '' })
    return array.reverse()
  }
  return (
    <div className={styles.divContainerSearchMonth}>
      <div className={styles.divSelectMonth}>
        {search
          ? <select className={styles.selectMonth} onChange={(e) => setDate(e.target.value)}>
            {optionsMonths().map((month, i) => (
              <option
                key={i}
                value={month.value}
              >
                {month.date}
              </option>
            ))}
          </select>
          : <input
              type='date'
              className={styles.inputDate}
              placeholder='Lomo Completo...'
              autocomplete='off'
              onChange={(e) => setDate(e.target.value)}
            />}
      </div>
      <div className={styles.divButtonsDate}>
      <button className={styles.dateButton} onClick={() => changeFilter(date)}>
        <svg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-search' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'>
          <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
          <path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0'></path>
          <path d='M21 21l-6 -6'>.</path>
        </svg>
      </button>
      <button className={styles.dateButton} style={{borderRadius: '0 .5rem .5rem 0'}} onClick={() => changeFilter('')}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          class='icon icon-tabler icon-tabler-x'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          stroke-width='2'
          stroke='currentColor'
          fill='none'
          stroke-linecap='round'
          stroke-linejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
          <path d='M18 6l-12 12'></path>
          <path d='M6 6l12 12'></path>
        </svg>
      </button>
      </div>
    </div>
  )
}

function CakeChart (props) {
  const { sales, categories } = props
  ChartJS.register(ArcElement, Tooltip, Legend)

  const labelsCategories = (categories) => {
    const labels = []
    for (let i = 0; i < categories.length; i++) {
      labels.push(categories[i].name)
    }
    return labels
  }

  const countCategories = (sales) => {
    const finalValue = []

    for (let i = 0; i < 10; i++) {
      finalValue.push(0)
    }

    sales.forEach(sale => {
      sale.orderitem.forEach(item => {
        if (item.productCategory === 'Lomos') {
          finalValue[0] += item.quantity
        } else if (item.productCategory === 'Hamburguesas') {
          finalValue[1] += item.quantity
        } else if (item.productCategory === 'Burritos') {
          finalValue[2] += item.quantity
        } else if (item.productCategory === 'Quesadillas') {
          finalValue[3] += item.quantity
        } else if (item.productCategory === 'Pizzas') {
          finalValue[4] += item.quantity
        } else if (item.productCategory === 'Empanadas') {
          finalValue[5] += item.quantity
        } else if (item.productCategory === 'Entradas') {
          finalValue[6] += item.quantity
        } else if (item.productCategory === 'Media') {
          finalValue[7] += item.quantity
        } else if (item.productCategory === 'Promo') {
          finalValue[8] += item.quantity
        } else if (item.productCategory === 'Menu') {
          finalValue[9] += item.quantity
        }
      })
    })

    return finalValue
  }
  const options = {
    responsive: true,
    maintainAsoectRatui: false
  }
  const data = {
    labels: labelsCategories(categories),
    datasets: [
      {
        label: 'Unidades por categoria',
        data: countCategories(sales),
        backgroundColor: [
          'rgba(255, 0, 0, 0.5)',
          'rgba(255, 255, 0, 0.5)',
          'rgba(255, 140, 0, 0.5)',
          'rgba(139, 69, 19, 0.5)',
          'rgba(255, 105, 180, 0.5)',
          'rgba(128, 0, 128, 0.5)',
          'rgba(49, 175, 212, 0.5)',
          'rgba(0, 0, 255, 0.5)',
          'rgba(128, 128, 128, 0.5)',
          'rgba(0, 206, 209, 0.5)'
        ],
        borderColor: [
          'rgba(255, 0, 0, 1)',
          'rgba(255, 255, 0, 1)',
          'rgba(255, 140, 0, 1)',
          'rgba(139, 69, 19, 1)',
          'rgba(255, 105, 180, 1)',
          'rgba(128, 0, 128, 1)',
          'rgba(49, 175, 212, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(128, 128, 128, 1)',
          'rgba(0, 206, 209, 1)'
        ]
      }
    ],
    borderWidth: 1
  }
  return (
    <Doughnut data={data} options={options} />
  )
}
