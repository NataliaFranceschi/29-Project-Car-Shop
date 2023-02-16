import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import { motorcycle, id, motorcycleWithId } from '../../Mocks/motorcycleMocks';

describe('Testa a camada model da rota motorcycles', function () {
  const nonexistentId = '1111222233330000ffffcccc';
  const errorNonexistentId = 'Motorcycle not found';
  const notValidId = 'INVALID_MONGO_ID';
  const errorNotValidId = 'Invalid mongo id';
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
      await service.getById(notValidId);
    } catch (error) {
      expect((error as Error).message).to.be.equal(errorNotValidId);
    }
  });
  it('Retorna erro quando tenta buscar utilizando id inexistente', async function () {
    sinon.stub(Model, 'findOne').resolves(null);
    try {
      await service.getById(nonexistentId);
    } catch (error) {
      expect((error as Error).message).to.be.equal(errorNonexistentId);
    }
  });
  it('Atualiza uma moto', async function () {  
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleWithId);

    const result = await service.update(id, motorcycle);
    
    expect(result).to.be.deep.equal(motorcycleWithId);
  });
  it('Retorna erro quando tenta atualizar utilizando id inváido', async function () {
    try {
      await service.update(notValidId, motorcycle);
    } catch (error) {
      expect((error as Error).message).to.be.equal(errorNotValidId);
    }
  });
  it('Retorna erro quando tenta atualizar utilizando id inexistente', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
    try {
      await service.update(nonexistentId, motorcycle);
    } catch (error) {
      expect((error as Error).message).to.be.equal(errorNonexistentId);
    }
  });
  it('Deleta uma moto', async function () {  
    sinon.stub(Model, 'deleteOne').resolves({ acknowledged: true, deletedCount: 1 });

    const result = await service.delete(id);
    
    expect(result.deletedCount).to.be.equal(1);
  });
  it('Retorna erro quando tenta deletar utilizando id inváido', async function () {
    try {
      await service.delete(notValidId);
    } catch (error) {
      expect((error as Error).message).to.be.equal(errorNotValidId);
    }
  });
  it('Retorna erro quando tenta deletar utilizando id inexistente', async function () {
    sinon.stub(Model, 'deleteOne').resolves({ acknowledged: true, deletedCount: 0 });
    try {
      await service.delete(nonexistentId);
    } catch (error) {
      expect((error as Error).message).to.be.equal(errorNonexistentId);
    }
  });
});