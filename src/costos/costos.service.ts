import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Costo } from './entities';
import { CreateCostoDto, UpdateCostoDto } from './dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CostosService {

  private readonly logger = new Logger('LanguagesService');
  constructor(
    @InjectRepository(Costo)
    private readonly costoRepository: Repository<Costo>
  ){}

  async create(createCostoDto: CreateCostoDto) {
    try{

      const costoData = {
        ...createCostoDto,
        num_empleado: BigInt(createCostoDto.num_empleado),
        id_proyecto: BigInt(createCostoDto.id_proyecto),
      };

      const costo = this.costoRepository.create(costoData);
      await this.costoRepository.save(costo);

      return {
        ...costo,
        num_empleado: costo.num_empleado.toString(),
        id_proyecto: costo.id_proyecto.toString(),
      };

    }catch(error){
      this.logger.error('[costo.create.service]',error);
      throw new RpcException({ 
        status: 500, 
        message: `Error COSTOS ${error}`
      });
    }
  }

  async findAll() {
    try {

      const costos = await this.costoRepository.find();
      if( costos.length === 0 ){
        return { costos: [], total: 0}
      }

      return { costos, total: costos.length };

    } catch (error) {
      this.logger.error('[costo.findAll.service]',error);
      throw new RpcException({ 
        status: 500, 
        message: `Error COSTOS ${error}`
      }); 
    }
  }

  async findOne(id: number) {
    const costo = await this.costoRepository.findOneBy({ id_proyecto: BigInt(id) });

    if( !costo ){
      this.logger.error('[costo.findOne.service]');
      throw new RpcException({ 
        status: HttpStatus.NOT_FOUND, 
        message: `Costo del proyecto con ID ${ id } no encontrado`
      });
    }

    return costo; 
  }

  async update(keyx: number, updateCostoDto: UpdateCostoDto) {
      const costo = await this.costoRepository.findOne({ where: { keyx: keyx } });
      if (!costo) {
        this.logger.error('[costo.update.service]');
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: `Costo ${ keyx } no encontrado`,
        });
      }

      const updatedCostoData = {
        ...costo,
        ...updateCostoDto,
        num_empleado: BigInt(updateCostoDto.num_empleado),
        id_proyecto: BigInt(updateCostoDto.id_proyecto),
      };

      const { id, ...updateCosto } = updatedCostoData;
  
      await this.costoRepository.save(updateCosto);

      
      return {
        ...updateCosto,
        num_empleado: updatedCostoData.num_empleado.toString(),
        id_proyecto: updatedCostoData.id_proyecto.toString(),
      };
  }

  async remove(id: number) {

    const costo = await this.costoRepository.findOne({ where: { keyx: id } });

    if (!costo) {
      this.logger.error('[costo.findOne.service]');

      throw new RpcException({ 
        status: HttpStatus.NOT_FOUND, 
        message: `Costo ${id} no encontrado`
      });
    }

    const key = costo.keyx;

    await this.costoRepository.remove( costo );

    return { message: `Costo ${key} eliminado correctamente` };
  }
}
