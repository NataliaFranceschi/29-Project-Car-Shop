import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;
  
  constructor(car: ICar) {
    super(car.id, car.model, car.year, car.color, car.status, car.buyValue);
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
  }

  public get _doorsQty(): number {
    return this.doorsQty;
  }
  public set _doorsQty(value: number) {
    this.doorsQty = value;
  }
  public get _seatsQty(): number {
    return this.seatsQty;
  }
  public set _seatsQty(value: number) {
    this.seatsQty = value;
  } 
}

export default Car;