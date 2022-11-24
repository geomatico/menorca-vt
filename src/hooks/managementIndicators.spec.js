import {expect} from 'chai';
import fixture from '../../fixtures/expedientsFixture.json';
import {getTypeCountByStartDate} from '../calculations/getTypeCountByStartDate';
import {getAverageProcessingTimeByType} from '../calculations/getAverageProcessingTimeByType';
import {getStatusCountByYear} from '../calculations/getStatusCountByYear';
import {getTypeCountByEndDate} from '../calculations/getTypeCountByEndDate';

describe('Data indicators', () => {
  it('should calculate the evolution of expedients by start year and type', () => {
    // GIVEN
    const givenState = fixture;

    // WHEN
    const computedState = getTypeCountByStartDate(givenState, 'year');

    // THEN
    const expectedState = [
      {
        type: 'EX073',
        date: 2017,
        value: 1
      },
      {
        type: 'CED',
        date: 2017,
        value: 1
      },
      {
        type: 'EX068',
        date: 2018,
        value: 1
      },
      {
        type: 'CED',
        date: 2018,
        value: 6
      },
      {
        type: 'CED',
        date: 2019,
        value: 3
      },
      {
        type: 'CED',
        date: 2020,
        value: 1
      },
      {
        type: 'CED',
        date: 2021,
        value: 4
      },
      {
        type: 'CED',
        date: 2022,
        value: 6
      }
    ];

    expect(computedState).to.deep.equal(expectedState);
  });
  it('should calculate the evolution of expedients by end year and type', () => {
    // GIVEN
    const givenState = fixture;

    // WHEN
    const computedState = getTypeCountByEndDate(givenState, 'year');

    // THEN
    const expectedState = [
      {
        type: 'EX073',
        date: 2018,
        value: 1
      },
      {
        type: 'EX068',
        date: 2018,
        value: 1
      },
      {
        type: 'CED',
        date: 2018,
        value: 5
      },
      {
        type: 'CED',
        date: 2019,
        value: 4
      },
      {
        type: 'CED',
        date: 2021,
        value: 6
      },
      {
        type: 'CED',
        date: 2022,
        value: 5
      }
    ];

    expect(computedState).to.deep.equal(expectedState);
  });
  it('should calculate the evolution of expedients by start month and type', () => {
    // GIVEN
    const givenState = fixture;

    // WHEN
    const computedState = getTypeCountByStartDate(givenState, 'month');

    // THEN
    const expectedState = [
      {
        type: 'CED',
        date: 1,
        value: 3
      },
      {
        type: 'EX068',
        date: 2,
        value: 1
      },
      {
        type: 'CED',
        date: 2,
        value: 2
      },
      {
        type: 'CED',
        date: 3,
        value: 2
      },
      {
        type: 'CED',
        date: 4,
        value: 4
      },
      {
        type: 'EX073',
        date: 5,
        value: 1
      },
      {
        type: 'CED',
        date: 5,
        value: 4
      },
      {
        type: 'CED',
        date: 6,
        value: 1
      },
      {
        type: 'CED',
        date: 8,
        value: 1
      },
      {
        type: 'CED',
        date: 9,
        value: 2
      }
    ];
    expect(computedState).to.deep.equal(expectedState);
  });

  it('should calculate the evolution of expedients by end month and type', () => {
    // GIVEN
    const givenState = fixture;

    // WHEN
    const computedState = getTypeCountByEndDate(givenState, 'month');

    // THEN
    const expectedState = [
      {
        type: 'CED',
        date: 2,
        value: 1
      },
      {
        type: 'CED',
        date: 4,
        value: 1
      },
      {
        type: 'EX073',
        date: 5,
        value: 1
      },
      {
        type: 'EX068',
        date: 5,
        value: 1
      },
      {
        type: 'CED',
        date: 5,
        value: 5
      },
      {
        type: 'CED',
        date: 6,
        value: 4
      },
      {
        type: 'CED',
        date: 8,
        value: 3
      },
      {
        type: 'CED',
        date: 9,
        value: 1
      },
      {
        type: 'CED',
        date: 10,
        value: 2
      },
      {
        type: 'CED',
        date: 12,
        value: 3
      }
    ];

    expect(computedState).to.deep.equal(expectedState);
  });

  it('should calculate the processing time', () => {
    // GIVEN
    const givenState = fixture;

    // WHEN
    const computedState = getAverageProcessingTimeByType(givenState);

    // THEN
    const expectedState = [
      {
        type: 'EX073',
        value: 330
      },
      {
        type: 'EX068',
        value: 61
      },
      {
        type: 'CED',
        value: 182
      },
    ];

    expect(computedState).to.deep.equal(expectedState);
  });
  it('should calculate the resolution state by type and year', () => {
    // GIVEN
    const givenState = fixture;

    // WHEN
    const computedState = getStatusCountByYear(givenState);

    // THEN

    const expectedState = [
      {
        status: 'Concedit',
        year: 2017,
        value: 1
      },
      {
        status: 'Concedit',
        year: 2018,
        value: 3
      },
      {
        status: 'Concedit',
        year: 2019,
        value: 2
      },
      {
        status: 'Concedit',
        year: 2021,
        value: 3
      },
      {
        status: 'Concedit',
        year: 2022,
        value: 1
      },
      {
        status: 'Denegat',
        year: 2021,
        value: 1
      },
      {
        status: 'Denegat',
        year: 2022,
        value: 1
      },
      {
        status: 'Desistit',
        year: 2022,
        value: 1
      },
      {
        status: 'Sense resolució',
        year: 2017,
        value: 1
      },
      {
        status: 'Sense resolució',
        year: 2018,
        value: 3
      },
      {
        status: 'Sense resolució',
        year: 2019,
        value: 1
      },
      {
        status: 'Sense resolució',
        year: 2020,
        value: 1
      },
      {
        status: 'Sense resolució',
        year: 2021,
        value: 1
      },
      {
        status: 'Sense resolució',
        year: 2022,
        value: 3
      }
    ];

    expect(computedState).to.deep.equal(expectedState);
  });
});
