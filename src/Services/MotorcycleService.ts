import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private motorcycleODM = new MotorcycleODM();
  private createCarDomain(motorcycle: IMotorcycle): Motorcycle {
    return new Motorcycle(motorcycle);
  }

  public async create(motorcycle: IMotorcycle) {
    const newMotorcycle = await this.motorcycleODM.create(motorcycle);
    if (newMotorcycle) {
      return this.createCarDomain(newMotorcycle);
    } return null;
  }
}

export default MotorcycleService;
