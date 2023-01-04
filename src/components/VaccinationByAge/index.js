// Write your code here
import './index.css'
import {ResponsiveContainer, PieChart, Pie, Cell, Legend} from 'recharts'

const VaccinationByAge = props => {
  const {vaccinationByAge} = props

  return (
    <div className="charts_bg_color p-3 mt-3 w-100">
      <h1 className="text-secondary pb-2">Vaccination by Age</h1>
      <ResponsiveContainer height={350} width="100%">
        <PieChart>
          <Pie
            cx="50%"
            cy="50%"
            outerRadius="70%"
            startAngle={0}
            endAngle={360}
            data={vaccinationByAge}
            dataKey="count"
          >
            <Cell name="18-44" fill=" #5a8dee" />
            <Cell name="44-60" fill="#2cc6c6" />
            <Cell name="above 60" fill=" #a3df9f" />
          </Pie>
          <Legend iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByAge
