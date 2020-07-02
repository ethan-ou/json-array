import JSONArray, { convertArrayIndexKeys } from '../src';

describe('JSONArray', () => {
  it('converts JSON Top Level arrays to Javascript Arrays', () => {
    const originalArray = {
      '0': {
        type: 'item',
        name: 'Picnic Basket',
        suppliers: {
          '0': {
            country: 'USA',
            stores: {
              '0': {
                name: 'General Store',
                price: 24.25,
              },
              '1': {
                name: 'Local Store',
                price: 26.99,
              },
            },
          },
          '1': { country: 'Germany', price: 19.5 },
          '2': { country: 'Sweden', price: 23.2 },
        },
      },
      '1': {
        type: 'item',
        name: 'T-Shirt',
        suppliers: {
          '0': { country: 'USA', price: 45.95 },
          '1': { country: 'Germany', price: 49.5 },
          '2': { country: 'Sweden', price: 37.75 },
        },
      },
    };

    const targetArray = [
      {
        type: 'item',
        name: 'Picnic Basket',
        suppliers: [
          {
            country: 'USA',
            stores: [
              {
                name: 'General Store',
                price: 24.25,
              },
              {
                name: 'Local Store',
                price: 26.99,
              },
            ],
          },
          { country: 'Germany', price: 19.5 },
          { country: 'Sweden', price: 23.2 },
        ],
      },
      {
        type: 'item',
        name: 'T-Shirt',
        suppliers: [
          { country: 'USA', price: 45.95 },
          { country: 'Germany', price: 49.5 },
          { country: 'Sweden', price: 37.75 },
        ],
      },
    ];

    const stringifiedArray = JSON.parse(JSON.stringify(originalArray));
    expect(JSONArray(stringifiedArray)).toEqual(targetArray);
  });

  it('converts JSON Objects to Javascript Arrays', () => {
    const originalArray = {
      type: 'item',
      name: 'T-Shirt',
      suppliers: [
        { country: 'USA', price: 45.95 },
        { country: 'Germany', price: 49.5 },
        { country: 'Sweden', price: 37.75 },
      ],
    };
    const stringifiedArray = JSON.parse(JSON.stringify(originalArray));
    expect(JSONArray(stringifiedArray)).toEqual(originalArray);
  });

  it('avoids mutation of original object', () => {
    const originalArray = {
      '0': {
        type: 'item',
        name: 'Picnic Basket',
        suppliers: {
          '0': {
            country: 'USA',
            stores: {
              '0': {
                name: 'General Store',
                price: 24.25,
              },
              '1': {
                name: 'Local Store',
                price: 26.99,
              },
            },
          },
          '1': { country: 'Germany', price: 19.5 },
          '2': { country: 'Sweden', price: 23.2 },
        },
      },
    };

    const duplicatedArray = {
      '0': {
        type: 'item',
        name: 'Picnic Basket',
        suppliers: {
          '0': {
            country: 'USA',
            stores: {
              '0': {
                name: 'General Store',
                price: 24.25,
              },
              '1': {
                name: 'Local Store',
                price: 26.99,
              },
            },
          },
          '1': { country: 'Germany', price: 19.5 },
          '2': { country: 'Sweden', price: 23.2 },
        },
      },
    };

    JSONArray(originalArray);
    expect(originalArray).toEqual(duplicatedArray);
  });
});

describe('testForArrayIndexKeys', () => {
  it('works', () => {
    const originalArray = {
      '0': {
        name: 'General Store',
        price: 24.25,
      },
      '1': {
        name: 'Local Store',
        price: 26.99,
      },
    };

    const expectedArray = [
      {
        name: 'General Store',
        price: 24.25,
      },
      {
        name: 'Local Store',
        price: 26.99,
      },
    ];

    expect(convertArrayIndexKeys(originalArray)).toEqual(expectedArray);
  });
});
