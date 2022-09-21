import React from 'react';
import PropTypes from 'prop-types';
import {VegaLite} from 'react-vega';

const ResolutionStateChart = ({data}) => {
  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'A simple bar chart with embedded data.',
    padding: 10,
    data: {
      values: data
    },
    actions: false,
    config: {
      view: {
        stroke: null
      }
    },
    mark: {type: 'bar', tooltip: true},
    encoding: {
      x: {
        field: 'value',
        type: 'quantitative',
        title: null,
        axis: {
          formatType: 'number',
          domain: false,
          grid: true,
          ticks: false,
        }
      },
      y: {
        field: 'name',
        type: 'nominal',
        title: null,
        axis: {
          labelPadding: 10,
          labelAngle: 0,
          domain: true,
          grid: false,
          ticks: false,
        }},
      color: {
        value: '#a1a0a0'
      }
    }
  };

  return <VegaLite spec={spec} actions={false}/>;
};

ResolutionStateChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    value: PropTypes.number
  }))
};

ResolutionStateChart.defaultProps = {};

export default ResolutionStateChart;