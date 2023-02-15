import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/CarService';
import ICar from '../Interfaces/ICar';
import AbstractController from './AbstractController';
import Car from '../Domains/Car';

class CarController extends AbstractController<ICar, Car> {
  constructor(req: Request, res: Response, next:NextFunction) {
    super(req, res, next, new CarService());
  }
}

export default CarController;
