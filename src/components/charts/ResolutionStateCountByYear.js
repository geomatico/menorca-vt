import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

//MUI
import {VegaLite} from 'react-vega';
import {getStatusCountByYear} from '../../calculations/getStatusCountByYear';

const ResolutionStateCountByYear = ({data, categories}) => {

  const labelCategories = categories?.map(cat => cat.id);
  const colorCategories = categories?.map(cat => cat.color);

  let formattedData =  useMemo(()=> getStatusCountByYear(data), [data]);

  /*STACKED_AREA*/
  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    data: {
      values: formattedData,
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
        legend: null,
        scale: {
          domain: labelCategories,
          range: colorCategories
        },
      },
      tooltip: [
        {
          field: 'status',
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