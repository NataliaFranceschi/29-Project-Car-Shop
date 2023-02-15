export const motorcycle = {
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};

export const id = '6348513f34c397abcad040b2';

export const motorcycleWithId = {
  id,
  ...motorcycle,
};
