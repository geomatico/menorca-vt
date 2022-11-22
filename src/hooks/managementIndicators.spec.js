import {expect} from 'chai';
import fixture from '../../fixtures/expedientsFixture.json';


describe('Data indicators', () => {
  it('should calculate the evolution of expedients by start date and type', () => {
    // GIVEN
    const givenState = fixture;

    const getTypeCountByStartDate = () => {
      const filteredFixtures = fixture
        .map(fix => ({
          tipus: fix.tipus,
          data_inici: new Date(fix.data_inici).getFullYear()
        }))
        .filter(el => el.data_inici);

      return Object.values(filteredFixtures.reduce((r, e) => {
        let k = `${e.tipus}|${e.data_inici}`;
        if (e.data_inici) {
          if (!r[k]) r[k] = {
            type: e.tipus,
            start_date: e.data_inici,
            value: 1
          };
          else r[k].value += 1;
        }
        return r;
      }, {}));
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
        value: 1
      },
      {
        type: 'CED',
        start_date: 2021,
        value: 4
      },
      {
        type: 'CED',
        start_date: 2018,
        value: 6
      },
      {
        type: 'CED',
        start_date: 2020,
        value: 1
      },
      {
        type: 'CED',
        start_date: 2019,
        value: 3
      },
      {
        type: 'CED',
        start_date: 2022,
        value: 6
      },
      {
        type: 'CED',
        start_date: 2017,
        value: 1
      }
    ];

    expect(computedState).to.deep.equal(expectedState);
  });
  it('should calculate the evolution of expedients by end date and type', () => {
    // GIVEN
    const givenState = fixture;

    const getTypeCountByEndDate = () => {
      const newFixtures = fixture.map(fix => ({
        tipus: fix.tipus,
        data_fi: new Date(fix.data_fi).getFullYear()
      }));
      return Object.values(newFixtures.reduce((r, e) => {
        let k = `${e.tipus}|${e.data_fi}`;
        if (e.tipus && e.data_fi) {
          if (!r[k]) r[k] = {
            type: e.tipus,
            end_date: e.data_fi,
            value: 1
          };
          else r[k].value += 1;
        }
        return r;
      }, {}));
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
        end_date: 2021,
        value: 6
      },
      {
        type: 'CED',
        end_date: 2018,
        value: 5
      },
      {
        type: 'CED',
        end_date: 2022,
        value: 5
      },
      {
        type: 'CED',
        end_date: 2019,
        value: 4
      }
    ];

    expect(computedState).to.deep.equal(expectedState);
  });
  it('should calculate the processing time', () => {
    // GIVEN
    const givenState = fixture;

    const days_between = (date1, date2) => {

      // The number of milliseconds in one day
      const ONE_DAY = 1000 * 60 * 60 * 24;

      // Calculate the difference in milliseconds
      const differenceMs = Math.abs(new Date(date1) - new Date(date2));

      // Convert back to days and return
      return Math.round(differenceMs / ONE_DAY);
    };

    const getAverageProcessingTimeByType = () => {
      // limpia las fixtures de datos corruptos
      const filteredFixtures = Object.values(fixture)
        .map(fix => ({
          type: fix.tipus,
          daysDiff: days_between(fix.data_inici, fix.data_fi)
        }))
        .filter(el => !!el.daysDiff);

      return Object.values(filteredFixtures
        .reduce((r, e) => {
          let k = `${e.type}`;
          if (e.type) {
            if (!r[k]) r[k] = {
              type: e.type,
              value: e.daysDiff,
              count: 1
            };
            else {
              r[k].value += e.daysDiff;
              r[k].count += 1;
            }
          }
          return r;
        }, {}))
        .map(el => ({
          type: el.type,
          value: Math.trunc(el.value / el.count)
        }));
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
  it('should calculate the resolution state by type and year', () => {
    // GIVEN
    const givenState = fixture;

    // ordena por 2 propiedad, primera string, segunda number
    const sortByTwoProperties = (results, sort1, sort2) => {
      return results?.sort((a, b) => a[sort1].localeCompare(b[sort1]) || a[sort2] - b[sort2]);
    };

    const getStatusCountByYear = () => {
      const newFixtures = fixture.map(fix => ({
        status: fix.resolucio,
        year: fix.any
      }));
      const res = Object.values(newFixtures.reduce((r, e) => {
        let k = `${e.status}|${e.year}`;
        if (e.status && e.year) {
          if (!r[k]) r[k] = {
            status: e.status,
            year: e.year,
            value: 1
          };
          else r[k].value += 1;
        }
        return r;
      }, {}));

      return sortByTwoProperties(res, 'status', 'year');
    };

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
