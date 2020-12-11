import React from 'react';
import PropTypes from 'prop-types';

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const StackedAreaChart = ({ data, categories }) => (
  <AreaChart
    width={500}
    height={200}
    data={data}
    margin={{
      top: 10, right: 30, left: 0, bottom: 0,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="year" />
    <YAxis />
    <Tooltip />
    {categories.map(({id, color}) => (<Area key={id} type="monotone" dataKey={id} stackId="1" stroke={color} fill={color} />))}
  </AreaChart>
);

StackedAreaChart.propTypes = {
  data: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
};

export default StackedAreaChart;
