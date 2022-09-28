import React from 'react';
import PropTypes from 'prop-types';

//MUI
import {VegaLite} from 'react-vega';

const TypeCountByYearChart = ({data, categories}) => {
  const labelCategories = categories?.map(cat => cat.id);
  const colorCategories = categories?.map(cat => cat.color);

  /*STACKED_AREA*/
  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    data: {
      values: data,
    },
    width: 340,
    /*transform: [
      {
        filter: 'datum.year > 2010'
      }
    ],*/
    mark: 'area',
    encoding: {
      x: {
        type: 'nominal',
        field: 'year',
        title: null
      },
      y: {
        type: 'quantitative',
        field: 'value',
        title: null
      },
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
          title: 'Tipo',
          type: 'nominal'
        },
        {
          field: 'year',
          title: 'Año',
          type: 'nominal',
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

TypeCountByYearChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    year: PropTypes.number,
    value: PropTypes.string
  })),
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    color: PropTypes.string,
    label: PropTypes.string,
  }))
};

export default TypeCountByYearChart;