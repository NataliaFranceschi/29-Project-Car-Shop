import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarService';
import { car, carWithId, id } from '../../Mocks/carMocks';

describe('Testa a camada model da rota cars', function () {
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
      expect((error as Error).message).to.be.equal('Car not found');
    }
  });
  it('Atualiza um carro', async function () {  
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carWithId);

    const result = await service.update(id, car);
    
    expect(result).to.be.deep.equal(carWithId);
  });
  it('Retorna erro quando tenta atualizar utilizando id inváido', async function () {
    try {
      await service.update('INVALID_MONGO_ID', car);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });
  it('Retorna erro quando tenta atualizar utilizando id inexistente', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
    try {
      await service.update('1111222233330000ffffcccc', car);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Car not found');
    }
  });
});