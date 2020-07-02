import JSONArray from '../src';

describe('JSONArray', () => {
  it('converts JSON arrays to Javascript Arrays', () => {
    const originalArray = [
      {
        type: 'item',
        name: 'Picnic Basket',
        suppliers: [
          { country: 'USA', price: 20.0 },
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
    expect(JSONArray(stringifiedArray)).toEqual(originalArray);
  });
});
