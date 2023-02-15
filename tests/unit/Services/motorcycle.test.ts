import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import { motorcycle, id, motorcycleWithId } from '../../Mocks/motorcycleMocks';

describe('Testa a camada model da rota motorcycles', function () {
  const service = new MotorcycleService();
  afterEach(sinon.restore);

  it('Cria uma moto', async function () {
    sinon.stub(Model, 'create').resolves(motorcycleWithId);
    
    const result = await service.create(motorcycle);
    
    expect(result).to.be.deep.equal(motorcycleWithId);
  });
  it('Retorna todas as motos cadastrados', async function () {
    sinon.stub(Model, 'find').resolves([motorcycleWithId]);
    
    const result = await service.getAll();
    
    expect(result).to.be.deep.equal([motorcycleWithId]);
  });
  it('Retorna a moto pelo id', async function () {
    sinon.stub(Model, 'findOne').resolves(motorcycleWithId);
    
    const result = await service.getById(id);
    
    expect(result).to.be.deep.equal(motorcycleWithId);
  });
  it('Retorna erro quando tenta buscar utilizando id inváido', async function () {
    try {
      await service.getById('INVALID_MONGO_ID');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });
  it('Retorna erro quando tenta buscar utilizando id inexistente', async function () {
    sinon.stub(Model, 'findOne').resolves(null);
    try {
      await service.getById('1111222233330000ffffcccc');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Motorcycle not found');
    }
  });
  it('Atualiza uma moto', async function () {  
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleWithId);

    const result = await service.update(id, motorcycle);
    
    expect(result).to.be.deep.equal(motorcycleWithId);
  });
  it('Retorna erro quando tenta atualizar utilizando id inváido', async function () {
    try {
      await service.update('INVALID_MONGO_ID', motorcycle);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });
  it('Retorna erro quando tenta atualizar utilizando id inexistente', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
    try {
      await service.update('1111222233330000ffffcccc', motorcycle);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Motorcycle not found');
    }
  });
});