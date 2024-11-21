import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CostosService } from './costos.service';
import { CreateCostoDto, UpdateCostoDto } from './dto';

@Controller()
export class CostosController {
  constructor(private readonly costosService: CostosService) {}

  @MessagePattern({ cmd: 'costo.create' })
  create(@Payload() createCostoDto: CreateCostoDto) {
    return this.costosService.create(createCostoDto);
  }

  @MessagePattern({ cmd: 'costo.findAll' })
  findAll() {
    return this.costosService.findAll();
  }

  @MessagePattern({ cmd: 'costo.findOne' })
  findOne(@Payload() id: number) {
    return this.costosService.findOne(id);
  }

  @MessagePattern({ cmd: 'costo.update' })
  update(@Payload() updateCostoDto: UpdateCostoDto) {
    return this.costosService.update(updateCostoDto.id, updateCostoDto);
  }

  @MessagePattern({ cmd: 'costo.remove' })
  remove(@Payload() id: number) {
    return this.costosService.remove(id);
  }
}