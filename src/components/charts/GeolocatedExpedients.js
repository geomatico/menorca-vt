import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

//MUI
import {VegaLite} from 'react-vega';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const GeolocatedExpedients = ({data, categories}) => {
  const labelCategories = categories?.map(cat => cat.id);
  const colorCategories = categories?.map(cat => cat.color);

  const formatedData = useMemo(() => (
    data.map(
      dat => ({
        ...dat,
        color: dat.label === 'No' ? undefined : categories?.find(cat => cat.id === dat.type).color,
        stroke: dat.label === 'No' ? categories?.find(cat => cat.id === dat.type).color : undefined
      }))
  ), [data]);
  
  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    padding: 10,
    width: 'container',
    data: {
      values: formatedData
    },
    encoding: {
      x: {
        field: 'type',
        title: null,
        axis: {
          labelPadding: 10,
          labelAngle: 0,
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
            field: 'type',
            type: 'nominal',
            legend: null,
            scale: {
              domain: labelCategories,
              range: colorCategories
            },
          },
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
              value: 0.25
            }
          },
        }
      },
      /*{
        mark: {
          type: 'text',
          align: 'center',
          baseline: 'middle',
          dx: 0,
          dy: 10
        },
        encoding: {
          text: {field: 'label', type: 'nominal'},
          color: {
            value: '#2f2f2f',
            legend: {
              field: 'value',
              type: 'nominal'
            }
          }
        }
      },*/
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

  return <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
    <VegaLite spec={spec} actions={false}/>
    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', mt: 1, ml: 2, gap: 2}}>
      <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1}}>
        <Box sx={{width: '16px', height: '16px', border: '1.5px dashed black', bgcolor: 'lightgrey'}}></Box>
        <Typography variant='caption'>No localizados</Typography>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1}}>
        <Box sx={{width: '16px', height: '16px', bgcolor: 'grey'}}></Box>
        <Typography variant='caption'>Localizados</Typography>
      </Box>
    </Box>
  </Box>;

};

GeolocatedExpedients.propTypes = {
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

GeolocatedExpedients.defaultProps = {};

export default GeolocatedExpedients;