import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private motorcycleODM = new MotorcycleODM();
  private createMotorcycleDomain(motorcycle: IMotorcycle): Motorcycle {
    return new Motorcycle(motorcycle);
  }

  public async create(motorcycle: IMotorcycle) {
    const newMotorcycle = await this.motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getAllMotorcycles() {
    const motorcycles = await this.motorcycleODM.getAll();
    return Promise.all(motorcycles
      .map((motorcycle: IMotorcycle) => this.createMotorcycleDomain(motorcycle)));
  }

  public async getMotorcycleById(id: string) {
    const motorcycle = await this.motorcycleODM.getById(id);
    if (motorcycle === null) {
      throw new Error('Motorcycle not found');
    }
    return this.createMotorcycleDomain(motorcycle);
  }
}

export default MotorcycleService;
