import React from 'react';
import PropTypes from 'prop-types';
//OTHERS
import AreaChart from 'recharts/AreaChart';
import Area from 'recharts/Area';
import XAxis from 'recharts/XAxis';
import YAxis from 'recharts/YAxis';
import CartesianGrid from 'recharts/CartesianGrid';
import Tooltip from 'recharts/Tooltip';
import ResponsiveContainer from 'recharts/ResponsiveContainer';

const TypeCountByYearChart = ({data, categories, width, height}) => (
  <ResponsiveContainer width={width} height={height}>
    <AreaChart
      minwidth={200}
      data={data}
      margin={{
        top: 0, right: 0, left: -20, bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="year"/>
      <YAxis/>
      <Tooltip/>
      {categories.map(({id, color}) => (
        <Area key={id} type="monotone" dataKey={id} stackId="1" stroke={color} fill={color}/>))}
    </AreaChart>
  </ResponsiveContainer>
);

TypeCountByYearChart.propTypes = {
  data: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
};

TypeCountByYearChart.defaultProps = {
  width: '95%',
  height: 200
};

export default TypeCountByYearChart;
