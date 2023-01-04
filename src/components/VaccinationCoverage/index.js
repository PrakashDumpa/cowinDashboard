// Write your code here
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Legend,
} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {last7DaysVaccination} = props
  console.log('last7DaysVaccination', last7DaysVaccination)

  const dataConvertion = number => {
    if (number) {
      return `${number.toString()}k`
    }
    return number
  }

  return (
    <div className="charts_bg_color p-3 mt-3 w-100">
      <h1 className="text-secondary pb-2">Vaccination Coverage</h1>
      <ResponsiveContainer height={350} width="100%">
        <BarChart data={last7DaysVaccination}>
          <XAxis dataKey="vaccineDate" />
          <YAxis tickFormatter={dataConvertion} />
          <Legend />
          <Bar dataKey="dose1" name="Dose1" fill="#2d87bb" barSize="10%" />
          <Bar dataKey="dose2" name="Dose2" fill="#f54394" barSize="10%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
