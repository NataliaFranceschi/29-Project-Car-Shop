import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import AbstractService from './Abstract Service';

class MotorcycleService extends AbstractService<IMotorcycle, Motorcycle> {
  constructor() {
    super(new MotorcycleODM(), 'Motorcycle');
  }
    
  createVehicleDomain(vehicle: IMotorcycle): Motorcycle {
    return new Motorcycle(vehicle);
  }
}
export default MotorcycleService;
