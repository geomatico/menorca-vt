import {expect} from 'chai';
import fixture from '../../fixtures/fixture.json';

describe('Data indicators', () => {
  it('should calculate resolution state', () => {
    // GIVEN
    const givenState = fixture;

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

  it('should calculate the number of geolocated expedients', () => {
    // GIVEN
    const givenState = fixture;

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
