import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  CardContent,
} from '@material-ui/core';

import StackedAreaChart from './StackedAreaChart';

function ChartCard({data, colors}) {

  return (
    <Card elevation={5}>
      <CardContent>
        <StackedAreaChart colors={colors} data={data} />
      </CardContent>
    </Card>
  );
}

ChartCard.propTypes = {
  colors: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default ChartCard;
