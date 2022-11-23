import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

//MUI
import {VegaLite} from 'react-vega';
import {getTypeCountByStartDate} from '../../calculations/getTypeCountByStartDate';
import {getTypeCountByEndDate} from '../../calculations/getTypeCountByEndDate';
import config from '../../config.json';

const TypeCountByDate = ({data, categories, dataLabel}) => {

  // FIXME ver estas categories de donde vienen
  const datasetIds = Object.keys(config.datasets);
  categories = (config.datasets[datasetIds[1]].categories).concat(config.datasets[datasetIds[0]].categories);

  const labelCategories = categories?.map(cat => cat.id);
  const colorCategories = categories?.map(cat => cat.color);

  const formattedData =  useMemo(()=> {
    return dataLabel === 'Any de fi'
      ? getTypeCountByEndDate(data)
      : getTypeCountByStartDate(data);
  }, [data]);

  /*STACKED_AREA*/
  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    data: {
      values: formattedData,
    },
    width: 'container',
    /*transform: [
      {
        filter: 'datum.date > 2010'
      }
    ],*/
    mark: 'area',
    encoding: {
      x: {
        type: 'nominal',
        field: 'date',
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
          title: 'Tipus',
          type: 'nominal'
        },
        {
          field: 'date',
          title: dataLabel,
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

TypeCountByDate.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    date: PropTypes.number,
    value: PropTypes.number,
    dataLabel: PropTypes.string,
  })),
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    color: PropTypes.string,
    label: PropTypes.string,
  })),
  dataLabel: PropTypes.string
};

TypeCountByDate.defaultProps = {
  dataLabel: 'Any'
};

export default TypeCountByDate;