import { PureComponent } from 'react'
import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, CartesianGrid } from 'recharts'
import rankData from './data'

const className = 'RankChart'
export default class RankChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="95%" >
        <BarChart data={rankData} >
            <CartesianGrid vertical={false}  />
            <XAxis className={`${className}_xaxis`} dataKey="name" stroke='#FFFFFF' />
            <YAxis className={`${className}_yaxis`} stroke='#FFFFFF' />
            <Bar dataKey="value">
                {rankData.map((_, idx) => (
                    <Cell key={idx} fill={rankData[idx].color} />
                ))}
            </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
