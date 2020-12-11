import React from 'react';
import PropTypes from 'prop-types';

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const StackedAreaChart = ({ data, colors }) => (
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
    {Object.entries(colors).map(([tipus, color]) => (<Area key={tipus} type="monotone" dataKey={tipus} stackId="1" stroke={color} fill={color} />))}
  </AreaChart>
);

StackedAreaChart.propTypes = {
  data: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
};

export default StackedAreaChart;
