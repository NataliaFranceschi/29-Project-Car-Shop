import AbstractODM from '../Models/AbstractODM';

abstract class AbstractService<T, D> {
  private abstractODM: AbstractODM<T>;
  private vehicleType: string;

  constructor(abstractODM: AbstractODM<T>, vehicleType: string) {
    this.abstractODM = abstractODM;
    this.vehicleType = vehicleType;
  }

  abstract createVehicleDomain(vehicle:T): D;

  public async create(vehicle: T) {
    const newVehicle = await this.abstractODM.create(vehicle);
    return this.createVehicleDomain(newVehicle);
  }

  public async getAll() {
    const vehicles = await this.abstractODM.getAll();
    return Promise.all(vehicles.map((vehicle: T) => this.createVehicleDomain(vehicle)));
  }

  public async getById(id: string) {
    const vehicle = await this.abstractODM.getById(id);
    if (vehicle === null) {
      throw new Error(`${this.vehicleType} not found`);
    }
    return this.createVehicleDomain(vehicle);
  }

  public async update(id: string, obj: T) {
    const vehicle = await this.abstractODM.update(id, obj);
    if (vehicle === null) {
      throw new Error(`${this.vehicleType} not found`);
    }
    return this.createVehicleDomain(vehicle);
  }

  public async delete(id: string) {
    const vehicle = await this.abstractODM.delete(id);
    if (vehicle.deletedCount === 0) {
      throw new Error(`${this.vehicleType} not found`);
    }
    return vehicle;
  }
}

export default AbstractService; 
