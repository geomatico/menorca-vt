import React from 'react';
import PropTypes from 'prop-types';

//MUI
import {VegaLite} from 'react-vega';

const ResolutionStateCountByYear = ({data, categories}) => {

  const labelCategories = categories?.map(cat => cat.id);
  const colorCategories = categories?.map(cat => cat.color);

  /*STACKED_AREA*/
  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    data: {
      values: data,
    },
    width: 'container',
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
        field: 'status',
        type: 'nominal',
        legend: {
          title: '',
          direction: 'horizontal',
          orient: 'bottom'
        },
        scale: {
          domain: labelCategories,
          range: colorCategories
        },
      },
      tooltip: [
        {
          field: 'status',
          title: 'Tipus',
          type: 'nominal'
        },
        {
          field: 'year',
          title: 'Any',
          type: 'nominal',
        },
        {
          field: 'value',
          title: 'Nombre',
          type: 'quantitative'
        },
      ]
    }
  };

  return <VegaLite spec={spec} actions={false}/>;
};

ResolutionStateCountByYear.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    year: PropTypes.number,
    value: PropTypes.number
  })),
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    color: PropTypes.string,
    label: PropTypes.string,
  }))
};

export default ResolutionStateCountByYear;