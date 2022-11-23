import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {VegaLite} from 'react-vega';
import {getResolutionState} from '../../calculations/getResolutionState';

const ResolutionState = ({data}) => {

  const formattedData =  useMemo(()=> {
    return getResolutionState(data).map(
      dat => ({
        ...dat,
        color: dat.label === 'Sense resolució' ? '#f60000' : '#a1a0a0'
      }));
  }, [data]);

  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'A simple bar chart with embedded data.',
    padding: 10,
    data: {
      values: formattedData
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
        field: 'label',
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
        field: 'color',
        type: 'nominal',
        scale: null
      }
    }
  };

  return <VegaLite spec={spec} actions={false}/>;
};

ResolutionState.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    value: PropTypes.number
  }))
};

ResolutionState.defaultProps = {};

export default ResolutionState;