import React from 'react';
import PropTypes from 'prop-types';
//OTHERS
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
//UTILS
import config from '../config.json';

const {resolucioColors, fallbackColor} = config;
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ResolutionStateChart = ({data}) => {
  return (
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        cx='50%'
        cy='50%'
        labelLine={false}
        label={renderCustomizedLabel}
        innerRadius='30%'
        outerRadius='100%'
        fill="#8884d8"
        dataKey="value"
      >
        {
          data.map((entry, index) => <Cell key={`cell-${index}`} fill={resolucioColors[entry.name] ? resolucioColors[entry.name] : fallbackColor} />)
        }
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

ResolutionStateChart.propTypes = {
  data: PropTypes.array.isRequired
};

export default ResolutionStateChart;
