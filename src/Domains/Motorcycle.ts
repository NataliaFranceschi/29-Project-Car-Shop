import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;
  
  constructor(motorcycle: IMotorcycle) {
    super(
      motorcycle.id, 
      motorcycle.model, 
      motorcycle.year,
      motorcycle.color, 
      motorcycle.status, 
      motorcycle.buyValue,
    );
    this.category = motorcycle.category;
    this.engineCapacity = motorcycle.engineCapacity;
  }

  public get _category(): string {
    return this.category;
  }
  public set _category(value: string) {
    this.category = value;
  }
  public get _engineCapacity(): number {
    return this.engineCapacity;
  }
  public set _engineCapacity(value: number) {
    this.engineCapacity = value;
  } 
}

export default Motorcycle;