/* import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/CarService';
import MotorcycleService from '../Services/MotorcycleService';

class AbstractController<T> {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService | MotorcycleService;

  constructor(
    req: Request, 
    res: Response, 
    next:NextFunction, 
    service: CarService | MotorcycleService,
  ) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = service;
  }

  public async create() {
    const vehicle: T = this.req.body;

    try {
      const newVehicle = await this.service.create(vehicle);
      return this.res.status(201).json(newVehicle);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    try {
      const vehicles = await this.service.getAll();
      return this.res.status(200).json(vehicles);
    } catch (error) {
      this.next(error);
    }
  }

  public async getById() {
    const { id } = this.req.params;
    try {
      const vehicle = await this.service.getById(id);
      return this.res.status(200).json(vehicle);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    const vehicle: T = this.req.body;
    const { id } = this.req.params;

    try {
      const updateVehicle = await this.service.update(id, vehicle);
      return this.res.status(200).json(updateVehicle);
    } catch (error) {
      this.next(error);
    }
  }
}

export default AbstractController;
*/