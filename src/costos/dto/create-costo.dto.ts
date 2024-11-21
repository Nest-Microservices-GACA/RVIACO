import { IsNumberString, IsString } from "class-validator";

export class CreateCostoDto {
    @IsNumberString()
    num_empleado: string;

    @IsNumberString()
    id_proyecto: string;

    @IsString()
    nom_proyecto: string;

    @IsString()
    nom_cliente_ia: string;

    @IsString()
    val_monto: string;

    @IsString()
    txt_descripcion: string;
}
