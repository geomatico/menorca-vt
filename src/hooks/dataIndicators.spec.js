import {expect} from 'chai';
import fixture from '../../fixtures/expedientsFixture.json';

describe('Data indicators', () => {
  it('should calculate resolution state', () => {
    // GIVEN
    const givenState = fixture;

    const getResolutionState = () => {
      return Object.values(fixture.reduce((r, e) => {
        const resolucio = e.resolucio;
        if (resolucio) {
          if (!r[resolucio]) {
            r[resolucio] = {label: resolucio, value: 1};
          } else {
            r[resolucio].value += 1;
          }
        }
        return r;
      }, {}));
    };

    // WHEN
    const computedState = getResolutionState(givenState);

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
        label: 'Denegat',
        value: 2
      },
      {
        label: 'Desistit',
        value: 1
      }
    ];

    expect(computedState).to.deep.equal(expectedState);
  });

  it('should calculate the number of geolocated expedients', () => {
    // GIVEN
    const givenState = fixture;

    const getGeolocatedExpedients = () => {
      return Object.values(fixture.reduce((r, e) => {
        const tipus = e.tipus;
        if (tipus) {
          if (!r[tipus]) {
            r[tipus] = {type: tipus, label: 'Geolocalizados', value: 1};
          } else {
            r[tipus].value += 1;
          }
        }
        return r;
      }, {}));
    };

    // WHEN
    const computedState = getGeolocatedExpedients(givenState);

    // THEN
    const expectedState = [
      {
        type: 'EX073',
        label: 'Geolocalizados',
        value: 1
      },
      {
        type: 'EX068',
        label: 'Geolocalizados',
        value: 1
      },
      {
        type: 'CED',
        label: 'Geolocalizados',
        value: 22
      },
    ];

    expect(computedState).to.deep.equal(expectedState);
  });
});
