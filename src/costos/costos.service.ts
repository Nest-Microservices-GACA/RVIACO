import { Injectable, Logger } from '@nestjs/common';
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
        status: 'Error', 
        message: `Hubo un error ${error}`
      });
    }
  }

  async findAll() {
    try {

      const costos = await this.costoRepository.find();
      return costos ;
      
    } catch (error) {
      this.logger.error('[costo.findAll.service]',error);
      throw new RpcException({ 
        status: 'Error', 
        message: `Hubo un error ${error}`
      }); 
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} costo`;
  }

  update(id: bigint, updateCostoDto: UpdateCostoDto) {
    return `This action updates a #${id} costo`;
  }

  remove(id: number) {
    return `This action removes a #${id} costo`;
  }
}
