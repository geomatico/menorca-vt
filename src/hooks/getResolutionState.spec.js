/*import {expect} from 'chai';
import useStats from './useStats';

const fixture = [
  {
    gid: 10698,
    tipus: 'EX073',
    resolucio: 'Sense resolució',
    any: 2017,
    data_inici: '6/24/17, 12:00 AM',
    data_fi: '5/20/18, 12:00 AM'
  },
  {
    gid: 20657,
    tipus: 'EX068',
    resolucio: 'Sense resolució',
    any: 2018,
    data_inici: '3/20/18, 12:00 AM',
    data_fi: '5/20/18, 12:00 AM'
  },
  {
    gid: 34342,
    tipus: 'CED',
    resolucio: 'Concedit',
    any: 2021,
    data_inici: '1/12/21, 12:00 AM',
    data_fi: '8/20/21, 12:00 AM'
  },
  {
    gid: 24465,
    tipus: 'CED',
    resolucio: 'Concedit',
    any: 2018,
    data_inici: '2/4/18, 12:00 AM',
    data_fi: '4/2/18, 12:00 AM'
  },
  {
    gid: 36671,
    tipus: 'CED',
    resolucio: 'Concedit',
    any: 2021,
    data_inici: '5/13/21, 12:00 AM',
    data_fi: '10/15/21, 12:00 AM'
  },
  {
    gid: 31128,
    tipus: 'CED',
    resolucio: 'Sense resolució',
    any: 2020,
    data_inici: '6/12/20, 12:00 AM',
    data_fi: '10/20/21, 12:00 AM'
  },
  {
    gid: 24233,
    tipus: 'CED',
    resolucio: 'Sense resolució',
    any: 2019,
    data_inici: '6/24/19, 12:00 AM',
    data_fi: '5/20/21, 12:00 AM'
  },
  {
    gid: 42807,
    tipus: 'CED',
    resolucio: 'Sense resolució',
    any: 2022,
    data_inici: '7/24/22, 12:00 AM',
    data_fi: '12/20/22, 12:00 AM'
  },
  {
    gid: 575,
    tipus: 'CED',
    resolucio: 'Concedit',
    any: 2022,
    data_inici: '2/24/22, 12:00 AM',
    data_fi: '5/30/22, 12:00 AM'
  },
  {
    gid: 39713,
    tipus: 'CED',
    resolucio: 'Sense resolució',
    any: 2022,
    data_inici: '10/24/22, 12:00 AM',
    data_fi: '12/20/22, 12:00 AM'
  },
  {
    gid: 21086,
    tipus: 'CED',
    resolucio: 'Sense resolució',
    any: 2018,
    data_inici: '4/15/18, 12:00 AM',
    data_fi: '5/20/18, 12:00 AM'
  },
  {
    gid: 16203,
    tipus: 'CED',
    resolucio: 'Concedit',
    any: 2017,
    data_inici: '5/24/17, 12:00 AM',
    data_fi: '6/20/18, 12:00 AM'
  },
  {
    gid: 41674,
    tipus: 'CED',
    resolucio: 'Sense resolució',
    any: 2022,
    data_inici: '9/21/22, 12:00 AM',
    data_fi: '12/17/22, 12:00 AM'
  },
  {
    gid: 11712,
    tipus: 'CED',
    resolucio: 'Concedit',
    any: 2018,
    data_inici: '10/24/18, 12:00 AM',
    data_fi: '6/10/19, 12:00 AM'
  },
  {
    gid: 36640,
    tipus: 'CED',
    resolucio: 'Concedit',
    any: 2021,
    data_inici: '6/4/21, 12:00 AM',
    data_fi: '5/2/21, 12:00 AM'
  },
  {
    gid: 35980,
    tipus: 'CED',
    resolucio: 'Denegat',
    any: 2021,
    data_inici: '6/24/21, 12:00 AM',
    data_fi: '5/20/21, 12:00 AM'
  },
  {
    gid: 23976,
    tipus: 'CED',
    resolucio: 'Sense resolució',
    any: 2021,
    data_inici: '3/17/21, 12:00 AM',
    data_fi: '8/14/21, 12:00 AM'
  },
  {
    gid: 28927,
    tipus: 'CED',
    resolucio: 'Concedit',
    any: 2019,
    data_inici: '5/20/19, 12:00 AM',
    data_fi: '6/24/19, 12:00 AM'
  },
  {
    gid: 26906,
    tipus: 'CED',
    resolucio: 'Sense resolució',
    any: 2018,
    data_inici: '2018-02-10Z',
    data_fi: '2/12/18, 12:00 AM'
  },
  {
    gid: 40089,
    tipus: 'CED',
    resolucio: null,
    any: 2019,
    data_inici: '6/24/19, 12:00 AM',
    data_fi: '9/20/19, 12:00 AM'
  },
  {
    gid: 41766,
    tipus: 'CED',
    resolucio: 'Denegat',
    any: 2022,
    data_inici: '6/24/22, 12:00 AM'
  },
  {
    gid: 19415,
    tipus: 'CED',
    resolucio: 'Concedit',
    any: 2018,
    data_inici: '1/14/18, 12:00 AM',
    data_fi: '5/25/18, 12:00 AM'
  },
  {
    gid: 40493,
    tipus: 'CED',
    resolucio: 'Desistit',
    any: 2022,
    data_inici: '4/20/22, 12:00 AM',
    data_fi: '5/20/22, 12:00 AM'
  },
  {
    gid: 3677,
    tipus: 'CED',
    resolucio: 'Concedit',
    any: 2019
  }
];*/

/*describe('Data indicators', () => {
  it('should calculate resolution state', () => {
    // GIVEN
    const givenState = fixture;

    // WHEN
    const computedState = useStats(givenState);

    // THEN
    const expectedState = [
      {
        label: 'Sense resolució',
        value: 10
      },
      {
        label: 'Concedit',
        value: 10
      },
      {
        label: 'Desistit',
        value: 1
      },
      {
        label: 'Denegat',
        value: 2
      }
    ];

    expect(computedState).to.deep.equal(expectedState);
  });
});*/
