import { NextFunction, Request, Response } from 'express';
import AbstractService from '../Services/Abstract Service';

class AbstractController<T, D> {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: AbstractService<T, D>;

  constructor(
    req: Request, 
    res: Response, 
    next:NextFunction, 
    service: AbstractService<T, D>,
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

  public async delete() {
    const { id } = this.req.params;
    try {
      await this.service.delete(id);
      return this.res.status(204).end();
    } catch (error) {
      this.next(error);
    }
  }
}

export default AbstractController;
