import React from 'react';
import PropTypes from 'prop-types';

//MUI
import {VegaLite} from 'react-vega';

const AverageProcessingTimeByType = ({data, categories}) => {

  const labelCategories = categories?.map(cat => cat.id);
  const colorCategories = categories?.map(cat => cat.color);
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
        field: 'type',
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
        field: 'type',
        type: 'nominal',
        legend: null,
        scale: {
          domain: labelCategories,
          range: colorCategories
        },
      },
      tooltip: [
        {
          field: 'type',
          title: 'Tipus',
          type: 'nominal'
        },
        {
          field: 'value',
          title: 'Número',
          type: 'quantitative'
        },
      ]
    }
  };

  return <VegaLite spec={spec} actions={false}/>;
};

AverageProcessingTimeByType.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    value: PropTypes.number
  })),
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    color: PropTypes.string,
    label: PropTypes.string,
  })),
};

AverageProcessingTimeByType.defaultProps = {};

export default AverageProcessingTimeByType;