import CarODM from '../Models/CarODM';
import ICar from '../Interfaces/ICar';
import Car from '../Domains/Car';

class CarService {
  private carODM = new CarODM();
  private createCarDomain(car: ICar): Car {
    return new Car(car);
  }

  public async create(car: ICar) {
    const newCar = await this.carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async getAllCars() {
    const cars = await this.carODM.getAll();
    return Promise.all(cars.map((car: ICar) => this.createCarDomain(car)));
  }

  public async getCarById(id: string) {
    const car = await this.carODM.getCarById(id);
    if (car === null) {
      throw new Error('Car not found');
    }
    return this.createCarDomain(car);
  }
}

export default CarService;
