import React from 'react';
import StackedAreaChart from './StackedAreaChart';

export default {
  title: 'Common/StackedAreaChart',
  component: StackedAreaChart,
};

const Template = (args) => <StackedAreaChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  categories: [
    {id: 'CED', values: ['CED'], color: '#C9C900', label: 'CED. Cèdules urbanístiques' },
    {id: 'DUP', values: ['DUP'], color: '#FFFF73', label: 'DUP. Expedients de duplicat de cèdules' },
    {id: 'AUT', values: ['AUT'], color: '#00C5FF', label: 'AUT. Litoral' },
    {id: 'DTQ', values: ['DTQ'], color: '#0084A8', label: 'DTQ. Declaracio responsable litoral' },
    {id: 'NUI', values: ['NUI'], color: '#E69800', label: 'NUI. Declaració interés general' },
    {id: 'ERE', values: ['ERE'], color: '#FFEBAF', label: 'ERE. Edificacions en sòl rúsic' },
    {id: 'INF', values: ['INF'], color: '#C29ED7', label: 'INF. Informes urbanístics i d\'ordenació. Inclou AIA' },
    {id: 'ORD', values: ['ORD'], color: '#E69800', label: 'ORD. Expedients diversos ordenació' },
    {id: 'PO', values: ['PO'], color: '#E60000', label: 'PO. Procediments judicials' },
    {id: 'altres', values: ['INU', 'LIA', 'LIC', 'NUH', 'PRCED', 'SAN'], color: '#E9FFBE', label: 'Altres. Inclou (INU; LIA; LIC; NUH; PRCED; SAN)' },
  ],
  data: [
    {
      'year': '1976',
      'CED': 3
    },
    {
      'year': '1977',
      'CED': 2
    },
    {
      'year': '1978',
      'CED': 12
    },
    {
      'year': '1980',
      'CED': 40
    },
    {
      'year': '1981',
      'CED': 2
    },
    {
      'year': '1982',
      'CED': 8
    },
    {
      'year': '1983',
      'CED': 10
    },
    {
      'year': '1984',
      'CED': 53
    },
    {
      'year': '1985',
      'CED': 21
    },
    {
      'year': '1986',
      'CED': 39
    },
    {
      'year': '1987',
      'CED': 18
    },
    {
      'year': '1988',
      'CED': 187
    },
    {
      'year': '1989',
      'CED': 368
    },
    {
      'year': '1990',
      'CED': 70
    },
    {
      'year': '1991',
      'CED': 1329
    },
    {
      'year': '1992',
      'CED': 341
    },
    {
      'year': '1993',
      'CED': 234
    },
    {
      'year': '1994',
      'CED': 713
    },
    {
      'year': '1995',
      'CED': 488
    },
    {
      'year': '1996',
      'CED': 30
    },
    {
      'year': '1997',
      'NUI': 1,
      'CED': 21
    },
    {
      'year': '1998',
      'CED': 56
    },
    {
      'year': '1999',
      'CED': 55
    },
    {
      'year': '2000',
      'CED': 54
    },
    {
      'year': '2001',
      'NUI': 1,
      'AUT': 49,
      'CED': 45
    },
    {
      'year': '2002',
      'NUI': 1,
      'AUT': 58,
      'CED': 67
    },
    {
      'year': '2003',
      'ERE': 9,
      'NUI': 1,
      'AUT': 53,
      'CED': 78
    },
    {
      'year': '2004',
      'ERE': 44,
      'AUT': 62,
      'CED': 64
    },
    {
      'year': '2005',
      'ERE': 73,
      'AUT': 72,
      'CED': 2155
    },
    {
      'year': '2006',
      'ERE': 67,
      'NUI': 1,
      'AUT': 69,
      'CED': 2458
    },
    {
      '13098': 1,
      'year': '2007',
      'ERE': 68,
      'SAN': 2,
      'LIA': 2,
      'AUT': 56,
      'CED': 2281
    },
    {
      'year': '2008',
      'INU': 4,
      'ERE': 75,
      'EPO': 1,
      'AIA': 10,
      'NUI': 37,
      'PGM': 1,
      'ORD': 1,
      'DEM': 1,
      'DIS': 1,
      'ISA': 1,
      'LIA': 12,
      'NUA': 2,
      'LIC': 3,
      'INF': 1,
      'EXT': 1,
      'AUT': 31,
      'CED': 2215
    },
    {
      'year': '2009',
      'AIA': 16,
      'ERE': 72,
      'ISA': 1,
      'NUI': 19,
      'DIS': 1,
      'INF': 8,
      'PEM': 1,
      'INU': 4,
      'SAN': 2,
      'LIA': 2,
      'LIC': 1,
      'AUT': 66,
      'CED': 1367
    },
    {
      '10785': 1,
      '10786': 1,
      '10787': 1,
      '10788': 1,
      'year': '2010',
      'ERE': 71,
      'NUI': 22,
      'DIS': 3,
      'PGM': 2,
      'AIA': 17,
      'PO': 1,
      'NUA': 1,
      'INU': 5,
      'LIA': 5,
      'ORD': 2,
      'INF': 1,
      'SAN': 2,
      'NUH': 1,
      'AUT': 66,
      'CED': 872
    },
    {
      'year': '2011',
      'ERE': 50,
      'INF': 7,
      'NUI': 14,
      'PRCED': 2,
      'AIA': 11,
      'LIA': 10,
      'NUA': 1,
      'ISA': 1,
      'INU': 2,
      'SAN': 3,
      'PO': 2,
      'AUT': 65,
      'CED': 862
    },
    {
      'year': '2012',
      'NUI': 34,
      'SAN': 6,
      'PO': 1,
      'CEDW': 13,
      'AIA': 16,
      'ERE': 44,
      'ORD': 6,
      'INF': 3,
      'LIC': 2,
      'AUT': 69,
      'CED': 653
    },
    {
      'year': '2013',
      'ERE': 64,
      'NUI': 34,
      'ORD': 15,
      'AIA': 31,
      'PO': 4,
      'PRCED': 2,
      'INF': 1,
      'SAN': 2,
      'AUT': 50,
      'DTQ': 47,
      'CED': 768
    },
    {
      'year': '2014',
      'ORD': 35,
      'ERE': 39,
      'AIA': 7,
      'NUI': 10,
      'INF': 4,
      'SAN': 4,
      'LIC': 1,
      'DTQ': 92,
      'AUT': 25,
      'CED': 355
    },
    {
      'year': '2015',
      'NUI': 6,
      'INF': 12,
      'ORD': 13,
      'SAN': 4,
      'AIA': 10,
      'NUH': 2,
      'LIC': 1,
      'PO': 1,
      'DTQ': 89,
      'AUT': 29,
      'CED': 436
    },
    {
      'year': '2016',
      'ORD': 61,
      'INF': 16,
      'NUI': 13,
      'NUH': 7,
      'AIA': 4,
      'SAN': 2,
      'PO': 2,
      'ERE': 1,
      'DTQ': 89,
      'AUT': 38,
      'CED': 866
    },
    {
      'year': '2017',
      'ORD': 119,
      'NUI': 17,
      'INF': 17,
      'PRCED': 18,
      'NUH': 8,
      'PPM': 1,
      'PTI': 1,
      'ERE': 2,
      'LIC': 2,
      'DIS': 3,
      'SAN': 6,
      'PO': 1,
      'ISA': 1,
      'CON': 1,
      'DTQ': 93,
      'AUT': 28,
      'CED': 1103
    },
    {
      'year': '2018',
      'ORD': 58,
      'ERE': 68,
      'SAN': 1,
      'NUI': 38,
      'EDO': 1,
      'INF': 5,
      'LIC': 3,
      'AIA': 2,
      'NUH': 1,
      'PES': 1,
      'CON': 2,
      'DTQ': 71,
      'AUT': 33,
      'CED': 1630
    },
    {
      'year': '2019',
      'ORD': 40,
      'ERE': 89,
      'AUTPR': 12,
      'INF': 6,
      'NUI': 29,
      'AIA': 3,
      'SAN': 1,
      'DTQ': 89,
      'AUT': 36,
      'CED': 2144
    },
    {
      'year': '2020',
      'ORD': 35,
      'ERE': 69,
      'NUI': 22,
      'AIA': 10,
      'EDO': 1,
      'INF': 1,
      'DTQ': 92,
      'AUT': 15,
      'CED': 1379
    }
  ]
};
