import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {VegaLite} from 'react-vega';

const ResolutionState = ({data}) => {

  const formattedData = useMemo(() => {
    return data.map(
      dat => ({
        ...dat,
        color: dat.label === 'Sense resolució' ? '#f60000' : '#a1a0a0'
      }));
  }, [data]);

  /*const specBar = {
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
  };*/

  const specArc = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'A simple bar chart with embedded data.',
    padding: 10,
    params: [
      {
        name: 'radius2',
        value: 150
      }
    ],
    data: {
      values: formattedData
    },
    actions: false,
    config: {
      view: {
        stroke: null
      }
    },
    mark: {
      type: 'arc',
      outerRadius: 85,
      tooltip: true
    },
    encoding: {
      theta: {
        field: 'value',
        type: 'quantitative',
        stack: 'normalize'
      },
      color: {
        field: 'label',
        type: 'nominal',
        legend: {
          title: '',
          direction: 'vertical',
          orient: 'right'
        }
      },
      tooltip: [
        {
          field: 'label',
          title: 'Tipus',
          type: 'nominal'
        },
        {
          field: 'value',
          title: 'Nombre',
          type: 'quantitative',
        }
      ]
    }
  };

  return <VegaLite spec={specArc} actions={false}/>;
};

ResolutionState.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    value: PropTypes.number
  }))
};

ResolutionState.defaultProps = {};

export default ResolutionState;