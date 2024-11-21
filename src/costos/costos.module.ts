import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CostosService } from './costos.service';
import { CostosController } from './costos.controller';
import { Costo } from './entities';

@Module({
  controllers: [CostosController],
  providers: [CostosService],
  imports: [
    TypeOrmModule.forFeature([ Costo ])
  ]
})
export class CostosModule {}