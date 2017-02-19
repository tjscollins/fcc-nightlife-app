/*global describe it*/

/*----------Modules----------*/
import expect from 'expect';
import React from 'react';
// import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

/*----------Redux----------*/
// import {Provider} from 'react-redux';
// import {configure} from 'configureStore';

/*----------Components----------*/
import {BarList} from 'BarList';

describe('BarList', () => {
  it('should exist', () => {
    expect(BarList).toExist();
  });

  it('render a list of bars', ()=>{
    let bars = [
      {
        id: '4d184480bb488cfafe8bb3d4',
        name: 'Oleai Beach Bar & Grill',
        contact: {},
        location: {
          address: 'Beach Road',
          lat: 15.167618261340492,
          lng: 145.70955308937118,
          labeledLatLngs: [
            {
              label: 'display',
              lat: 15.167618261340492,
              lng: 145.70955308937118
            }
          ],
          cc: 'MP',
          city: 'Saipan',
          state: 'Saipan',
          country: 'Northern Mariana Islands',
          formattedAddress: [
            'Beach Road',
            'Saipan Saipan',
            'Northern Mariana Islands'
          ]
        },
        categories: [
          {
            id: '4bf58dd8d48988d116941735',
            name: 'Bar',
            pluralName: 'Bars',
            shortName: 'Bar',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/nightlife/pub_',
              suffix: '.png'
            },
            primary: true
          }
        ],
        verified: false,
        stats: {
          checkinsCount: 71,
          usersCount: 31,
          tipCount: 2
        },
        allowMenuUrlEdit: true,
        beenHere: {
          lastCheckinExpiredAt: 0
        },
        specials: {
          count: 0,
          items: []
        },
        referralId: 'v-1487469774',
        venueChains: [],
        hasPerk: false
      },
      {
        id: '4b0611adf964a52041e822e3',
        name: 'Godfather\'s Bar',
        contact: {
          phone: '6702352333',
          formattedPhone: '(670) 235-2333'
        },
        location: {
          address: 'Beach Rd',
          crossStreet: 'Palm St',
          lat: 15.214750133007385,
          lng: 145.71982383728027,
          labeledLatLngs: [
            {
              label: 'display',
              lat: 15.214750133007385,
              lng: 145.71982383728027
            }
          ],
          postalCode: '96950',
          cc: 'MP',
          city: 'Garapan, Saipan',
          state: 'MP',
          country: 'Northern Mariana Islands',
          formattedAddress: [
            'Beach Rd (Palm St)',
            'Garapan, Saipan MP 96950',
            'Northern Mariana Islands'
          ]
        },
        categories: [
          {
            id: '4bf58dd8d48988d116941735',
            name: 'Bar',
            pluralName: 'Bars',
            shortName: 'Bar',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/nightlife/pub_',
              suffix: '.png'
            },
            primary: true
          }
        ],
        verified: false,
        stats: {
          checkinsCount: 336,
          usersCount: 114,
          tipCount: 8
        },
        allowMenuUrlEdit: true,
        beenHere: {
          lastCheckinExpiredAt: 0
        },
        specials: {
          count: 0,
          items: []
        },
        referralId: 'v-1487469774',
        venueChains: [],
        hasPerk: false
      }
    ];
    let barList = TestUtils.renderIntoDocument(<BarList bars={bars} />);
    let rows = TestUtils.scryRenderedDOMComponentsWithClass(barList, 'row');
    expect(rows.length).toBe(2*2);
  });
});
