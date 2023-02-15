import CarODM from '../Models/CarODM';
import ICar from '../Interfaces/ICar';
import Car from '../Domains/Car';
import AbstractService from './Abstract Service';

class CarService extends AbstractService<ICar, Car> {
  constructor() {
    super(new CarODM(), 'Car');
  }
  
  createVehicleDomain(vehicle: ICar): Car {
    return new Car(vehicle);
  }
}

export default CarService;
