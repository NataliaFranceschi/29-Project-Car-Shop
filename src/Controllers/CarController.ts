import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/CarService';
import ICar from '../Interfaces/ICar';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next:NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = this.req.body;

    try {
      const newCar = await this.service.create(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    try {
      const cars = await this.service.getAll();
      return this.res.status(200).json(cars);
    } catch (error) {
      this.next(error);
    }
  }

  public async getById() {
    const { id } = this.req.params;
    try {
      const cars = await this.service.getById(id);
      return this.res.status(200).json(cars);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    const car: ICar = this.req.body;
    const { id } = this.req.params;

    try {
      const updateCar = await this.service.update(id, car);
      return this.res.status(200).json(updateCar);
    } catch (error) {
      this.next(error);
    }
  }
}

export default CarController;
