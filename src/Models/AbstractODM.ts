import { Model, models, Schema, model, isValidObjectId } from 'mongoose';
  
abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;
  
  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public isValid(id: string) {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid mongo id');
    } 
  }
  
  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async getAll(): Promise<T[]> {
    return this.model.find({});
  }

  public async getById(id: string): Promise<T | null> {
    this.isValid(id);
    return this.model.findOne({ _id: id });
  }

  public async update(_id: string, obj: Partial<T>): Promise<T | null> {
    this.isValid(_id);
    return this.model.findByIdAndUpdate(
      { _id },
      { ...obj },
      { new: true },
    );
  }

  public async delete(id: string) {
    this.isValid(id);
    return this.model.deleteOne({ _id: id });
  }
}
  
export default AbstractODM;
