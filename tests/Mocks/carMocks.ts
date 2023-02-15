export const car = {
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};

export const id = '6348513f34c397abcad040b2';

export const carWithId = {
  id,
  ...car,
};
