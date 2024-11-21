import { PartialType } from '@nestjs/mapped-types';
import { CreateCostoDto } from './create-costo.dto';
import { IsNumber } from 'class-validator';

export class UpdateCostoDto extends PartialType(CreateCostoDto) {
    @IsNumber()
    id: number;
}
