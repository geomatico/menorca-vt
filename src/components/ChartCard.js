import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  CardContent,
} from '@material-ui/core';

import StackedAreaChart from './StackedAreaChart';

function ChartCard({data, categories}) {

  return (
    <Card elevation={5}>
      <CardContent>
        <StackedAreaChart categories={categories} data={data} />
      </CardContent>
    </Card>
  );
}

ChartCard.propTypes = {
  categories: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default ChartCard;
