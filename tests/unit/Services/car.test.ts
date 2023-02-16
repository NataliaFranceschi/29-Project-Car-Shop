import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarService';
import { car, carWithId, id } from '../../Mocks/carMocks';

describe('Testa a camada model da rota cars', function () {
  const nonexistentId = '1111222233330000ffffcccc';
  const errorNonexistentId = 'Car not found';
  const notValidId = 'INVALID_MONGO_ID';
  const errorNotValidId = 'Invalid mongo id';
  const service = new CarService();
  afterEach(sinon.restore);

  it('Cria um carro', async function () {
    sinon.stub(Model, 'create').resolves(carWithId);
    
    const result = await service.create(car);
    
    expect(result).to.be.deep.equal(carWithId);
  });
  it('Retorna todos os carros cadastrados', async function () {
    sinon.stub(Model, 'find').resolves([carWithId]);
    
    const result = await service.getAll();
    
    expect(result).to.be.deep.equal([carWithId]);
  });
  it('Retorna o carro pelo id', async function () {
    sinon.stub(Model, 'findOne').resolves(carWithId);
    
    const result = await service.getById(id);
    
    expect(result).to.be.deep.equal(carWithId);
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
  it('Atualiza um carro', async function () {  
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carWithId);

    const result = await service.update(id, car);
    
    expect(result).to.be.deep.equal(carWithId);
  });
  it('Retorna erro quando tenta atualizar utilizando id inváido', async function () {
    try {
      await service.update(notValidId, car);
    } catch (error) {
      expect((error as Error).message).to.be.equal(errorNotValidId);
    }
  });
  it('Retorna erro quando tenta atualizar utilizando id inexistente', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
    try {
      await service.update(nonexistentId, car);
    } catch (error) {
      expect((error as Error).message).to.be.equal(errorNonexistentId);
    }
  });
  it('Deleta um carro', async function () {  
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