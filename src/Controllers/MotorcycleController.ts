import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';
import AbstractController from './AbstractController';
import Motorcycle from '../Domains/Motorcycle';

class MotorcycleController extends AbstractController<IMotorcycle, Motorcycle> {
  constructor(req: Request, res: Response, next:NextFunction) {
    super(req, res, next, new MotorcycleService());
  }
}

export default MotorcycleController;
