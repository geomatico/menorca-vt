import {expect} from 'chai';
import fixture from '../../fixtures/fixture.json';

describe('Data indicators', () => {
  it('should calculate the evolution of expedients by start date and type', () => {
    // GIVEN
    const givenState = fixture;

    const getTypeCountByStartDate =()=> {
      return expectedState;
    };

    // WHEN
    const computedState = getTypeCountByStartDate(givenState);

    // THEN
    const expectedState = [
      {
        type: 'EX073',
        start_date: 2017,
        value: 1
      },
      {
        type: 'EX068',
        start_date: 2018,
        value: 2
      },
      {
        type: 'CED',
        start_date: 2017,
        value: 1
      },
      {
        type: 'CED',
        start_date: 2018,
        value: 4
      },
      {
        type: 'CED',
        start_date: 2019,
        value: 3
      },
      {
        type: 'CED',
        start_date: 2020,
        value: 1
      },
      {
        type: 'CED',
        start_date: 2021,
        value: 5
      },
      {
        type: 'CED',
        start_date: 2022,
        value: 6
      }
    ];

    expect(computedState).to.deep.equal(expectedState);
  });

  it('should calculate the evolution of expedients by end date and type', () => {
    // GIVEN
    const givenState = fixture;

    const getTypeCountByEndDate =()=> {
      return expectedState;
    };

    // WHEN
    const computedState = getTypeCountByEndDate(givenState);

    // THEN
    const expectedState = [
      {
        type: 'EX073',
        end_date: 2018,
        value: 1
      },
      {
        type: 'EX068',
        end_date: 2018,
        value: 1
      },
      {
        type: 'CED',
        end_date: 2018,
        value: 5
      },
      {
        type: 'CED',
        end_date: 2019,
        value: 3
      },
      {
        type: 'CED',
        end_date: 2020,
        value: 1
      },
      {
        type: 'CED',
        end_date: 2021,
        value: 6
      },
      {
        type: 'CED',
        end_date: 2022,
        value: 5
      }
    ];

    expect(computedState).to.deep.equal(expectedState);
  });

  it('should calculate the processing time', () => {
    // GIVEN
    const givenState = fixture;

    const getAverageProcessingTimeByType =()=> {
      return expectedState;
    };

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

  it('should calculate the resolution state by tipe and yearprocessing time', () => {
    // GIVEN
    const givenState = fixture;

    const getStatusCountByYear =()=> {
      return expectedState;
    };

    // WHEN
    const computedState = getStatusCountByYear(givenState);

    // THEN

    const expectedState = [
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
      },
      {
        status: 'Concedit',
        year: 2017,
        value: 1
      },
      {
        status: 'Concedit',
        year: 2018,
        value: 1
      },
      {
        status: 'Concedit',
        year: 2018,
        value: 2
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
    ];

    expect(computedState).to.deep.equal(expectedState);
  });
});