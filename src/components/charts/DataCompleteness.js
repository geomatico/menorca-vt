import React from 'react';
import PropTypes from 'prop-types';

//MUI
import {VegaLite} from 'react-vega';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const DataCompleteness = ({data}) => {

  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    padding: 10,
    width: 'container',
    data: {
      values: data
    },
    encoding: {
      x: {
        field: 'type',
        title: null,
        axis: {
          labelPadding: 10,
          labelAngle: -90,
          domain: true,
          grid: false,
          ticks: false,
        }
      },
      y: {
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
      xOffset: {
        field: 'label'
      },
    },
    actions: false,
    config: {
      view: {
        stroke: null
      }
    },
    layer: [
      {
        mark: 'bar',
        encoding: {
          color: {
            condition: {
              test: 'datum[\'label\'] === \'No\'',
              value: '#f60000'
            },
            value: '#a1a0a0'
            /*field: 'color',
            type: 'nominal',
            legend: null,*/
          },
          /*color: {
            field: 'type',
            type: 'nominal',
            legend: null,
          },*/
          stroke: {
            condition: {
              test: 'datum[\'label\'] === \'No\'',
              value: '#2f2f2f'
            }
          },
          strokeWidth: {
            value: 1
          },
          strokeDash: {value: [2, 2]},
          strokeDashOffset: {value: 10},
          fillOpacity: {
            condition: {
              test: 'datum[\'label\'] === \'No\'',
              value: 1
            }
          },
        }
      },
      {
        mark: {
          type: 'text',
          align: 'center',
          baseline: 'middle',
          tooltip: true,
          dx: 0,
          dy: -10
        },
        encoding: {
          text: {field: 'value', type: 'quantitative'},
          color: {
            value: '#2f2f2f',
          }
        }
      }
    ],
    tooltip: [
      {
        field: 'type',
        title: 'Tipus',
        type: 'nominal'
      },
      {
        field: 'label',
        title: 'Geolocalizado',
        type: 'nominal',
      },
      {
        field: 'value',
        title: 'Número',
        type: 'quantitative'
      },
    ]
  };

  return <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '95%'}}>
    <VegaLite spec={spec} actions={false}/>
    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', ml: 2, gap: 2}}>
      <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1}}>
        <Box sx={{width: '16px', height: '16px', border: '1.5px dashed black', bgcolor: '#f60000'}}></Box>
        <Typography variant='caption'>Sense informar</Typography>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1}}>
        <Box sx={{width: '16px', height: '16px', bgcolor: '#a1a0a0'}}></Box>
        <Typography variant='caption'>Informats</Typography>
      </Box>
    </Box>
  </Box>;
};

DataCompleteness.propTypes = {
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

DataCompleteness.defaultProps = {};

export default DataCompleteness;